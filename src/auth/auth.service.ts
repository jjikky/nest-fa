import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { compare } from 'bcrypt';
import { UserEntity } from 'src/modules/user/infrastructure/db/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.getUserByUsername(username);
    if (user) {
      const match = await compare(password, user.password);
      if (match) {
        return user;
      }
      return null;
    }
    return null;
  }

  async login(user: UserEntity) {
    const payload = { username: user.username, name: user.name };
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        secret: 'secret',
        expiresIn: '1h',
      }),
    };
  }
}
