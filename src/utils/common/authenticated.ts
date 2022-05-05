import { applyDecorators, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

export const Authenticated = () => {
  return applyDecorators(UseGuards(AuthGuard('jwt-at')));
};
