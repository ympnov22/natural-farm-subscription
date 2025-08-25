import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Leaf, Shield, Truck, Users, BookOpen, Award } from 'lucide-react'

export function ServiceIntro() {
  const services = [
    {
      icon: Leaf,
      title: '自然農法指導',
      description: '経験豊富な農家による丁寧な指導で、初心者でも安心して始められます。'
    },
    {
      icon: Shield,
      title: '安心・安全',
      description: '化学肥料・農薬不使用。土壌検査も定期的に実施し、安全性を確保しています。'
    },
    {
      icon: Truck,
      title: 'アクセス良好',
      description: '都市部から車で30分圏内。駐車場完備で気軽にお越しいただけます。'
    },
    {
      icon: Users,
      title: 'コミュニティ',
      description: '同じ志を持つ仲間との交流。収穫祭やワークショップも定期開催。'
    },
    {
      icon: BookOpen,
      title: '学習サポート',
      description: '栽培ガイドブックや動画教材で、自宅でも学習を続けられます。'
    },
    {
      icon: Award,
      title: '品質保証',
      description: '育てた野菜の品質に自信あり。販売サポートも行っています。'
    }
  ]

  return (
    <section id="service" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-800 mb-4">
            充実のサービス内容
          </h2>
          <p className="text-xl text-green-700 max-w-2xl mx-auto">
            初心者から上級者まで、すべての方に満足いただける充実したサービスをご提供します。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <Card key={index} className="border-green-200 hover:border-green-400 transition-colors">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-fit">
                    <IconComponent className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-xl text-green-800">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-green-700 text-center leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
