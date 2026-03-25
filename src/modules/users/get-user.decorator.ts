import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user; // Dữ liệu này do AuthGuard('jwt') nạp vào

    // Truyền  id vào thì trả về id, không thì trả về cả object user
    return data ? user?.[data] : user;
  },
);