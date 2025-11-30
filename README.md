# 概要

Nest.js 環境を docker で構築してみる。

## ミドルウェア

- node.js 22.12.0
- Nest.js 10.4.9

## 開発環境

ローカル環境に Nest.js を起動する場合の手順です。

```shell
# dockerイメージ作成
make build

# dockerコンテナ起動
make up
make ps

# NestJSのバージョンを確認する
make version

# ブラウザで動作確認する
make test

# dockerコンテナ終了
make down

# dockerコンテナとボリュームを破棄する
make destroy
```

## 本番環境

本番環境の docker イメージを作成して、ローカルで動かしてみる場合の手順です。

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

## プロジェクトの再構築

Nest.js のプロジェクトを新規に作り直す場合の手順です。

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

以上
