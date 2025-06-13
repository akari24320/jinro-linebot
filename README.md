
# 最終形ディレクトリ構成（TypeScript対応）
jinro-linebot/
├── .env                          # LINE APIキーなど
├── .gitignore
├── package.json
├── tsconfig.json
├── README.md
│
├── src/
│   ├── index.ts                  # アプリエントリ（Express + Webhook + Ngrok）
│
│   ├── bot/                      # LINE SDKまわり
│   │   ├── lineClient.ts         # MessagingApiClientの初期化
│   │   ├── middleware.ts         # webhookのミドルウェア
│   │   ├── handlers/             # LINEイベントごとの処理
│   │   │   ├── messageHandler.ts # 全メッセージをここで処理
│   │   │   ├── joinHandler.ts    # @参加 など
│   │   │   └── phaseHandler.ts   # 昼・夜フェーズ切替など
│   │   ├── reply/                # メッセージテンプレート
│   │   │   ├── helpMessage.ts
│   │   │   ├── startMessage.ts
│   │   │   └── ...
│   │   └── utils/                # push, reply などの共通処理
│   │       ├── replyText.ts
│   │       ├── pushToUser.ts
│   │       └── getProfile.ts
│
│   ├── game/                     # ゲーム進行ロジック
│   │   ├── gameManager.ts        # ゲーム開始/終了、フェーズ進行制御
│   │   ├── roomManager.ts        # ルームごとの参加者・状態管理
│   │   ├── playerManager.ts      # プレイヤー情報の追加・役職付与など
│   │   ├── roleAssigner.ts       # 配役パターンに基づくランダム割り当て
│   │   ├── voteManager.ts        # 投票集計処理
│   │   ├── nightPhase.ts         # 夜の処理（襲撃・占い）
│   │   ├── dayPhase.ts           # 昼の処理（議論・追放）
│   │   └── winJudge.ts           # 勝敗判定
│
│   ├── config/                   # 役職・定数・設定
│   │   ├── roles.ts              # 各役職の情報・勝利条件・能力
│   │   ├── patterns.ts           # 配役パターン①〜⑨など
│   │   └── constants.ts          # フェーズ名などの固定文字列
│
│   ├── data/                     # 状態保存（開発中はin-memory、将来的にDB化）
│   │   └── rooms.ts              # ルーム情報をグループIDごとに保持
│
│   ├── types/                    # TypeScriptの型定義
│   │   ├── room.d.ts             # Room型（groupId, players, state...）
│   │   ├── player.d.ts           # Player型（userId, displayName, role...）
│   │   ├── role.d.ts             # Role型、役職の効果など
│   │   └── index.d.ts

# 拡張可能性（未来の想定）
拡張対象	対応方法
🔸 7人以上の配役	config/patterns.ts にデータ追加するだけ
🔸 GAS連携	gameManager.ts で結果をGAS経由で記録
🔸 データ永続化	data/rooms.ts を Firestore や JSON ファイルに置き換え
🔸 Web UI表示	別途 Next.js フロントと連携も可能
🔸 設定ファイルによるカスタムルール	.json or .yml に読み込み処理を追加