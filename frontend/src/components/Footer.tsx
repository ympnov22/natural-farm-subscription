import React from 'react'
import { Separator } from './ui/separator'
import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-green-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="h-8 w-8 text-green-400" />
              <span className="text-2xl font-bold">自然農園</span>
            </div>
            <p className="text-green-200 mb-6 leading-relaxed">
              自然と共に育む、持続可能な農業体験を提供します。
              化学肥料や農薬を使わない自然農法で、安心・安全な野菜作りをサポートいたします。
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-6 w-6 text-green-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="h-6 w-6 text-green-400 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="h-6 w-6 text-green-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">サービス</h3>
            <ul className="space-y-2 text-green-200">
              <li><a href="#plans" className="hover:text-white transition-colors">プラン一覧</a></li>
              <li><a href="#service" className="hover:text-white transition-colors">サービス内容</a></li>
              <li><a href="#process" className="hover:text-white transition-colors">体験の流れ</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">よくある質問</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">お問い合わせ</h3>
            <div className="space-y-3 text-green-200">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>03-1234-5678</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@natural-farm.example.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-1" />
                <span>〒123-4567<br />東京都○○区○○町1-2-3</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-green-700" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-green-200 text-sm">
            <p>営業時間: 9:00-17:00（土日祝日も営業）</p>
            <p>定休日: 年末年始（12/29-1/3）</p>
          </div>
          <div className="text-green-200 text-sm md:text-right">
            <div className="space-x-4">
              <a href="/terms" className="hover:text-white transition-colors">利用規約</a>
              <a href="/privacy" className="hover:text-white transition-colors">プライバシーポリシー</a>
              <a href="/tokusho" className="hover:text-white transition-colors">特定商取引法</a>
            </div>
          </div>
        </div>

        <Separator className="my-6 bg-green-700" />

        <div className="text-center text-green-300 text-sm">
          <p>&copy; 2024 自然農園. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
