import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // ここに認証ロジックを実装
    // 例: JWTトークンの検証など
    // const request = context.switchToHttp().getRequest();
    // requestを使用して認証を実装
    return true; // 現在は常にtrueを返す（実装例）
  }
}
