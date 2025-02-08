import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
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
  async getRecommendation(@Request() req): Promise<RecommendationResponseDto> {
    const { user } = req;

    return await this.recommendationService.getRecommendation(user);
  }
}
