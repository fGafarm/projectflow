// app/legal/subprocessors/page.tsx
'use client'

import Link from 'next/link'
import { ArrowLeft, Globe, Shield, Server, CreditCard, Mail, AlertCircle } from 'lucide-react'

export default function SubprocessorsPage() {
  return (
    <>
      <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
        <ArrowLeft size={20} />
        トップに戻る
      </Link>

      <h1 className="text-3xl font-bold mb-8">サブプロセッサ一覧</h1>
      
      <div className="space-y-6 text-gray-700">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-sm">
            ProjectFlowは、サービス提供のために以下の第三者サービス（サブプロセッサ）を利用しています。
            各サブプロセッサとはデータ保護契約（DPA）を締結し、適切な監督を行っています。
          </p>
        </div>

        <section>
          <h2 className="text-xl font-semibold mb-4">インフラストラクチャ・ホスティング</h2>
          
          <div className="border rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <Server className="text-blue-600 mt-1" size={20} />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Supabase Inc.</h3>
                <div className="mt-2 space-y-1 text-sm">
                  <p><strong>利用目的：</strong>データベース、認証、リアルタイム同期</p>
                  <p><strong>本社所在地：</strong>米国</p>
                  <p><strong>データ処理地域：</strong>東京リージョン（日本）</p>
                  <p><strong>セキュリティ認証：</strong>SOC 2 Type II</p>
                  <p><strong>DPA：</strong>
                    <a href="https://supabase.com/docs/company/privacy" className="text-blue-600 hover:underline ml-1">
                      Data Processing Agreement締結済み
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <Globe className="text-green-600 mt-1" size={20} />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Vercel Inc.</h3>
                <div className="mt-2 space-y-1 text-sm">
                  <p><strong>利用目的：</strong>Webホスティング、CDN、エッジファンクション</p>
                  <p><strong>本社所在地：</strong>米国</p>
                  <p><strong>データ処理地域：</strong>グローバル（CDNエッジロケーション）</p>
                  <p><strong>セキュリティ認証：</strong>SOC 2 Type II</p>
                  <p><strong>DPA：</strong>
                    <a href="https://vercel.com/legal/dpa" className="text-blue-600 hover:underline ml-1">
                      Data Processing Agreement締結済み
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">決済処理（有料プラン利用時のみ）</h2>
          
          <div className="border rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <CreditCard className="text-purple-600 mt-1" size={20} />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Stripe, Inc.</h3>
                <div className="mt-2 space-y-1 text-sm">
                  <p><strong>利用目的：</strong>決済処理、サブスクリプション管理</p>
                  <p><strong>本社所在地：</strong>米国</p>
                  <p><strong>データ処理地域：</strong>日本を含むグローバル</p>
                  <p><strong>セキュリティ認証：</strong>PCI DSS Level 1、SOC 1/2/3</p>
                  <p><strong>DPA：</strong>
                    <a href="https://stripe.com/legal/dpa" className="text-blue-600 hover:underline ml-1">
                      Data Processing Agreement締結済み
                    </a>
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    ※カード番号は当社サーバーを経由せず、Stripeが直接処理します
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">分析・監視</h2>
          
          <div className="border rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <Shield className="text-orange-600 mt-1" size={20} />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Google LLC (Google Analytics)</h3>
                <div className="mt-2 space-y-1 text-sm">
                  <p><strong>利用目的：</strong>アクセス解析、サービス改善</p>
                  <p><strong>本社所在地：</strong>米国</p>
                  <p><strong>データ処理地域：</strong>グローバル</p>
                  <p><strong>プライバシー対策：</strong>IP匿名化有効</p>
                  <p><strong>オプトアウト：</strong>
                    <a href="https://tools.google.com/dlpage/gaoptout" className="text-blue-600 hover:underline ml-1">
                      Google Analytics オプトアウト アドオン
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">カスタマーサポート</h2>
          
          <div className="border rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <Mail className="text-indigo-600 mt-1" size={20} />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Google Workspace (Gmail)</h3>
                <div className="mt-2 space-y-1 text-sm">
                  <p><strong>利用目的：</strong>お問い合わせ対応、メール送受信</p>
                  <p><strong>本社所在地：</strong>米国</p>
                  <p><strong>データ処理地域：</strong>日本を含むグローバル</p>
                  <p><strong>セキュリティ認証：</strong>ISO 27001、SOC 2/3</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-8">
          <h3 className="font-semibold flex items-center gap-2 mb-2">
            <AlertCircle size={20} className="text-yellow-600" />
            サブプロセッサの追加・変更について
          </h3>
          <ul className="text-sm space-y-2">
            <li>• 新規サブプロセッサの追加または既存サブプロセッサの変更を行う場合、事前にメールにて通知いたします</li>
            <li>• 通知後30日以内にご異議がない場合、変更に同意いただいたものとみなします</li>
            <li>• ご異議がある場合は、サービスの解約が可能です（日割り返金対応）</li>
          </ul>
        </div>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-3">データ保護に関する取り組み</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>すべてのサブプロセッサとデータ保護契約（DPA）を締結</li>
            <li>定期的なセキュリティ監査の実施</li>
            <li>インシデント発生時の速やかな通知体制</li>
            <li>EU一般データ保護規則（GDPR）準拠の確認</li>
            <li>標準契約条項（SCC）の締結（該当する場合）</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-3">お問い合わせ</h2>
          <div className="bg-gray-100 p-4 rounded">
            <p>サブプロセッサに関するご質問は、以下までお問い合わせください。</p>
            <p className="mt-2">
              メール：<a href="mailto:privacy@projectflow.app" className="text-blue-600 hover:underline">privacy@projectflow.app</a>
            </p>
          </div>
        </section>

        <div className="pt-6 mt-8 border-t">
          <p className="text-sm text-gray-600">
            最終更新日：{new Date().toLocaleDateString('ja-JP')}
          </p>
        </div>
      </div>
    </>
  );
}