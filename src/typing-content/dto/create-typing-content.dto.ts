import { ApiProperty } from '@nestjs/swagger'
import { Difficulty, TypingContentCategory } from '@prisma/client'
import { IsArray, IsBoolean, IsEnum, IsInt, IsOptional, IsString } from 'class-validator'

export class CreateTypingContentDto {
  @IsString()
  @ApiProperty()
  title: string

  @IsArray()
  @IsString({ each: true })
  @ApiProperty()
  content: string[]

  @IsInt()
  @ApiProperty()
  duration: number

  @IsEnum(Difficulty)
  @ApiProperty()
  difficulty: Difficulty = 'EASY'

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isActive?: boolean = true

  @IsOptional()
  @IsInt()
  @ApiProperty()
  categoryId: TypingContentCategory
}
