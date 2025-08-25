import React from 'react'
import { Card, CardContent, CardDescription, CardHeader } from './ui/card'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Star } from 'lucide-react'

export function Testimonials() {
  const testimonials = [
    {
      name: '田中 美咲',
      age: '30代女性',
      location: '東京都在住',
      avatar: '/api/placeholder/64/64',
      rating: 5,
      comment: '初心者でしたが、スタッフの方が親切に教えてくださり、今では立派な野菜が育てられるようになりました。子供たちも喜んで手伝ってくれます。',
      plan: '中区画プラン利用'
    },
    {
      name: '佐藤 健一',
      age: '40代男性',
      location: '神奈川県在住',
      avatar: '/api/placeholder/64/64',
      rating: 5,
      comment: '仕事が忙しくてもお手入れ代行サービスのおかげで安心です。収穫した野菜の味は格別で、家族みんなで楽しんでいます。',
      plan: '大区画プラン + お手入れ代行'
    },
    {
      name: '山田 花子',
      age: '50代女性',
      location: '埼玉県在住',
      avatar: '/api/placeholder/64/64',
      rating: 5,
      comment: '定年後の趣味として始めました。同じ趣味を持つ仲間ができて、毎週農園に行くのが楽しみです。収穫祭も素晴らしいイベントでした。',
      plan: '小区画プラン利用'
    },
    {
      name: '鈴木 太郎',
      age: '20代男性',
      location: '千葉県在住',
      avatar: '/api/placeholder/64/64',
      rating: 4,
      comment: '一人暮らしでも小区画なら十分です。自分で育てた野菜を食べる喜びを知りました。料理のレパートリーも増えて一石二鳥です。',
      plan: '小区画プラン利用'
    }
  ]

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-800 mb-4">
            お客様の声
          </h2>
          <p className="text-xl text-green-700 max-w-2xl mx-auto">
            実際にご利用いただいているお客様から寄せられた、リアルな体験談をご紹介します。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-green-200 hover:border-green-400 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback className="bg-green-100 text-green-600">
                      {testimonial.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-green-800">{testimonial.name}</h4>
                    <p className="text-sm text-green-600">{testimonial.age} • {testimonial.location}</p>
                    <CardDescription className="text-xs text-amber-600 mt-1">
                      {testimonial.plan}
                    </CardDescription>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-green-700 leading-relaxed">
                  "{testimonial.comment}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-green-700 mb-6">
            多くのお客様にご満足いただいています。あなたも自然農業の魅力を体験してみませんか？
          </p>
          <div className="flex items-center justify-center space-x-8 text-green-600">
            <div className="text-center">
              <div className="text-3xl font-bold">98%</div>
              <div className="text-sm">満足度</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">500+</div>
              <div className="text-sm">利用者数</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">3年</div>
              <div className="text-sm">平均継続期間</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
