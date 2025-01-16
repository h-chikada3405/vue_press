## 開発環境構築

node_modules のインストール
```bash
bun install
```

wp-env のインストール
```bash
bun run wp-env start
```

vue 環境構築
```bash
bun run dev
```

## コマンド一覧

| コマンド | 説明 |
| --- | --- |
| `npm run dev` | vue 環境構築 |
| `npm run wp-env start` | wp-env インストール |
| `npm run wp-env stop` | wp-env 停止 |
| `wp-env run cli wp config get table_prefix` | テーブルプレフィックス確認 |
| `wp-env run cli wp db export sql/db.sql` | データベースエクスポート |
| `wp-env run cli wp db import sql/db.sql` | データベースインポート |

※ データベースの操作を行うには、wp-envをグローバルインストールする必要があります
```bash
npm install -g @wordpress/env
```
