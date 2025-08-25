# 自然農の貸し農園サブスク（デモ版）

## プロジェクト概要

自然農をテーマにした「貸し農園サブスク」アプリのデモ版です。
ランディングページ（LP）＋サブスク決済機能（Stripe）を実装し、利用者が「プラン選択 → 決済 → サンクスページ」まで一気通貫で体験できるアプリケーションです。

## 技術スタック

- **フロントエンド**: Next.js（App Router） + TypeScript
- **スタイリング**: Tailwind CSS + shadcn/ui
- **決済**: Stripe（Billing + Checkout + Customer Portal）
- **データベース**: Supabase（契約データ管理）
- **デプロイ**: Vercel（優先） or Fly.io

## 開発フェーズ

1. 仕様書・タスクリストの作成
2. LPデザイン実装（モック含む）
3. Stripe決済フロー実装
4. Webhook＋Supabase連携
5. 最終調整・デプロイ

## 開発状況

現在のフェーズ: **Phase 1 - 仕様書・タスクリスト作成中**
