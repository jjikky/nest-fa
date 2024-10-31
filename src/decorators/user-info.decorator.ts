import { createParamDecorator } from '@nestjs/common';

export const UserInfo = createParamDecorator((data, ctx) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
