import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateTypingContentCategoryDto {
  @IsNotEmpty()
  @ApiProperty()
  title: string
}
