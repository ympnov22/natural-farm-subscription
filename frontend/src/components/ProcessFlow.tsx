import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { ArrowRight, UserPlus, MapPin, Sprout, Apple } from 'lucide-react'

export function ProcessFlow() {
  const steps = [
    {
      icon: UserPlus,
      title: '1. プラン選択・申込み',
      description: 'お好みの区画サイズとプランを選択し、オンラインで簡単申込み。'
    },
    {
      icon: MapPin,
      title: '2. 区画割り当て',
      description: 'あなた専用の区画を割り当て。現地見学も可能です。'
    },
    {
      icon: Sprout,
      title: '3. 栽培開始',
      description: '専門スタッフの指導のもと、種まきから栽培をスタート。'
    },
    {
      icon: Apple,
      title: '4. 収穫・楽しむ',
      description: '愛情込めて育てた野菜を収穫し、新鮮な味をお楽しみください。'
    }
  ]

  return (
    <section id="process" className="py-20 px-4 bg-white/50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-800 mb-4">
            体験の流れ
          </h2>
          <p className="text-xl text-green-700 max-w-2xl mx-auto">
            申込みから収穫まで、4つのステップで自然農業体験をお楽しみいただけます。
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon
              return (
                <div key={index} className="relative">
                  <Card className="border-green-200 h-full">
                    <CardHeader className="text-center">
                      <div className="mx-auto mb-4 p-4 bg-green-100 rounded-full w-fit">
                        <IconComponent className="h-8 w-8 text-green-600" />
                      </div>
                      <CardTitle className="text-lg text-green-800">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-green-700 text-center leading-relaxed">
                        {step.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                  
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="h-6 w-6 text-green-400" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
