// components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">© 2024 ProjectFlow. All rights reserved.</p>
          </div>
          <div className="flex gap-6">
            <Link href="/legal/terms" className="text-sm hover:text-blue-400 transition-colors">
              利用規約
            </Link>
            <Link href="/legal/privacy" className="text-sm hover:text-blue-400 transition-colors">
              プライバシーポリシー
            </Link>
            <Link href="/legal/tokushoho" className="text-sm hover:text-blue-400 transition-colors">
              特定商取引法
            </Link>
            <a href="mailto:support@projectflow.app" className="text-sm hover:text-blue-400 transition-colors">
              お問い合わせ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}