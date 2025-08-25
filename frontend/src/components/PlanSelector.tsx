import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Checkbox } from './ui/checkbox'
import { Switch } from './ui/switch'
import { Label } from './ui/label'
import { Separator } from './ui/separator'
import { Check, Leaf, Users, TreePine } from 'lucide-react'
import { STRIPE_PLANS, STRIPE_OPTIONS, type StripePlan, type StripeOption } from '../lib/stripe'

interface PlanSelectorProps {
  onPlanSelect: (plan: StripePlan, options: StripeOption[], isYearly: boolean) => void
}

export function PlanSelector({ onPlanSelect }: PlanSelectorProps) {
  const [isYearly, setIsYearly] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<StripePlan | null>(null)
  const [selectedOptions, setSelectedOptions] = useState<StripeOption[]>([])

  const plans = [
    {
      ...STRIPE_PLANS[isYearly ? 'small_yearly' : 'small_monthly'],
      icon: Leaf,
      features: ['基本的な農具レンタル', '栽培ガイドブック', '月1回の指導', 'コミュニティアクセス'],
      popular: false,
    },
    {
      ...STRIPE_PLANS[isYearly ? 'medium_yearly' : 'medium_monthly'],
      icon: Users,
      features: ['基本的な農具レンタル', '栽培ガイドブック', '月2回の指導', 'コミュニティアクセス', '収穫祭参加権'],
      popular: true,
    },
    {
      ...STRIPE_PLANS[isYearly ? 'large_yearly' : 'large_monthly'],
      icon: TreePine,
      features: ['基本的な農具レンタル', '栽培ガイドブック', '週1回の指導', 'コミュニティアクセス', '収穫祭参加権', '専用駐車場'],
      popular: false,
    },
  ]

  const options = Object.values(STRIPE_OPTIONS)

  const handleOptionToggle = (option: StripeOption, checked: boolean) => {
    if (checked) {
      setSelectedOptions(prev => [...prev, option])
    } else {
      setSelectedOptions(prev => prev.filter(opt => opt.id !== option.id))
    }
  }

  const calculateTotal = () => {
    const planPrice = selectedPlan?.price || 0
    const optionsPrice = selectedOptions.reduce((sum, option) => sum + option.price, 0)
    const monthlyOptionsPrice = isYearly ? optionsPrice * 12 : optionsPrice
    return planPrice + monthlyOptionsPrice
  }

  const handleProceedToCheckout = () => {
    if (selectedPlan) {
      onPlanSelect(selectedPlan, selectedOptions, isYearly)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-800 mb-4">
          プランを選択してください
        </h1>
        <p className="text-xl text-green-700 mb-6">
          あなたにぴったりの農園プランを見つけましょう
        </p>
        
        <div className="flex items-center justify-center gap-4 mb-8">
          <Label htmlFor="yearly-toggle" className="text-green-700">月額</Label>
          <Switch
            id="yearly-toggle"
            checked={isYearly}
            onCheckedChange={setIsYearly}
          />
          <Label htmlFor="yearly-toggle" className="text-green-700">
            年額 <Badge variant="secondary" className="ml-2">2ヶ月分お得</Badge>
          </Label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {plans.map((plan) => {
          const IconComponent = plan.icon
          const isSelected = selectedPlan?.id === plan.id
          
          return (
            <Card 
              key={plan.id} 
              className={`relative cursor-pointer transition-all ${
                isSelected 
                  ? 'border-green-500 border-2 shadow-lg' 
                  : 'border-green-200 hover:border-green-300'
              } ${plan.popular ? 'border-amber-500' : ''}`}
              onClick={() => setSelectedPlan(plan)}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-amber-600">
                  おすすめ
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-fit">
                  <IconComponent className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl text-green-800">{plan.name}</CardTitle>
                <CardDescription className="text-green-600">{plan.size}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-green-800">
                    ¥{plan.price.toLocaleString()}
                  </span>
                  <span className="text-green-600">/{plan.interval === 'month' ? '月' : '年'}</span>
                  {isYearly && (
                    <div className="text-sm text-green-600 mt-1">
                      月額換算: ¥{Math.round(plan.price / 12).toLocaleString()}
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-green-700">
                      <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                {isSelected && (
                  <div className="mt-4 p-2 bg-green-50 rounded-md">
                    <div className="flex items-center text-green-700">
                      <Check className="h-4 w-4 mr-2" />
                      選択中
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {selectedPlan && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-green-800">オプションサービス</CardTitle>
            <CardDescription>
              より充実した農業体験のために、お好みのオプションを追加できます
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {options.map((option) => (
                <div key={option.id} className="flex items-center space-x-3 p-4 border border-green-200 rounded-lg">
                  <Checkbox
                    id={option.id}
                    checked={selectedOptions.some(opt => opt.id === option.id)}
                    onCheckedChange={(checked) => handleOptionToggle(option, checked as boolean)}
                  />
                  <div className="flex-1">
                    <Label htmlFor={option.id} className="text-green-800 font-medium cursor-pointer">
                      {option.name}
                    </Label>
                    <div className="text-green-600 text-sm">
                      +¥{option.price.toLocaleString()}/月
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {selectedPlan && (
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">ご注文内容</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-green-700">
                  {selectedPlan.name} ({selectedPlan.interval === 'month' ? '月額' : '年額'})
                </span>
                <span className="text-green-800 font-medium">
                  ¥{selectedPlan.price.toLocaleString()}
                </span>
              </div>
              
              {selectedOptions.map((option) => (
                <div key={option.id} className="flex justify-between">
                  <span className="text-green-700">
                    {option.name} {isYearly ? '(年額)' : '(月額)'}
                  </span>
                  <span className="text-green-800 font-medium">
                    +¥{(isYearly ? option.price * 12 : option.price).toLocaleString()}
                  </span>
                </div>
              ))}
              
              <Separator className="my-4" />
              
              <div className="flex justify-between text-lg font-bold">
                <span className="text-green-800">合計</span>
                <span className="text-green-800">
                  ¥{calculateTotal().toLocaleString()}
                  {isYearly ? '/年' : '/月'}
                </span>
              </div>
            </div>
            
            <Button 
              onClick={handleProceedToCheckout}
              className="w-full mt-6 bg-green-600 hover:bg-green-700 text-lg py-6"
              size="lg"
            >
              決済に進む
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
