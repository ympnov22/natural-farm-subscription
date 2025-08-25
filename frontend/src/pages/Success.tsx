import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { CheckCircle, Calendar, CreditCard, Users, Mail, Phone } from 'lucide-react'

export function Success() {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [sessionData, setSessionData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (sessionId) {
      setTimeout(() => {
        setSessionData({
          id: sessionId,
          customer_email: 'customer@example.com',
          amount_total: 5000,
          currency: 'jpy',
          payment_status: 'paid',
          subscription: {
            id: 'sub_example',
            current_period_start: Date.now() / 1000,
            current_period_end: (Date.now() / 1000) + (30 * 24 * 60 * 60), // 30 days
          },
          metadata: {
            plan_name: '中区画（10㎡）',
            plan_size: '10㎡',
            plan_interval: 'month',
            options: JSON.stringify([
              { id: 'maintenance', name: 'お手入れ代行', price: 2000 }
            ])
          }
        })
        setLoading(false)
      }, 1000)
    } else {
      setLoading(false)
    }
  }, [sessionId])

  const handleCustomerPortal = async () => {
    try {
      alert('顧客ポータル機能は Phase 4 で実装予定です')
    } catch (error) {
      console.error('Error accessing customer portal:', error)
      alert('顧客ポータルへのアクセスでエラーが発生しました')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-amber-50">
        <Header />
        <main className="py-12">
          <div className="max-w-2xl mx-auto p-6 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-green-700">決済情報を確認中...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!sessionId || !sessionData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-amber-50">
        <Header />
        <main className="py-12">
          <div className="max-w-2xl mx-auto p-6 text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">エラーが発生しました</h1>
            <p className="text-gray-700 mb-6">決済情報が見つかりません。</p>
            <Button asChild>
              <a href="/">ホームに戻る</a>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const options = sessionData.metadata.options ? JSON.parse(sessionData.metadata.options) : []

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-amber-50">
      <Header />
      <main className="py-12">
        <div className="max-w-4xl mx-auto p-6">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 p-4 bg-green-100 rounded-full w-fit">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-green-800 mb-4">
              お申し込みありがとうございます！
            </h1>
            <p className="text-xl text-green-700">
              自然農園のサブスクリプションが正常に開始されました
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Subscription Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-green-800">
                  <Calendar className="h-5 w-5 mr-2" />
                  ご契約内容
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-green-800">選択プラン</h3>
                  <p className="text-green-700">
                    {sessionData.metadata.plan_name}
                  </p>
                  <Badge variant="secondary" className="mt-1">
                    {sessionData.metadata.plan_interval === 'month' ? '月額プラン' : '年額プラン'}
                  </Badge>
                </div>

                {options.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-green-800">オプションサービス</h3>
                    <ul className="space-y-1">
                      {options.map((option: any, index: number) => (
                        <li key={index} className="text-green-700">
                          • {option.name} (+¥{option.price.toLocaleString()}/月)
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h3 className="font-semibold text-green-800">契約期間</h3>
                  <p className="text-green-700">
                    {new Date(sessionData.subscription.current_period_start * 1000).toLocaleDateString('ja-JP')} 〜 
                    {new Date(sessionData.subscription.current_period_end * 1000).toLocaleDateString('ja-JP')}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-green-800">お支払い金額</h3>
                  <p className="text-2xl font-bold text-green-800">
                    ¥{sessionData.amount_total.toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-green-800">
                  <Users className="h-5 w-5 mr-2" />
                  次のステップ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <h4 className="font-semibold text-green-800">確認メールをチェック</h4>
                      <p className="text-sm text-green-700">契約詳細とアクセス情報をお送りしました</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <h4 className="font-semibold text-green-800">農園見学の予約</h4>
                      <p className="text-sm text-green-700">お電話またはメールでご予約ください</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <div>
                      <h4 className="font-semibold text-green-800">栽培開始</h4>
                      <p className="text-sm text-green-700">専門スタッフがサポートいたします</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-green-200">
                  <Button 
                    onClick={handleCustomerPortal}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    契約管理ポータル
                  </Button>
                  <p className="text-xs text-green-600 mt-2 text-center">
                    支払い方法の変更や解約はこちらから
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-green-800">お問い合わせ</CardTitle>
              <CardDescription>
                ご不明な点がございましたら、お気軽にお問い合わせください
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-semibold text-green-800">メール</p>
                    <p className="text-green-700">info@natural-farm.example.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-semibold text-green-800">電話</p>
                    <p className="text-green-700">03-1234-5678</p>
                    <p className="text-sm text-green-600">平日 9:00-18:00</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg">
              <a href="/">ホームに戻る</a>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
