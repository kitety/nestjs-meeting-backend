import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class PermissionGuard implements CanActivate {
  @Inject(Reflector)
  private reflector: Reflector;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      'require-permission',
      [context.getClass(), context.getHandler()],
    );
    // 没设置权限，可以访问
    if (!requiredPermissions) {
      return true;
    }
    // 设置了权限，必须登陆
    const request: Request = context.switchToHttp().getRequest();
    // 强制登陆了才会有user对象 @SetMetadata('require-login', true)
    if (!request.user) return false;
    const permissions = request.user.permissions;
    const hasPermission = requiredPermissions.every((permission) =>
      permissions.some((userPermission) => userPermission.code === permission),
    );

    if (!hasPermission) {
      throw new UnauthorizedException('您没有访问该接口的权限');
    }

    return true;
  }
}
