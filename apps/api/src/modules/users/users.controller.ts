import { Controller, Get, Patch, Post, Delete, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private users: UsersService) {}

  @Get('me') getMe(@CurrentUser() user: any) { return this.users.findById(user.id); }

  @Patch('me') updateMe(@CurrentUser() user: any, @Body() body: any) { return this.users.updateProfile(user.id, body); }

  @Post('me/change-password') changePassword(@CurrentUser() user: any, @Body() body: any) {
    return this.users.changePassword(user.id, body.currentPassword, body.newPassword);
  }

  @Get('me/addresses') getAddresses(@CurrentUser() user: any) { return this.users.getAddresses(user.id); }

  @Post('me/addresses') upsertAddress(@CurrentUser() user: any, @Body() body: any) { return this.users.upsertAddress(user.id, body); }

  @Delete('me/addresses/:id') deleteAddress(@CurrentUser() user: any, @Param('id') id: string) { return this.users.deleteAddress(id, user.id); }
}
