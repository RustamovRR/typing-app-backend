import { ApiProperty } from '@nestjs/swagger'
import { Difficulty, Prisma } from '@prisma/client'
import { IsBoolean, IsEnum, IsInt, IsOptional, IsString } from 'class-validator'

export class UpdateTypingContentDto implements Prisma.TypingContentUpdateInput {
  @IsString()
  @ApiProperty()
  title: string

  @IsInt()
  @ApiProperty()
  duration?: number

  @IsEnum(Difficulty)
  @ApiProperty()
  difficulty?: Difficulty = 'EASY'

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isActive?: boolean = true
}
