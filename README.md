#
## 開発環境構築

node_modules のインストール
```bash
npm install
```

wordpress のインストール・起動
```bash
npm run wp-env start
```
- ユーザー名：admin
- パスワード：password

vue 環境構築
```bash
npm run dev
```

## コマンド一覧

| コマンド | 説明 |
| --- | --- |
| `npm run dev` | vue 環境構築 |
| `npm run wp-env start` | wordpress インストール |
| `npm run wp-env stop` | wordpress 停止 |
| `npx wp-env start --update` | .wp-env.json の変更を反映 |
| `wp-env run cli wp config get table_prefix` | テーブルプレフィックス確認 |
| `wp-env run cli wp db export sql/db.sql` | データベースエクスポート |
| `wp-env run cli wp db import sql/db.sql` | データベースインポート |

※ データベースの操作を行うには、wp-envをグローバルインストールする必要があります
```bash
npm install -g @wordpress/env
```

## ユーティリティ関数

| 関数名 | 引数 | 説明 |
| --- | --- | --- |
| `getSlug` | - | 現在表示しているページのスラッグを取得。 |
| `getId` | - | 現在表示しているページのIDを取得。 |
| `getTitle` | - | 現在表示しているページのタイトルを取得。 |
| `getPages`| `{ pageId: , slug:  }` | 固定ページをすべて取得。<br>`pageId` または `slug` を指定すると、指定したページを取得。 |
| `getPosts`| `{ postType: , perPage: , page: , orderby: , order:  }` | 投稿をすべて取得。 |
