'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { sanitizeEmail, sanitizeInput } from '@/lib/security/sanitize'  // 追加

export default function LoginPage() {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const [formData, setFormData] = useState({ email: '', password: '', name: '' })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { signIn, signUp } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    // 入力をサニタイズ
    const sanitizedEmail = sanitizeEmail(formData.email)
    const sanitizedPassword = formData.password // パスワードはハッシュ化されるのでサニタイズ不要
    const sanitizedName = sanitizeInput(formData.name)

    try {
      if (authMode === 'login') {
        const { error } = await signIn(sanitizedEmail, sanitizedPassword)
        if (error) throw error
        router.push('/dashboard')
      } else {
        const { error } = await signUp(sanitizedEmail, sanitizedPassword, sanitizedName)
        if (error) throw error
        setError('確認メールを送信しました。メールを確認してアカウントを有効化してください。')
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message)
      } else if (typeof error === 'string') {
        setError(error)
      } else {
        setError('認証エラーが発生しました')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🚀 ProjectFlow</h1>
          <p className="text-gray-600">ステッカーのように動かせるタスク管理</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {authMode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">名前</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="山田太郎"
                required={authMode === 'signup'}
                maxLength={100}  // 追加：最大長制限
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">メールアドレス</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="example@email.com"
              required
              maxLength={255}  // 追加：最大長制限
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">パスワード</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
              required
              minLength={6}
              maxLength={100}  // 追加：最大長制限
            />
          </div>

          {error && (
            <div className={`p-3 rounded-lg text-sm ${
              authMode === 'signup' && error.includes('確認メール') 
                ? 'bg-blue-50 text-blue-600' 
                : 'bg-red-50 text-red-600'
            }`}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '処理中...' : (authMode === 'login' ? 'ログイン' : 'アカウント作成')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
            className="text-blue-600 hover:text-blue-700 text-sm"
          >
            {authMode === 'login' ? 'アカウントをお持ちでない方はこちら' : 'すでにアカウントをお持ちの方はこちら'}
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-center text-sm text-gray-500">
            <p className="mb-2">💰 シンプルな料金体系</p>
            <p>基本無料 | 広告で運営 | 画像保存のみ従量課金</p>
          </div>
        </div>

        {/* 法的リンク - 料金体系の後に追加 */}
        <div className="mt-4 text-center text-xs text-gray-500">
          <Link href="/legal/terms" className="hover:text-blue-600">
            利用規約
          </Link>
          <span className="mx-2">|</span>
          <Link href="/legal/privacy" className="hover:text-blue-600">
            プライバシーポリシー
          </Link>
          <span className="mx-2">|</span>
          <Link href="/legal/tokushoho" className="hover:text-blue-600">
            特定商取引法
          </Link>
        </div>
      </div>
    </div>
  )
}