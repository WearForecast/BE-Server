import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RecommendationResponseDto } from './dto/recommendation-response.dto';

@Controller('recommendation')
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @Get()
  @ApiOperation({ summary: '옷 추천 정보 가져오기' })
  @ApiOkResponse({ type: RecommendationResponseDto })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @ApiQuery({ name: 'forceNew', required: false, description: 'Set to "true" to bypass cache' })
  async getRecommendation(@Req() req, @Query('forceNew') forceNew?: string,): Promise<RecommendationResponseDto> {
    const force = forceNew === 'true';

    const { user } = req;

    return await this.recommendationService.getRecommendation(user, force);
  }
}
