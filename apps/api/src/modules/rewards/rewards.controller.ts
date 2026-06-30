import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RewardsService } from './rewards.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Rewards')
@Controller('rewards')
export class RewardsController {
  constructor(private rewards: RewardsService) {}

  @Get()
  getSummary(@CurrentUser() user: any) {
    return this.rewards.getSummary(user.id);
  }

  @Get('history')
  getHistory(@CurrentUser() user: any) {
    return this.rewards.getHistory(user.id);
  }
}
