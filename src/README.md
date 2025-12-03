# Nest.js プロジェクトのフォルダ構成ガイド

## 推奨フォルダ構成

```
src/
├── main.ts                    # アプリケーションのエントリーポイント
├── app.module.ts              # ルートモジュール
├── app.controller.ts          # ルートコントローラー（オプション）
├── app.service.ts             # ルートサービス（オプション）
│
├── users/                     # 機能モジュール（例：ユーザー管理）
│   ├── users.module.ts        # モジュール定義
│   ├── users.controller.ts    # コントローラー
│   ├── users.service.ts       # サービス（ビジネスロジック）
│   ├── dto/                   # Data Transfer Objects
│   │   ├── create-user.dto.ts
│   │   └── update-user.dto.ts
│   ├── entities/              # データベースエンティティ（使用する場合）
│   │   └── user.entity.ts
│   └── users.controller.spec.ts  # テストファイル
│
├── products/                  # 別の機能モジュール（例：商品管理）
│   ├── products.module.ts
│   ├── products.controller.ts
│   ├── products.service.ts
│   └── dto/
│
├── common/                    # 共通機能
│   ├── guards/                # ガード（認証・認可）
│   │   └── auth.guard.ts
│   ├── interceptors/          # インターセプター
│   │   └── logging.interceptor.ts
│   ├── pipes/                 # パイプ（バリデーション・変換）
│   │   └── validation.pipe.ts
│   ├── filters/               # 例外フィルター
│   │   └── http-exception.filter.ts
│   ├── decorators/            # カスタムデコレータ
│   │   └── roles.decorator.ts
│   └── interfaces/            # インターフェース
│
├── config/                    # 設定ファイル
│   ├── database.config.ts
│   └── app.config.ts
│
└── database/                  # データベース関連（使用する場合）
    ├── database.module.ts
    └── migrations/
```

## 構成の原則

### 1. **機能ごとにモジュールを分ける**

- 各機能（users, products, ordersなど）を独立したモジュールとして作成
- モジュール内にcontroller, service, dtoなどを含める
- 関連するファイルを同じフォルダに配置することで、保守性が向上

### 2. **DTO（Data Transfer Object）の使用**

- リクエスト/レスポンスのデータ構造を定義
- バリデーションや型安全性を確保
- `dto/`フォルダに配置

### 3. **共通機能の分離**

- 複数のモジュールで使用する機能は`common/`に配置
- Guards, Interceptors, Pipes, Filtersなど

### 4. **設定の管理**

- 環境変数や設定値は`config/`フォルダで管理
- 環境ごとの設定ファイルを分けることも可能

## モジュールの作成例

新しい機能モジュールを作成する場合：

```bash
# Nest CLIを使用（推奨）
nest generate module users
nest generate controller users
nest generate service users

# または手動で作成
```

## インポートの例

```typescript
// app.module.ts
@Module({
  imports: [
    UsersModule, // ユーザーモジュール
    ProductsModule, // 商品モジュール
    // ...
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

## エンドポイントの例

この構成により、以下のようなエンドポイントが自動的に整理されます：

- `GET /users` → UsersController
- `GET /users/:id` → UsersController
- `POST /users` → UsersController
- `GET /products` → ProductsController
- `POST /products` → ProductsController

各コントローラーで`@Controller('users')`のようにプレフィックスを指定することで、自動的にルーティングが設定されます。

以上
