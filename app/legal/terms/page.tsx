// app/legal/terms/page.tsx
'use client'

import Link from 'next/link'
import { ArrowLeft, AlertTriangle, Shield, FileText } from 'lucide-react'

export default function TermsPage() {
  return (
    <>
      <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
        <ArrowLeft size={20} />
        トップに戻る
      </Link>

      <h1 className="text-3xl font-bold mb-8">利用規約</h1>
      
      <div className="space-y-6 text-gray-700">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-sm font-semibold">
            本規約は、ProjectFlow運営事務局（以下「当社」）が提供するタスク管理サービス「ProjectFlow」（以下「本サービス」）の利用条件を定めるものです。
          </p>
        </div>

        <section>
          <h2 className="text-xl font-semibold mb-3">第1条（適用）</h2>
          <p>
            本規約は、本サービスの利用に関する当社とユーザーとの間の一切の関係に適用されます。
            個別に規約・ガイド・ポリシー等（以下「個別規定」）がある場合、個別規定は本規約の一部を構成し、
            両者が矛盾する場合は個別規定が優先します。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">第2条（定義）</h2>
          <ol className="list-decimal list-inside space-y-1">
            <li>「ユーザー」：本規約に同意のうえ本サービスを利用する個人または法人</li>
            <li>「ユーザーデータ」：ユーザーが本サービスに保存・送信するプロジェクト、タスク、添付、コメント、メタデータ等</li>
            <li>「知的財産権」：著作権、特許権、実用新案権、意匠権、商標権その他一切の権利</li>
            <li>「有料プラン」：当社が別途定める対価を要する本サービスのプラン</li>
            <li>「ベータ機能」：試験的・限定的に提供する機能</li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">第3条（利用登録）</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>利用希望者は、本規約に同意のうえ、当社の定める方法により登録を申請するものとします。</li>
            <li>18歳未満は、親権者等の法定代理人の同意を得て申請してください。</li>
            <li>当社は、以下の場合、登録を承認しないことがあります。
              <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                <li>虚偽の事項を届け出た場合</li>
                <li>過去に本規約違反があった場合</li>
                <li>反社会的勢力等との関係が判明した場合</li>
                <li>その他、当社が不適切と判断した場合</li>
              </ul>
            </li>
            <li className="bg-yellow-50 p-2 rounded">
              ユーザーは反社会的勢力に該当しないことを<strong>表明保証</strong>し、これに反した場合、当社は催告なく解除できるものとします。
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">第4条（アカウント管理）</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>ユーザーは、自己の責任でID・パスワード等を管理するものとします。</li>
            <li>アカウントの貸与・譲渡・売買等は禁止します。</li>
            <li>管理不十分等により生じた損害はユーザーの負担とし、当社は故意・重過失がある場合を除き責任を負いません。</li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">第5条（利用環境の準備）</h2>
          <p>
            本サービスの利用に必要な端末・通信環境等はユーザーの費用と責任で準備・維持するものとします。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <AlertTriangle size={20} className="text-orange-600" />
            第6条（禁止事項）
          </h2>
          <p>ユーザーは、以下の行為をしてはなりません。</p>
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li>法令・公序良俗に反する行為、犯罪行為またはそのおそれのある行為</li>
            <li>当社または第三者の権利・利益を侵害する行為（知的財産権、名誉・信用、プライバシー等）</li>
            <li>サーバー・ネットワーク等の機能を阻害する行為、過度な負荷を与える行為、サービス運営を妨害する行為</li>
            <li>不正アクセス、認証回避、セキュリティ・機能の測定や制限を回避する行為</li>
            <li>スクレイピング、クローリング、APIのレート制限回避、ボット等による大量アクセス</li>
            <li>リバースエンジニアリング、逆コンパイル、逆アセンブル（適用されるOSSライセンスが明示的に許容する場合を除く）</li>
            <li>スパム送信、マルウェア・有害プログラムの配布</li>
            <li>他者になりすます行為、本人の同意なく個人情報を収集・蓄積する行為</li>
            <li>反社会的勢力への利益供与その他関与</li>
            <li>法令または本規約に違反し、または当社が不適切と判断する行為</li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">第7条（知的財産権）</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>本サービスに関する知的財産権は当社またはライセンサーに帰属します。</li>
            <li>本規約に基づく利用許諾は本サービスの使用権に限られ、権利移転を意味しません。</li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">第8条（ユーザーデータの権利とライセンス）</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>ユーザーデータの権利はユーザーに帰属します。</li>
            <li>ユーザーは、当社に対し、本サービスの提供、保守、品質改善、障害対応、セキュリティ対応のために必要な範囲でユーザーデータを複製・保存・解析等する非独占的・無償の利用許諾を付与します。</li>
            <li>当社は、ユーザーデータを<strong>個人が特定されない形に加工（匿名加工情報・統計情報化）</strong>したうえで、サービス改善・新機能開発等に利用することがあります。</li>
            <li className="bg-green-50 p-2 rounded">
              <strong>当社は、ユーザーのコンテンツを機械学習の学習データとして利用しません</strong>（個別同意がある場合を除く）。
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">第9条（有料プラン・料金・課税）</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>有料プランの内容・料金・支払方法は、別途定め本サービス内に表示します。表示価格には消費税を含むか否かを明示します。</li>
            <li>有料プランはサブスクリプション（自動更新）となる場合があり、更新時期、解約期限、日割り・返金可否を明示します。</li>
            <li className="bg-yellow-50 p-2 rounded">
              自動更新の有無、更新日、<strong>解約申請期限（例：更新24時間前）</strong>、日割・返金可否、税込/税抜の別を料金表に明示します。
            </li>
            <li>料金は原則前払いとし、法令に別段の定めがある場合を除き返金しません。</li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">第10条（サービス内容の変更・提供の停止等）</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>当社は、合理的な必要がある場合、事前通知のうえで本サービスの内容を変更できます。</li>
            <li>当社は、以下の場合、事前の通知なく本サービスの全部または一部の提供を停止・中断できます。
              <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                <li>システム保守・点検・更新</li>
                <li>天災地変等の不可抗力</li>
                <li>通信回線等の障害、過度なアクセス集中</li>
                <li>セキュリティ上の緊急対応</li>
              </ul>
            </li>
            <li>当社は前各項に基づく変更・停止等によりユーザーに生じた損害について、当社の故意または重過失がある場合を除き、責任を負いません。</li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">第11条（ベータ機能）</h2>
          <p>
            ベータ機能は現状有姿で提供され、可用性・保存・互換性等について一切の保証をしません。
            予告なく変更・停止することがあります。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">第12条（保証の否認）</h2>
          <p>
            当社は、本サービスにつき、事実上または法律上の瑕疵がないこと、特定目的適合性、完全性、正確性、継続性等を明示黙示を問わず保証しません。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Shield size={20} />
            第13条（責任の制限）
          </h2>
          <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
            <ol className="list-decimal list-inside space-y-2">
              <li>当社の故意または重過失に基づく場合を除き、当社の責任は、ユーザーに現実に発生した直接かつ通常の損害に限られます。</li>
              <li>
                上記の場合の賠償上限は、<strong>有料ユーザー</strong>については直近12か月にユーザーが当社に支払った対価総額、
                <strong className="text-red-600">無料ユーザー</strong>については<strong className="text-red-600">1万円（税抜）</strong>とします。
              </li>
              <li>逸失利益、間接損害、特別損害、結果的損害、データの喪失・毀損に伴う損害は、当社の故意または重過失がある場合を除き、賠償の対象に含みません。</li>
              <li>消費者契約法その他の強行法規により制限される範囲では、本条は適用されません。</li>
            </ol>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">第14条（補償）</h2>
          <p>
            ユーザーが本規約違反等により当社に損害を与えた場合、当該損害（合理的な調査・弁護士費用を含む）を賠償するものとします。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">第15条（利用制限・登録抹消）</h2>
          <p>当社は、ユーザーが以下のいずれかに該当する場合、事前通知なく利用の一部制限・一時停止・登録抹消等の措置を講じることができます。</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>本規約違反</li>
            <li>登録事項の虚偽</li>
            <li>料金等の不履行</li>
            <li>当社の連絡に一定期間応答がない場合</li>
            <li>最終利用から長期間経過</li>
            <li>その他当社が不適切と判断した場合</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">第16条（退会）</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>ユーザーは所定の手続により退会できます。</li>
            <li>退会時、ユーザーは所定の方法でユーザーデータをエクスポートできます。</li>
            <li>退会後、当社は法令上の保存義務・紛争対応等の必要がある場合を除き、<strong>30日</strong>を目安にユーザーデータを削除します。</li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">第17条（データのバックアップ）</h2>
          <div className="bg-blue-50 p-3 rounded">
            <p>
              当社は商業的に合理的な努力でデータ保護に努めますが、<strong>ユーザーデータのバックアップはユーザーの責任で行うものとします</strong>。
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">第18条（権利義務の譲渡）</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>ユーザーは、当社の書面による事前承諾なく、契約上の地位または権利義務を第三者に譲渡・承継・担保提供できません。</li>
            <li>当社は、事業譲渡・会社分割・合併その他の事業承継に伴い、本規約上の地位および権利義務を第三者に承継させることができます。</li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">第19条（通知・連絡）</h2>
          <p>
            当社からの通知は、本サービス内掲示、メール送信その他当社の定める方法により行います。
            ユーザーは連絡先情報を常に最新に保つものとします。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">第20条（規約の変更）</h2>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <ol className="list-decimal list-inside space-y-2">
              <li>本規約は、次の各号のいずれかに該当する場合、<strong>民法第548条の4</strong>に基づき、ユーザーの個別同意を要せず変更することができます。
                <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                  <li>変更がユーザーの一般の利益に適合するとき</li>
                  <li>変更が契約の目的に反せず、かつ、変更の必要性・内容の相当性その他の事情に照らして合理的なとき</li>
                </ul>
              </li>
              <li>変更の効力発生日、変更内容を<strong>原則発効日の1か月前までに</strong>周知します。ユーザーに重大な不利益を与える場合は相当期間の周知を行います。</li>
              <li>変更後、効力発生日以降に本サービスを利用した場合、当該変更に同意したものとみなします。</li>
            </ol>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">第21条（反社会的勢力の排除）</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>ユーザーは、自己または実質的に関与する者が反社会的勢力に該当せず、将来にわたり関与しないことを表明・保証します。</li>
            <li>表明に反する事実が判明した場合、当社は催告なく本契約を解除できます。</li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">第22条（輸出管理）</h2>
          <p>
            ユーザーは、日本その他関係国の輸出入関連法令に違反して本サービスを利用しないものとします。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">第23条（オープンソースソフトウェア）</h2>
          <p>
            本サービスにはOSSが含まれる場合があります。各OSSのライセンス条件が本規約に優先します。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">第24条（全文合意）</h2>
          <p>
            本規約は、本件に関する当事者間の最終かつ完全な合意を構成し、口頭または書面による事前の合意・了解に優先します。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">第25条（存続条項）</h2>
          <p className="bg-gray-100 p-3 rounded">
            第7条、第8条第2〜4項、第9条、第12〜14条、第17条、第18条、第20〜25条は契約終了後も有効に存続します。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <FileText size={20} />
            第26条（準拠法・裁判管轄・言語）
          </h2>
          <div className="bg-gray-100 p-4 rounded">
            <ol className="list-decimal list-inside space-y-2">
              <li>準拠法は日本法とします。</li>
              <li>第一審の専属的合意管轄は当社本店所在地を管轄する<strong>東京地方裁判所</strong>とします。</li>
              <li>本規約は日本語を正文とし、訳文が作成された場合は日本語が優先します。</li>
            </ol>
          </div>
        </section>

        <div className="pt-6 mt-8 border-t">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
            <p className="text-sm">
              本規約は民法の定型約款に該当し、個別の合意がなくても契約の内容となることがあります。
              ご不明な点がございましたら、お問い合わせください。
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