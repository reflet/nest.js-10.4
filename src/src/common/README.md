# Common フォルダの使い方

このフォルダには、アプリケーション全体で使用する共通機能が含まれています。

## フィルター（Filters）

### HttpExceptionFilter
HTTP例外をキャッチして、統一されたエラーレスポンスを返します。

**使用場所:**
- `main.ts`でグローバルに設定（全エンドポイントで有効）
- または、コントローラー/メソッド単位で`@UseFilters()`デコレータを使用

**使用例（コントローラーレベル）:**
```typescript
import { UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';

@Controller('users')
@UseFilters(HttpExceptionFilter)  // このコントローラーの全メソッドに適用
export class UsersController {
  // ...
}
```

**使用例（メソッドレベル）:**
```typescript
@Get(':id')
@UseFilters(HttpExceptionFilter)  // このメソッドのみに適用
findOne(@Param('id') id: string) {
  // ...
}
```

## インターセプター（Interceptors）

### LoggingInterceptor
すべてのHTTPリクエストとレスポンスをログに記録します。

**使用場所:**
- `main.ts`でグローバルに設定（全エンドポイントで有効）
- または、コントローラー/メソッド単位で`@UseInterceptors()`デコレータを使用

**使用例（コントローラーレベル）:**
```typescript
import { UseInterceptors } from '@nestjs/common';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';

@Controller('users')
@UseInterceptors(LoggingInterceptor)  // このコントローラーの全メソッドに適用
export class UsersController {
  // ...
}
```

**使用例（メソッドレベル）:**
```typescript
@Get(':id')
@UseInterceptors(LoggingInterceptor)  // このメソッドのみに適用
findOne(@Param('id') id: string) {
  // ...
}
```

## ガード（Guards）

### AuthGuard
認証・認可を制御します（現在は実装例のみ）。

**使用例:**
```typescript
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../common/guards/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)  // このコントローラーの全メソッドに認証が必要
export class UsersController {
  // ...
}
```

## モジュールレベルでの設定

`app.module.ts`でプロバイダーとして登録することもできます：

```typescript
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
```

この方法の利点は、依存性注入を使用できることです。

