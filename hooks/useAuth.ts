// hooks/useAuth.ts
'use client'

import { useEffect, useState } from 'react'
import { User, AuthChangeEvent, Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import { config } from '../lib/config'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [sessionTimeout, setSessionTimeout] = useState<NodeJS.Timeout | null>(null)

  // セッションタイムアウトの設定
  const resetSessionTimeout = () => {
    if (sessionTimeout) {
      clearTimeout(sessionTimeout)
    }

    const timeout = setTimeout(async () => {
      await signOut()
      alert('セッションがタイムアウトしました。再度ログインしてください。')
      window.location.href = '/auth/login'
    }, config.security.sessionTimeout)

    setSessionTimeout(timeout)
  }

  // アクティビティ監視
  useEffect(() => {
    if (user) {
      resetSessionTimeout()

      const events = ['mousedown', 'keydown', 'scroll', 'touchstart']
      const handleActivity = () => {
        resetSessionTimeout()
      }

      events.forEach(event => {
        window.addEventListener(event, handleActivity)
      })

      return () => {
        events.forEach(event => {
          window.removeEventListener(event, handleActivity)
        })
        if (sessionTimeout) {
          clearTimeout(sessionTimeout)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  useEffect(() => {
    // 現在のセッションを取得
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // 認証状態の変更を監視
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  // ログイン試行回数をチェック
  const checkLoginAttempts = async (email: string) => {
    try {
      const response = await fetch('/auth/login-attempt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, action: 'check' })
      })

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Failed to check login attempts:', error)
      // configのプロパティが存在しない場合のフォールバック
      return { allowed: true, remainingAttempts: 5 }
    }
  }

  // ログイン試行を記録
  const recordLoginAttempt = async (email: string, success: boolean) => {
    try {
      await fetch('/auth/login-attempt', {  // ← ここを修正！先頭に / を追加
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, action: 'record', success })
      })
    } catch (error) {
      console.error('Failed to record login attempt:', error)
    }
  }

  // サインイン（ログイン試行回数制限付き）
  const signIn = async (email: string, password: string) => {
    // ログイン試行回数をチェック
    const attemptCheck = await checkLoginAttempts(email)
    
    console.log('Login attempt check:', attemptCheck) // デバッグ用
    
    if (!attemptCheck.allowed) {
      return { 
        data: null, 
        error: new Error(attemptCheck.message || 'Too many failed login attempts. Please try again later.')
      }
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    // ログイン試行を記録
    await recordLoginAttempt(email, !error)

    if (!error && data.user) {
      resetSessionTimeout()
    }

    return { data, error }
  }

  // サインアップ
  const signUp = async (email: string, password: string, name?: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name || email.split('@')[0],
        },
      },
    })

    return { data, error }
  }

  // サインアウト
  const signOut = async () => {
    if (sessionTimeout) {
      clearTimeout(sessionTimeout)
      setSessionTimeout(null)
    }
    
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  // パスワードリセット
  const resetPassword = async (email: string) => {
    // パスワードリセットも試行回数制限の対象にする
    const attemptCheck = await checkLoginAttempts(email)
    
    if (!attemptCheck.allowed) {
      return { 
        data: null, 
        error: new Error('Too many attempts. Please try again later.')
      }
    }

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })

    // リセット要求も記録（悪用防止）
    if (!error) {
      await recordLoginAttempt(email, true)
    }

    return { data, error }
  }

  // パスワード更新
  const updatePassword = async (newPassword: string) => {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword
    })

    return { data, error }
  }

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
  }
}