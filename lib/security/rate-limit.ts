// lib/security/rate-limit.ts
const attempts = new Map<string, number[]>()

export function rateLimit(
  identifier: string,
  maxAttempts: number = 10,
  windowMs: number = 60000 // 1分
): { success: boolean; remaining: number; resetTime: Date } {
  const now = Date.now()
  const userAttempts = attempts.get(identifier) || []
  
  // 時間窓内の試行のみを保持
  const recentAttempts = userAttempts.filter(
    timestamp => now - timestamp < windowMs
  )
  
  // 制限チェック
  if (recentAttempts.length >= maxAttempts) {
    const oldestAttempt = recentAttempts[0]
    const resetTime = new Date(oldestAttempt + windowMs)
    
    return {
      success: false,
      remaining: 0,
      resetTime
    }
  }
  
  // 新しい試行を記録
  recentAttempts.push(now)
  attempts.set(identifier, recentAttempts)
  
  // メモリリーク防止（古いエントリを削除）
  if (attempts.size > 1000) {
    const firstKey = attempts.keys().next().value
    if (firstKey) {
      attempts.delete(firstKey)
    }
  }
  
  return {
    success: true,
    remaining: maxAttempts - recentAttempts.length,
    resetTime: new Date(now + windowMs)
  }
}