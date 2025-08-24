// app/api/auth/login-attempt/route.ts
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

// 設定値を直接定義
const SECURITY_CONFIG = {
  maxLoginAttempts: 5,
  loginAttemptsWindow: 900000, // 15分
  lockoutDuration: 900000, // 15分
}

// Supabase URLとキーを環境変数から取得
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// デバッグ用（後で削除）
console.log('Service Key exists:', !!supabaseServiceKey)
console.log('Service Key length:', supabaseServiceKey?.length)

// サービスロールキーを使用（RLSをバイパス）
const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

// IPアドレスを取得（非同期関数）
async function getClientIp() {
  const headersList = await headers()
  const forwarded = headersList.get('x-forwarded-for')
  const realIp = headersList.get('x-real-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  if (realIp) {
    return realIp.trim()
  }
  return '127.0.0.1'
}

// ログイン試行をチェック
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, action, success } = body
    const ip = await getClientIp()
    const headersList = await headers()
    const userAgent = headersList.get('user-agent') || 'unknown'

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // 過去15分間の失敗試行を取得
    const windowStart = new Date(Date.now() - SECURITY_CONFIG.loginAttemptsWindow)
    
    const { data: attempts, error: fetchError } = await supabaseAdmin
      .from('login_attempts')
      .select('*')
      .eq('email', email.toLowerCase())
      .eq('success', false)
      .gte('attempted_at', windowStart.toISOString())
      .order('attempted_at', { ascending: false })

    if (fetchError) {
      console.error('Failed to fetch login attempts:', fetchError)
      // エラーがあってもログイン試行を妨げない
      return NextResponse.json({ allowed: true, remainingAttempts: SECURITY_CONFIG.maxLoginAttempts })
    }

    const failedAttempts = attempts?.length || 0

    // アクションに応じて処理
    if (action === 'check') {
      // ログイン可能かチェック
      if (failedAttempts >= SECURITY_CONFIG.maxLoginAttempts) {
        const lastAttempt = attempts?.[0]
        if (lastAttempt) {
          const lockoutEnd = new Date(new Date(lastAttempt.attempted_at).getTime() + SECURITY_CONFIG.lockoutDuration)
          
          if (lockoutEnd > new Date()) {
            return NextResponse.json({
              allowed: false,
              remainingAttempts: 0,
              lockoutEnd: lockoutEnd.toISOString(),
              message: `Too many failed attempts. Please try again after ${Math.ceil((lockoutEnd.getTime() - Date.now()) / 60000)} minutes.`
            })
          }
        }
      }

      return NextResponse.json({
        allowed: true,
        remainingAttempts: Math.max(0, SECURITY_CONFIG.maxLoginAttempts - failedAttempts)
      })
    } 
    
    else if (action === 'record') {
      // ログイン試行を記録
      const { error: insertError } = await supabaseAdmin
        .from('login_attempts')
        .insert({
          email: email.toLowerCase(),
          ip_address: ip,
          success: success || false,
          user_agent: userAgent
        })

      if (insertError) {
        console.error('Failed to record login attempt:', insertError)
      }

      // 成功した場合、該当メールの失敗記録をクリア
      if (success) {
        await supabaseAdmin
          .from('login_attempts')
          .delete()
          .eq('email', email.toLowerCase())
          .eq('success', false)
      }

      return NextResponse.json({ 
        success: true,
        remainingAttempts: success ? SECURITY_CONFIG.maxLoginAttempts : Math.max(0, SECURITY_CONFIG.maxLoginAttempts - failedAttempts - 1)
      })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })

  } catch (error) {
    console.error('Login attempt API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// 古いログイン試行記録をクリーンアップ（定期実行用）
export async function DELETE() {
  try {
    const { error } = await supabaseAdmin.rpc('delete_old_login_attempts')
    
    if (error) {
      console.error('Failed to cleanup old attempts:', error)
      return NextResponse.json({ error: 'Cleanup failed' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Cleanup error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}