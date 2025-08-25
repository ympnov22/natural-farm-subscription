import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'

export function FAQ() {
  const faqs = [
    {
      question: '初心者でも大丈夫ですか？',
      answer: 'はい、全く問題ありません。経験豊富なスタッフが丁寧に指導いたします。栽培ガイドブックや動画教材もご用意しており、基礎から学んでいただけます。'
    },
    {
      question: '農具は用意する必要がありますか？',
      answer: '基本的な農具はすべてレンタルでご利用いただけます。軍手や長靴など個人で使用するものはご持参いただくか、現地でも購入可能です。'
    },
    {
      question: '雨の日でも作業できますか？',
      answer: '雨天時は基本的に作業をお休みいただきます。ただし、ハウス内での作業や座学などは可能です。天候による振替制度もございます。'
    },
    {
      question: '収穫した野菜はどのくらい取れますか？',
      answer: '区画サイズや栽培する野菜によって異なりますが、小区画でも月に2-3kg程度の収穫が期待できます。季節によって収穫量は変動します。'
    },
    {
      question: '途中で解約はできますか？',
      answer: 'はい、可能です。月額プランは1ヶ月前、年額プランは3ヶ月前までにお申し出ください。顧客ポータルからオンラインで手続きできます。'
    },
    {
      question: '駐車場はありますか？',
      answer: '無料駐車場を完備しております。各区画の近くに駐車できるよう配慮しており、重い荷物の運搬も楽々です。'
    },
    {
      question: '子供と一緒に参加できますか？',
      answer: 'もちろんです。ファミリー向けのイベントも定期的に開催しており、お子様の食育にも最適です。安全面にも十分配慮しております。'
    },
    {
      question: '有機JAS認証は取得していますか？',
      answer: '現在認証取得に向けて準備中です。化学肥料・農薬は一切使用せず、有機JAS基準に準拠した栽培を行っております。'
    }
  ]

  return (
    <section id="faq" className="py-20 px-4 bg-white/50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-800 mb-4">
            よくある質問
          </h2>
          <p className="text-xl text-green-700 max-w-2xl mx-auto">
            お客様からよくいただくご質問にお答えします。その他ご不明な点がございましたら、お気軽にお問い合わせください。
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white rounded-lg border border-green-200 px-6"
              >
                <AccordionTrigger className="text-left text-green-800 hover:text-green-600">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-green-700 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <p className="text-green-700 mb-4">
            その他のご質問やご相談がございましたら、お気軽にお問い合わせください。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:info@natural-farm.example.com" 
              className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              メールで問い合わせ
            </a>
            <a 
              href="tel:03-1234-5678" 
              className="inline-flex items-center justify-center px-6 py-3 border border-green-600 text-green-600 rounded-md hover:bg-green-50 transition-colors"
            >
              電話で問い合わせ
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
