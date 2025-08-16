// app/legal/tokushoho/page.tsx
'use client'

import Link from 'next/link'
import { ArrowLeft, Building, Phone, Mail, CreditCard, Package, AlertCircle } from 'lucide-react'

export default function TokushohoPage() {
  return (
    <>
      <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
        <ArrowLeft size={20} />
        トップに戻る
      </Link>

      <h1 className="text-3xl font-bold mb-8">特定商取引法に基づく表記</h1>
      
      <div className="space-y-6 text-gray-700">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-sm flex items-center gap-2">
            <AlertCircle size={20} className="text-yellow-600" />
            特定商取引法第11条に基づく表記
          </p>
        </div>

        <section className="border-b pb-4">
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Building size={18} />
            販売事業者
          </h2>
          <p>ProjectFlow運営事務局</p>
        </section>

        <section className="border-b pb-4">
          <h2 className="text-lg font-semibold mb-2">運営責任者</h2>
          <p>代表者名（※正式サービス開始時に記載）</p>
        </section>

        <section className="border-b pb-4">
          <h2 className="text-lg font-semibold mb-2">所在地</h2>
          <p>〒100-0001 東京都千代田区（※正式サービス開始時に記載）</p>
        </section>

        <section className="border-b pb-4">
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Phone size={18} />
            電話番号
          </h2>
          <p>03-0000-0000（平日10:00-18:00）</p>
          <p className="text-sm text-gray-600 mt-1">※お問い合わせはメールにて承っております</p>
        </section>

        <section className="border-b pb-4">
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Mail size={18} />
            メールアドレス
          </h2>
          <p>support@projectflow.app</p>
        </section>

        <section className="border-b pb-4">
          <h2 className="text-lg font-semibold mb-2">サービスURL</h2>
          <p>
            <a href="https://gafarmprojectflow.vercel.app" className="text-blue-600 hover:underline">
              https://gafarmprojectflow.vercel.app
            </a>
          </p>
        </section>

        <section className="border-b pb-4">
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <CreditCard size={18} />
            販売価格
          </h2>
          <div className="bg-gray-50 p-4 rounded mt-2">
            <p className="font-semibold">無料プラン</p>
            <ul className="mt-2 text-sm space-y-1">
              <li>月額料金：0円</li>
              <li>プロジェクト数：3個まで</li>
              <li>ユーザー数：1名</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded mt-3">
            <p className="font-semibold">有料プラン（予定）</p>
            <ul className="mt-2 text-sm space-y-1">
              <li>スタンダード：月額980円（税込）</li>
              <li>プロフェッショナル：月額2,980円（税込）</li>
              <li>エンタープライズ：お問い合わせください</li>
            </ul>
            <p className="text-xs text-gray-600 mt-2">※価格は変更される可能性があります</p>
          </div>
        </section>

        <section className="border-b pb-4">
          <h2 className="text-lg font-semibold mb-2">商品以外の必要料金</h2>
          <p>インターネット接続料金、通信料金等はお客様のご負担となります。</p>
        </section>

        <section className="border-b pb-4">
          <h2 className="text-lg font-semibold mb-2">支払方法</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>クレジットカード（Visa、Mastercard、American Express、JCB）</li>
            <li>デビットカード</li>
            <li>その他、当社が定める決済方法</li>
          </ul>
        </section>

        <section className="border-b pb-4">
          <h2 className="text-lg font-semibold mb-2">支払時期</h2>
          <p>有料プランお申し込み時に初回料金をお支払いいただきます。</p>
          <p>以降、毎月自動更新となり、更新日に料金が請求されます。</p>
        </section>

        <section className="border-b pb-4">
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Package size={18} />
            サービス提供時期
          </h2>
          <p>お申し込み完了後、即時ご利用いただけます。</p>
        </section>

        <section className="border-b pb-4">
          <h2 className="text-lg font-semibold mb-2">返品・キャンセル</h2>
          <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
            <p className="font-semibold mb-2">返金ポリシー</p>
            <ul className="text-sm space-y-2">
              <li>• サービスの性質上、原則として返金はお受けしておりません。</li>
              <li>• ただし、当社の責めに帰すべき事由によりサービスが利用できなかった場合は、利用できなかった期間に応じて日割り計算にて返金いたします。</li>
              <li>• 初回お申し込みから7日以内であれば、全額返金いたします（クーリングオフ対応）。</li>
            </ul>
          </div>
        </section>

        <section className="border-b pb-4">
          <h2 className="text-lg font-semibold mb-2">解約方法</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>アカウント設定画面から「プラン変更」を選択</li>
            <li>「無料プランに変更」または「退会」を選択</li>
            <li>確認画面で「解約する」をクリック</li>
            <li>解約完了メールが送信されます</li>
          </ol>
          <p className="text-sm text-gray-600 mt-2">
            ※解約後も当月末まではサービスをご利用いただけます
          </p>
        </section>

        <section className="border-b pb-4">
          <h2 className="text-lg font-semibold mb-2">動作環境</h2>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">推奨ブラウザ</p>
            <ul className="text-sm space-y-1">
              <li>• Google Chrome（最新版）</li>
              <li>• Mozilla Firefox（最新版）</li>
              <li>• Safari（最新版）</li>
              <li>• Microsoft Edge（最新版）</li>
            </ul>
            <p className="text-xs text-gray-600 mt-2">
              ※Internet Explorerはサポート対象外です
            </p>
          </div>
        </section>

        <section className="border-b pb-4">
          <h2 className="text-lg font-semibold mb-2">特記事項</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>本サービスはSaaS（Software as a Service）形式で提供されます。</li>
            <li>データはクラウド上に保存され、インターネット接続が必要です。</li>
            <li>サービス内容は予告なく変更される場合があります。</li>
            <li>法人でのご利用の場合は、別途お問い合わせください。</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">その他</h2>
          <p>
            詳細な利用条件については「<Link href="/legal/terms" className="text-blue-600 hover:underline">利用規約</Link>」をご確認ください。
          </p>
          <p className="mt-2">
            個人情報の取扱いについては「<Link href="/legal/privacy" className="text-blue-600 hover:underline">プライバシーポリシー</Link>」をご確認ください。
          </p>
        </section>

        <div className="pt-6 mt-8 border-t">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
            <p className="text-sm">
              本表記は特定商取引に関する法律に基づき記載しております。
              ご不明な点がございましたら、お気軽にお問い合わせください。
            </p>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            最終更新日: {new Date().toLocaleDateString('ja-JP')}
          </p>
        </div>
      </div>
    </>
  );
}