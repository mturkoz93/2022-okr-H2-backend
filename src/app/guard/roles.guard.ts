import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../common/enums/role.enum';
import { ROLES_KEY } from '../decorator/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('roles GUARD')

    const userMock = {
      name: 'Mustafa',
      roles: ['standard-user']
    }

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log('requiredRoles', requiredRoles)

    // Bu endpointe hiçbir role tanımlanmadıysa yani public ise kullanıcı yoluna devam etsin.
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    console.log('request', request)
    const { user } = request
    return requiredRoles.some((role) => user.roles?.includes(role));

  }
}
