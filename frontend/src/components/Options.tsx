import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Wrench, Truck, Package } from 'lucide-react'

export function Options() {
  const options = [
    {
      id: 'maintenance',
      icon: Wrench,
      title: 'お手入れ代行',
      price: 2000,
      description: '忙しい方におすすめ。専門スタッフが水やりや草取りを代行します。',
      features: [
        '週2回の水やり',
        '月1回の草取り',
        '病害虫チェック',
        '成長レポート'
      ],
      popular: false
    },
    {
      id: 'harvest_delivery',
      icon: Truck,
      title: '収穫代行＆配送',
      price: 1500,
      description: '収穫のタイミングを逃さず、新鮮な野菜をご自宅までお届け。',
      features: [
        '最適タイミングでの収穫',
        'ご自宅まで配送',
        '収穫レポート付き',
        '保存方法のアドバイス'
      ],
      popular: true
    },
    {
      id: 'materials',
      icon: Package,
      title: '資材パック',
      price: 1000,
      description: '有機肥料や天然の防虫剤など、自然農に必要な資材をお届け。',
      features: [
        '有機肥料（月1回）',
        '天然防虫剤',
        '種子・苗の割引',
        '栽培ガイド付き'
      ],
      popular: false
    }
  ]

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-800 mb-4">
            便利なオプションサービス
          </h2>
          <p className="text-xl text-green-700 max-w-2xl mx-auto">
            より充実した農業体験のために、お客様のライフスタイルに合わせたオプションをご用意しています。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {options.map((option) => {
            const IconComponent = option.icon
            return (
              <Card key={option.id} className={`relative ${option.popular ? 'border-amber-500 border-2' : 'border-green-200'}`}>
                {option.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-amber-600">
                    おすすめ
                  </Badge>
                )}
                
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-fit">
                    <IconComponent className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-xl text-green-800">{option.title}</CardTitle>
                  <CardDescription className="text-green-600">{option.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-green-800">
                      +¥{option.price.toLocaleString()}
                    </span>
                    <span className="text-green-600">/月</span>
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {option.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-green-700">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-green-600 text-green-600 hover:bg-green-50"
                  >
                    オプションを追加
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-green-700 mb-4">
            複数のオプションを組み合わせることで、より快適な農業体験をお楽しみいただけます。
          </p>
          <Button size="lg" className="bg-green-600 hover:bg-green-700">
            オプション付きプランを選択
          </Button>
        </div>
      </div>
    </section>
  )
}
