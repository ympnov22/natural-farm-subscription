import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Check } from 'lucide-react'

export function PlanComparison() {
  const [billingType, setBillingType] = useState<'monthly' | 'yearly'>('monthly')

  const plans = [
    {
      id: 'small',
      name: '小区画プラン',
      size: '5㎡',
      monthlyPrice: 3000,
      yearlyPrice: 30000,
      description: '初心者の方におすすめ',
      features: [
        '5㎡の専用区画',
        '基本的な農具レンタル',
        '月1回の指導',
        'コミュニティアクセス'
      ],
      popular: false
    },
    {
      id: 'medium',
      name: '中区画プラン',
      size: '10㎡',
      monthlyPrice: 5000,
      yearlyPrice: 50000,
      description: '家族での利用に最適',
      features: [
        '10㎡の専用区画',
        '農具レンタル込み',
        '月2回の指導',
        'コミュニティアクセス',
        '収穫祭参加権'
      ],
      popular: true
    },
    {
      id: 'large',
      name: '大区画プラン',
      size: '20㎡',
      monthlyPrice: 9000,
      yearlyPrice: 90000,
      description: '本格的な農業体験',
      features: [
        '20㎡の専用区画',
        '全農具レンタル込み',
        '週1回の指導',
        'コミュニティアクセス',
        '収穫祭参加権',
        '販売サポート'
      ],
      popular: false
    }
  ]

  const getPrice = (plan: typeof plans[0]) => {
    return billingType === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice
  }

  const getSavings = (plan: typeof plans[0]) => {
    const monthlyTotal = plan.monthlyPrice * 12
    const yearlySavings = monthlyTotal - plan.yearlyPrice
    return yearlySavings
  }

  return (
    <section id="plans" className="py-20 px-4 bg-white/50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-800 mb-4">
            あなたに最適なプランを選択
          </h2>
          <p className="text-xl text-green-700 max-w-2xl mx-auto">
            区画サイズと料金体系からお選びいただけます。年額プランなら最大2ヶ月分お得です。
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="bg-green-100 p-1 rounded-lg">
            <Button
              variant={billingType === 'monthly' ? 'default' : 'ghost'}
              onClick={() => setBillingType('monthly')}
              className="px-6"
            >
              月額プラン
            </Button>
            <Button
              variant={billingType === 'yearly' ? 'default' : 'ghost'}
              onClick={() => setBillingType('yearly')}
              className="px-6"
            >
              年額プラン
              <Badge variant="secondary" className="ml-2 bg-amber-200 text-amber-800">
                お得
              </Badge>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card key={plan.id} className={`relative ${plan.popular ? 'border-green-500 border-2' : 'border-green-200'}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-600">
                  人気No.1
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-green-800">{plan.name}</CardTitle>
                <CardDescription className="text-green-600">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-green-800">
                    ¥{getPrice(plan).toLocaleString()}
                  </span>
                  <span className="text-green-600">
                    /{billingType === 'monthly' ? '月' : '年'}
                  </span>
                  {billingType === 'yearly' && (
                    <div className="text-sm text-amber-600 mt-1">
                      年間¥{getSavings(plan).toLocaleString()}お得
                    </div>
                  )}
                </div>
                <div className="text-lg text-green-700 font-semibold">
                  区画サイズ: {plan.size}
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                      <span className="text-green-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button 
                  className={`w-full ${plan.popular ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'}`}
                  asChild
                >
                  <a href="/plans">このプランを選択</a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
