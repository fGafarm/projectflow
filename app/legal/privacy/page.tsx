// app/legal/privacy/page.tsx
'use client'

import Link from 'next/link'
import { ArrowLeft, Shield, Lock, Eye, Database, Mail, AlertCircle, Globe, FileText, Users } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <>
      <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
        <ArrowLeft size={20} />
        トップに戻る
      </Link>

      <h1 className="text-3xl font-bold mb-8">プライバシーポリシー</h1>
      
      <div className="space-y-6 text-gray-700">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <p className="font-semibold flex items-center gap-2">
            <Shield size={20} className="text-blue-600" />
            当社は、ユーザーの個人情報の適正な取扱いと保護を最優先事項とし、個人情報の保護に関する法律（APPI）その他関連法令・ガイドラインを遵守します。
          </p>
        </div>

        <section>
          <h2 className="text-xl font-semibold mb-3">1. 事業者情報</h2>
          <div className="bg-gray-50 p-4 rounded">
            <p>事業者名：ProjectFlow運営事務局（※正式名称を記載）</p>
            <p>所在地：〒100-0001 東京都千代田区（※正確な住所を記載）</p>
            <p>代表者：氏名（※記載）</p>
            <p>連絡先：support@projectflow.app / 03-0000-0000（※有効番号）</p>
            <p>個人情報保護責任者：氏名・役職（※記載）</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Database size={20} />
            2. 取得する情報の範囲
          </h2>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>アカウント情報：メールアドレス（必須）、ユーザー名（必須）、パスワード（bcryptでハッシュ化）</li>
            <li>サービス利用情報：プロジェクト・タスク・コメント・添付等のユーザーデータ</li>
            <li>技術情報：IPアドレス、端末情報、認証・監査ログ（ログイン履歴等）、Cookie/類似技術</li>
            <li>決済情報（有料プラン利用時）：決済トークン、請求先情報（カード番号を当社で保有しない）</li>
            <li>お問い合わせ情報：氏名、メールアドレス、内容、通話・チケット履歴</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. 取得方法</h2>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>ユーザーからの直接提供（登録・入力・アップロード）</li>
            <li>自動取得（Cookie、ログ、SDK等）</li>
            <li>受託・連携により取得する場合は、利用者に事前明示します</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Eye size={20} />
            4. 利用目的
          </h2>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>本サービスの提供・維持・運用、本人確認、認証、課金、問合せ対応</li>
            <li>障害対応・不正利用防止・セキュリティ確保・監査ログの保全</li>
            <li>利便性向上のための機能改善、品質向上、統計的分析（<strong>個人が特定されない形</strong>で実施）</li>
            <li>法令・行政当局の要請への対応、紛争対応</li>
            <li>新機能・重要なお知らせ・規約・ポリシー変更等の通知</li>
            <li>同意取得済みの場合に限り、マーケティング通知（配信停止可）</li>
          </ul>
          <p className="mt-2 text-sm bg-yellow-50 p-3 rounded">
            目的外利用は行いません。新たな目的で利用する場合は事前に通知し、必要に応じて同意を取得します。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. 第三者提供</h2>
          <p>
            法令に基づく場合、緊急時（生命・身体・財産の保護等）その他APPIで認められる場合を除き、本人同意なく第三者に提供しません。
            第三者提供の記録を作成・保存し、法に基づく開示請求に対応します。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Users size={20} />
            6. 委託・サブプロセッサ
          </h2>
          <div className="bg-gray-50 p-4 rounded">
            <p>
              当社は、業務の一部を委託することがあります。委託先とは秘密保持契約およびデータ保護契約（DPA）を締結し、適切な監督を行います。
            </p>
            <p className="mt-2 font-semibold">
              主要なサブプロセッサの一覧は、最新情報を
              <Link href="/legal/subprocessors" className="text-blue-600 hover:underline ml-1">
                /legal/subprocessors
              </Link>
              で公開し、追加・変更時は事前通知します。
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Globe size={20} />
            7. 外国にある第三者への提供（越境移転）
          </h2>
          <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
            <p>当社は、以下のサービスを利用し、個人データが日本国外で保管・処理される場合があります。</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Supabase（DB/認証）：東京リージョン（日本）／バックアップ等で国外処理が生じる場合あり</li>
              <li>Vercel（ホスティング/CDN）：主たる事業地 米国</li>
            </ul>
            <p className="mt-2 text-sm">
              越境移転に際しては、<strong>提供先の国名</strong>、当該国の個人情報保護制度、受領者が講ずる保護措置に関する情報を本人に提供し、必要に応じて同意を取得します。
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Lock size={20} />
            8. 安全管理措置
          </h2>
          <div className="space-y-3">
            <div className="bg-gray-50 p-3 rounded">
              <p className="font-semibold">組織的安全管理措置</p>
              <ul className="list-disc list-inside mt-1 text-sm">
                <li>個人情報保護責任者の設置、権限管理、ログ監査</li>
                <li>委託先監督、定期点検</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-3 rounded">
              <p className="font-semibold">人的安全管理措置</p>
              <ul className="list-disc list-inside mt-1 text-sm">
                <li>守秘義務、採用・在職・退職時教育</li>
                <li>アカウント無効化手順</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-3 rounded">
              <p className="font-semibold">物理的安全管理措置</p>
              <ul className="list-disc list-inside mt-1 text-sm">
                <li>入退室管理、盗難・紛失防止、媒体持出し管理</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-3 rounded">
              <p className="font-semibold">技術的安全管理措置</p>
              <ul className="list-disc list-inside mt-1 text-sm">
                <li>TLS暗号化、パスワードハッシュ（bcrypt）</li>
                <li>WAF/IDS、RLSによる論理分離</li>
                <li>脆弱性管理、バックアップ、監視・異常検知</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <AlertCircle size={20} className="text-red-600" />
            9. 個人データの漏えい等が発生した場合の対応
          </h2>
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <p>
              個人の権利利益を害するおそれがある漏えい等が発生した場合、<strong>個人情報保護委員会への報告</strong>および<strong>本人への通知</strong>を速やかに行い、
              原因究明・再発防止策を講じます。必要に応じ公表します。
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">10. 保有期間と消去</h2>
          <p>データ種別ごとに必要な期間のみ保存し、期間経過後は不可逆的に消去します。</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>アカウント情報：退会後<strong>90日</strong></li>
            <li>ログイン履歴・IP：<strong>90日</strong></li>
            <li>問合せ履歴：<strong>2年</strong></li>
            <li>請求関連：<strong>7年</strong>（法令）</li>
            <li>プロジェクト・タスク：退会後<strong>30日</strong>（バックアップからの完全消去には追加期間を要する場合があります）</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">11. 利用者の権利と手続</h2>
          <div className="bg-gray-50 p-4 rounded">
            <p>ユーザーは、<strong>開示、訂正・追加・削除、利用停止、第三者提供停止、第三者提供記録の開示</strong>を求めることができます。</p>
            <ul className="mt-3 space-y-1">
              <li>申請先：<a href="mailto:privacy@projectflow.app" className="text-blue-600 hover:underline">privacy@projectflow.app</a></li>
              <li>本人確認：登録メールからの申請または合理的な本人確認手続</li>
              <li>手数料：原則無料（短期間に反復する過度な請求等は実費を請求する場合があります）</li>
              <li>不開示事由：法令に基づき応じられない場合は、その理由を通知します</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">12. Cookie・Analytics・広告</h2>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>必須Cookie：認証状態の維持、セキュリティ</li>
            <li>機能Cookie：設定保存</li>
            <li>分析Cookie：Google Analytics（IP匿名化を有効化）。オプトアウト方法を案内します。</li>
            <li className="bg-green-50 p-2 rounded">
              行動ターゲティング広告：<strong>現在は実施していません</strong>（開始する場合は事前に同意管理を実装します）
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <FileText size={20} />
            13. 政府機関・法的請求への対応
          </h2>
          <p>
            適法な手続に基づく開示要請があった場合、法令に従い最小限の範囲で開示します。
            法が許す限り、ユーザーへの通知に努めます。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">14. 児童のプライバシー</h2>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <p>
              当社は<strong>18歳未満</strong>の方の利用について、親権者等の同意を前提とします。
              13歳未満を主たる対象とするサービスではありません。
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">15. 改定</h2>
          <p>
            本ポリシーを改定する場合、施行日・変更要旨を事前告知します。
            重要な変更は相当期間の周知を行います。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">16. 正文</h2>
          <p className="bg-gray-100 p-3 rounded">
            本ポリシーは日本語を正文とします。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Mail size={20} />
            お問い合わせ窓口
          </h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="font-semibold">個人情報に関するお問い合わせ</p>
            <p className="mt-2">ProjectFlow 個人情報保護責任者</p>
            <p>メール：privacy@projectflow.app</p>
            <p>電話：03-0000-0000（平日10:00-18:00）</p>
            <p className="text-sm mt-2">※返信には2-3営業日いただく場合があります</p>
          </div>
        </section>

        <div className="pt-6 mt-8 border-t">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
            <p className="font-semibold flex items-center gap-2">
              <Shield size={20} className="text-blue-600" />
              個人情報保護法の遵守
            </p>
            <p className="text-sm mt-2">
              本サービスは、個人情報の保護に関する法律（平成15年法律第57号）および関連法令・ガイドラインを遵守し、
              適切な個人情報の保護に努めています。
            </p>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            制定日：2024年1月1日
          </p>
          <p className="text-sm text-gray-600 mt-1">
            最終改定日：{new Date().toLocaleDateString('ja-JP')}
          </p>
        </div>
      </div>
    </>
  );
}