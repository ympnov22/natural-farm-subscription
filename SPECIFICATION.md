# 自然農の貸し農園サブスク - 仕様書

## 1. アプリケーション概要

### 1.1 目的
自然農をテーマにした貸し農園のサブスクリプションサービスのデモ版を提供する。
利用者がプラン選択から決済完了まで一気通貫で体験できるWebアプリケーション。

### 1.2 ターゲットユーザー
- 自然農に興味がある個人・家族
- 都市部在住で農業体験を求める人
- 健康的な食生活を志向する人

## 2. 機能要件

### 2.1 ランディングページ（LP）

#### 2.1.1 Heroセクション
- **キャッチコピー**: 自然農の魅力を伝える訴求力のあるメッセージ
- **CTAボタン**: 「プランを見る」「今すぐ始める」等の行動喚起ボタン
- **ヒーロー画像**: 自然農園の美しい風景（ダミー画像使用）

#### 2.1.2 プラン比較表
| プラン | 区画サイズ | 月額料金 | 年額料金（自動更新） |
|--------|------------|----------|---------------------|
| 小区画 | 5㎡ | 3,000円 | 30,000円 |
| 中区画 | 10㎡ | 5,000円 | 50,000円 |
| 大区画 | 20㎡ | 9,000円 | 90,000円 |

#### 2.1.3 オプションサービス
- **お手入れ代行**: +2,000円/月
- **収穫代行＆配送**: +1,500円/月
- **資材パック**: +1,000円/月

#### 2.1.4 その他セクション
- サービス紹介
- 体験の流れ
- オプション詳細説明
- FAQ（よくある質問）
- お客様の声（ダミーデータ）

### 2.2 法的ページ
- 特定商取引法に基づく表記（ダミー可）
- 利用規約（ダミー可）
- プライバシーポリシー（ダミー可）

### 2.3 決済フロー

#### 2.3.1 プラン選択画面
- 区画サイズ選択（小/中/大）
- 課金タイプ選択（月額/年額）
- オプション選択（複数選択可）
- 合計金額表示
- 「決済に進む」ボタン

#### 2.3.2 Stripe Checkout
- Stripe Checkoutページへリダイレクト
- 支払い情報入力
- 決済処理

#### 2.3.3 サンクスページ
- 決済完了メッセージ
- 契約内容の確認
- 顧客ポータルへのリンク
- 次のステップの案内

### 2.4 顧客ポータル
- Stripe Customer Portalを使用
- サブスクリプション管理
- 支払い方法変更
- 解約手続き

## 3. データ構造

### 3.1 Supabaseテーブル設計

#### 3.1.1 subscriptions テーブル
```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_customer_id VARCHAR NOT NULL,
  stripe_subscription_id VARCHAR NOT NULL,
  plot_size VARCHAR NOT NULL CHECK (plot_size IN ('small', 'medium', 'large')),
  billing_type VARCHAR NOT NULL CHECK (billing_type IN ('monthly', 'yearly')),
  status VARCHAR NOT NULL CHECK (status IN ('active', 'cancelled', 'past_due')),
  options JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 3.1.2 customers テーブル
```sql
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_customer_id VARCHAR UNIQUE NOT NULL,
  email VARCHAR NOT NULL,
  name VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3.2 Stripe商品設定

#### 3.2.1 基本プラン
- 小区画月額: price_small_monthly
- 小区画年額: price_small_yearly
- 中区画月額: price_medium_monthly
- 中区画年額: price_medium_yearly
- 大区画月額: price_large_monthly
- 大区画年額: price_large_yearly

#### 3.2.2 オプション
- お手入れ代行: price_maintenance_monthly
- 収穫代行＆配送: price_harvest_delivery_monthly
- 資材パック: price_materials_monthly

## 4. API仕様

### 4.1 Next.js API Routes

#### 4.1.1 POST /api/create-checkout-session
**リクエスト**
```typescript
{
  plotSize: 'small' | 'medium' | 'large',
  billingType: 'monthly' | 'yearly',
  options: string[] // ['maintenance', 'harvest_delivery', 'materials']
}
```

**レスポンス**
```typescript
{
  sessionId: string
}
```

#### 4.1.2 POST /api/webhooks/stripe
Stripe Webhookエンドポイント
- subscription.created
- subscription.updated
- subscription.deleted
- customer.created

#### 4.1.3 GET /api/customer-portal
顧客ポータルセッション作成

## 5. UI/UX設計

### 5.1 デザインコンセプト
- **テーマ**: 自然農らしく、シンプルで温かみのある雰囲気
- **カラーパレット**: 
  - プライマリ: 自然な緑色系
  - セカンダリ: 土の茶色系
  - アクセント: 暖かいオレンジ系
- **フォント**: 読みやすく親しみやすいフォント
- **画像**: 自然農園の風景、野菜、農作業の様子

### 5.2 レスポンシブ対応
- モバイルファースト設計
- タブレット、デスクトップ対応
- Lighthouseスコア: Performance 85点以上（モバイル）

## 6. セキュリティ要件

### 6.1 Stripe Webhook検証
- Webhook署名の検証実装
- 重複処理防止

### 6.2 環境変数管理
- Stripe APIキーの適切な管理
- Supabase認証情報の保護

## 7. パフォーマンス要件

### 7.1 ページ読み込み速度
- First Contentful Paint: 2秒以内
- Largest Contentful Paint: 3秒以内

### 7.2 SEO対応
- メタタグ設定
- 構造化データ実装
- サイトマップ生成

## 8. テスト要件

### 8.1 機能テスト
- プラン選択から決済完了までのフロー
- Webhook処理の正常動作
- 顧客ポータルの動作確認

### 8.2 決済テスト
- Stripeテストモードでの決済フロー確認
- 各プラン・オプションの正確な金額計算

## 9. デプロイ要件

### 9.1 環境設定
- 本番環境: Vercel（優先）またはFly.io
- データベース: Supabase本番環境
- 決済: Stripe本番環境（テストモード）

### 9.2 CI/CD
- GitHubリポジトリとの連携
- 自動デプロイ設定

## 10. 受入基準

1. ✅ LPからプラン選択→決済→サンクスページまで正常に動作すること
2. ✅ Supabaseに「区画サイズ・課金タイプ・オプション・ステータス」が保存されること
3. ✅ 顧客ポータルで解約や支払変更が可能であること
4. ✅ GitHubリポジトリに仕様書・タスクリスト・ソースコードが整理されていること
5. ✅ Lighthouseスコア：Performance 85点以上（モバイル）
