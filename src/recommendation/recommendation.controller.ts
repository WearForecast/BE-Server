import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RecommendationResponseDto } from './dto/recommendation-response.dto';

@Controller('recommendation')
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @Get()
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  async getRecommendation(@Request() req): Promise<RecommendationResponseDto> {
    const { user } = req;

    return await this.recommendationService.getRecommendation(user);
  }
}
