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
    const user = await this.userService.getUserByUsernameWithPassword(username);
    if (user && user.password) {
      const match = await compare(password, user.password);
      if (match) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: UserEntity) {
    const payload = { id: user.id, username: user.username, name: user.name };
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        secret: 'secret',
        expiresIn: '1h',
      }),
    };
  }
}
