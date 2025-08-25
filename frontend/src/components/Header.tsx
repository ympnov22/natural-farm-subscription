import React from 'react'
import { Button } from './ui/button'
import { Leaf } from 'lucide-react'

export function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-green-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Leaf className="h-8 w-8 text-green-600" />
          <span className="text-2xl font-bold text-green-800">自然農園</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#plans" className="text-green-700 hover:text-green-900 transition-colors">
            プラン
          </a>
          <a href="#service" className="text-green-700 hover:text-green-900 transition-colors">
            サービス
          </a>
          <a href="#process" className="text-green-700 hover:text-green-900 transition-colors">
            体験の流れ
          </a>
          <a href="#faq" className="text-green-700 hover:text-green-900 transition-colors">
            FAQ
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="outline" className="hidden sm:inline-flex">
            ログイン
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            今すぐ始める
          </Button>
        </div>
      </div>
    </header>
  )
}
