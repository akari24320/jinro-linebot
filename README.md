# jinro-linebot
LINE上でプレイできる「人狼ゲーム」のBot。
Node.js + LINE Messaging APIを使用して開発中。

## ディレクトリ構成
jinro-linebot/
├── index.ts               # エントリーポイント
├── handlers/              # メッセージ処理系
│   ├── messageHandler.ts
│   └── joinHandler.ts
├── data/                  # 状態・ルーム情報などの管理
│   └── rooms.ts
├── utils/                 # 汎用的な処理（配役割り当てなど）
│   ├── roleAssigner.ts
│   └── gameLogic.ts
├── patterns.ts            # 配役パターン定義
├── .env                   # LINE Bot用の環境変数
└── package.json           # 依存モジュール情報

## 使用技術
- Node.js
- TypeScript
- LINE Messaging API
- Express（またはFastifyなどのHTTPサーバー）
- GitHub Actions（CI/CD予定）

## 機能概要
- ルーム作成 / 参加
- プレイヤーの配役ランダム割り当て
- 昼 / 夜のターン制進行
- 投票、占い、人狼の行動
- 勝敗判定、ログ出力（予定）

## 開発者

名前：伊藤明莉（GitHub: [akari24320](https://github.com/akari24320)）
使用言語：TypeScript
想定用途：身内とのLINE上での遊び
---
このプロジェクトは開発中です。