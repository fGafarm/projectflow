// lib/security/sanitize.ts

/**
 * HTMLタグを無害化
 */
export function sanitizeHtml(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

/**
 * SQLインジェクション対策
 */
export function sanitizeSql(input: string): string {
  return input
    .replace(/'/g, "''")
    .replace(/;/g, '')
    .replace(/--/g, '')
    .replace(/\/\*/g, '')
    .replace(/\*\//g, '')
}

/**
 * 一般的な入力をサニタイズ
 */
export function sanitizeInput(input: string | null | undefined): string {
  if (!input) return ''
  
  // 文字列に変換
  const str = String(input)
  
  // 最大長を制限（XSS攻撃で巨大な文字列を防ぐ）
  const truncated = str.slice(0, 1000)
  
  // HTMLエスケープ
  return sanitizeHtml(truncated)
}

/**
 * メールアドレスをサニタイズ
 */
export function sanitizeEmail(email: string): string {
  return email
    .toLowerCase()
    .trim()
    .slice(0, 255) // メールアドレスの最大長
}