import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './schemas/user.schema';
import { UserDC } from './user.decorator';
import { AccessTokenGuard } from '../common/guards/accessToken.guard';
import { UsersService } from './users.service';
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UsersService) {}
  @ApiOperation({ summary: 'Signup user' })
  @ApiResponse({ status: 200, type: User })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiSecurity('token')
  @UseGuards(AccessTokenGuard)
  @Get('/profile')
  async profile(@UserDC() user: User) {
    const currentUser = await this.userService.findByUsername(user.email);
    delete currentUser.password;
    delete currentUser.refreshToken;
    return currentUser;
  }
}
