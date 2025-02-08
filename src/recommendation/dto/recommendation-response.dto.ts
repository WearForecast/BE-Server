import { ApiProperty } from "@nestjs/swagger";

export class RecommendationResponseDto {
  @ApiProperty({
    description: "Recommendation images",
    type: [String],
  })
  images: string[];

  @ApiProperty({
    description: "Recommendation summary",
    type: String,
  })
  recommendation_summary: string;
}