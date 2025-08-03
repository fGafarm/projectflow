'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

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

    try {
      if (authMode === 'login') {
        const { error } = await signIn(formData.email, formData.password)
        if (error) throw error
      } else {
        const { error } = await signUp(formData.email, formData.password, formData.name)
        if (error) throw error
      }
    } catch (err: any) {
      setError(err.message || '認証エラーが発生しました')
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
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
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
      </div>
    </div>
  )
}