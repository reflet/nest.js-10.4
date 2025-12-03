.DEFAULT_GOAL := configure

.PHONY: configure
configure:
	@echo ""
	@echo '`make build` でdockerイメージをビルドします。'
	@echo '`make up` でdockerコンテナを起動します。'
	@echo '`make down` でdockerコンテナを終了します。'
	@echo '`make help` でMakeタスクの一覧を表示します。'

.PHONY: build
build: ## dockerイメージをビルドします。
	@docker compose build --pull app

.PHONY: up
up: ## dockerコンテナを起動します。
	@docker compose up -d --wait

.PHONY: ps
ps: ## dockerコンテナの状態を表示します。
	@docker compose ps -a

.PHONY: version
version: ## NestJSのバージョンを表示します。
	@docker compose exec app bash -c "nest -v"

.PHONY: test
test: ## ブラウザで動作確認します。
	@open http://localhost:3000

.PHONY: test-unit
test-unit: ## 単体テストを実行します。
	@docker compose exec app bash -c "npm run test"

.PHONY: test-e2e
test-e2e: ## E2Eテストを実行します。
	@docker compose exec app bash -c "npm run test:e2e"

.PHONY: test-coverage
test-coverage: ## カバレッジを実行します。
	@docker compose exec app bash -c "npm run test:cov"


.PHONY: down
down: ## dockerコンテナを終了します。
	@docker compose down --remove-orphans

.PHONY: destroy
destroy: ## dockerコンテナとボリュームを破棄します。
	@docker compose down -v --remove-orphans

.PHONY: prune
prune: ## dockerイメージやボリュームを掃除する。
	@docker system prune
	@docker volume prune

.PHONY: help
help:
	@echo "Usage:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-24s\033[0m %s\n", $$1, $$2}'
	@echo ""
	@echo "ここに表示していないMakeタスクは、Makefileを参照してください。"
