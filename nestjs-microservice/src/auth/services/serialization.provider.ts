import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { UserSchema } from '../../users/entities/user.entity';

@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor(private readonly authService: AuthService) {
    super();
  }
  serializeUser(user: UserSchema, done: (err: Error | null, user: Pick<UserSchema, "id" | "role">) => void) {
    done(null, { id: user.id, role: user.role });
  }

  deserializeUser(payload: Pick<UserSchema, "id" | "role">, done: (err: Error | null, user: Omit<UserSchema, 'password'>) => void) {
    const user = this.authService.findById(payload.id);
    done(null, user);
  }
}