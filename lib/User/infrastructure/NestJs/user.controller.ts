import { Controller, Get, Inject } from '@nestjs/common';
import { UserGetAll } from '../../application/UserGetAll/UserGetAll';

@Controller('user')
export class UserController {
  constructor(@Inject('UserGetAll') private readonly userGetAll: UserGetAll) {}

  @Get()
  async getAll() {
    return this.userGetAll.run();
  }
}
