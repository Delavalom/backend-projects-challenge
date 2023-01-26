import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { userSchema, UserSchema } from 'src/users/entities/user.entity';


@Injectable()
export class AuthService {
  private users = inMemoryUsers

  async validateUser(user: Pick<UserSchema, "email" | "password">) {
    const foundUser = this.users.find(u => u.email === user.email);
    if (!foundUser) throw new UnauthorizedException()
    if (!user || !(await compare(user.password, foundUser?.password as string))) {
      throw new UnauthorizedException('Incorrect username or password');
    }
    const { password, ...retUser } = foundUser;
    return retUser;
  }

  async registerUser(user: any): Promise<Omit<UserSchema, 'password'>> {
    const existingUser = this.users.find(u => u.email === user.email);
    if (existingUser) {
      throw new BadRequestException('User remail must be unique');
    }
    if (user.password !== user.confirmationPassword) {
      throw new BadRequestException('Password and Confirmation Password must match');
    }
    const { confirmationPassword: _, ...newUser } = user;
    this.users.push({
      ...newUser,
      password: await hash(user.password, 12),
      id: this.users.length + 1,
    });
    return {
      id: this.users.length,
      username: user.username,
      email: user.email,
      role: user.role,
    };
  }

  findById(id: UserSchema["id"]): Omit<UserSchema, 'password'> {
    const foundUser: UserSchema | undefined = this.users.find(u => u.id === id);
    if (!foundUser) throw new UnauthorizedException()
    const { password, ...user } = foundUser
    if (!user) {
      throw new BadRequestException(`No user found with id ${id}`);
    }
    return user;
  }
}

const inMemoryUsers: UserSchema[] = [
  {
    id: 1,
    username: 'Joe',
    email: 'joefoo@test.com',
    // Passw0rd!
    password: '$2b$12$s50omJrK/N3yCM6ynZYmNeen9WERDIVTncywePc75.Ul8.9PUk0LK',
    role: 'admin',
  },
  {
    id: 2,
    username: 'Jen',
    email: 'jenbar@test.com',
    // P4ssword!
    password: '$2b$12$FHUV7sHexgNoBbP8HsD4Su/CeiWbuX/JCo8l2nlY1yCo2LcR3SjmC',
    role: 'user',
  },
];