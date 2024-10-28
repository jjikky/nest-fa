import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  signup() {}

  login() {}

  me() {}

  @Get()
  async getUsers() {
    try {
      return await this.userService.getUser();
    } catch (error) {
      console.log(error);
    }
  }
}
