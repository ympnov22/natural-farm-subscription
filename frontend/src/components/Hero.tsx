import { Button } from './ui/button'
import { ArrowRight, Sprout, Heart, Users } from 'lucide-react'

export function Hero() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-green-800 mb-6 leading-tight">
            自然と共に育む
            <br />
            <span className="text-amber-600">あなただけの農園</span>
          </h1>
          
          <p className="text-xl text-green-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            化学肥料や農薬を使わない自然農法で、安心・安全な野菜を育てませんか？
            都市部からアクセス良好な農園で、本格的な農業体験をお楽しみいただけます。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-4" asChild>
              <a href="/plans">
                プランを見る
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-green-600 text-green-600 hover:bg-green-50">
              体験談を読む
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="flex flex-col items-center p-6 bg-white/60 rounded-lg backdrop-blur-sm">
              <Sprout className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-green-800 mb-2">自然農法</h3>
              <p className="text-green-700 text-center">
                化学肥料・農薬不使用の安心安全な栽培方法
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white/60 rounded-lg backdrop-blur-sm">
              <Heart className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-lg font-semibold text-green-800 mb-2">健康的な食生活</h3>
              <p className="text-green-700 text-center">
                自分で育てた新鮮な野菜で豊かな食卓を
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white/60 rounded-lg backdrop-blur-sm">
              <Users className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-lg font-semibold text-green-800 mb-2">コミュニティ</h3>
              <p className="text-green-700 text-center">
                同じ志を持つ仲間との交流と学び合い
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
