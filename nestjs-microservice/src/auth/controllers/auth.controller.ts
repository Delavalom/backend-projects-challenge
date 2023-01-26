import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';

// import { LocalGuard } from '../local.guard';
import { AuthService } from '../services/auth.service';
import { UserSchema } from 'src/users/entities/user.entity';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerUser(@Body() user: UserSchema) {
    return this.authService.registerUser(user);
  }

  // @UseGuards(LocalGuard)
  @Post('login')
  loginUser(@Req() req: Request, @Body() user: UserSchema) {
    return req.session;
  }
}
