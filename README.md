# 概要
Nest.js環境をdockerで構築してみる。

## ミドルウェア
- node.js 22.12.0
- Nest.js 10.4.9

## プロジェクト作成
新規にNest.jsのプロジェクトを作成する場合の手順です。

```shell
# 既存ファイル削除
rm -rf ./src && mkdir ./src

# dockerイメージ作成
docker compose -f compose.create.yml build

# dockerコンテナ起動
docker compose -f compose.create.yml up -d
docker compose -f compose.create.yml ps -a

# バージョン確認
docker compose -f compose.create.yml exec app bash -c "nest -v"

# プロジェクト作成
docker compose -f compose.create.yml exec app bash -c "nest new --strict ."

# dockerコンテナ終了
docker compose -f compose.create.yml down
```

## 開発環境
ローカル環境にNest.jsを起動する場合の手順です。

```shell
# dockerイメージ作成
docker compose build

# dockerコンテナ起動
docker compose up -d
docker compose ps -a

# バージョン確認
docker compose exec app bash -c "nest -v"

# 動作確認
open http://localhost:3000

# dockerコンテナ終了
docker compose down -v
```

## 本番環境
本番環境のdockerイメージを作成して、ローカルで動かしてみる場合の手順です。

```shell
# dockerイメージ作成
docker compose -f compose.prod.yml build

# dockerコンテナ起動
docker compose -f compose.prod.yml up -d
docker compose -f compose.prod.yml ps -a

# バージョン確認
docker compose -f compose.prod.yml exec app bash -c "nest -v"

# dockerコンテナ終了
docker compose -f compose.prod.yml down
```

以上
