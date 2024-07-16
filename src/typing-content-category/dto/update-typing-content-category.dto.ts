import { ApiProperty } from '@nestjs/swagger'
import { Prisma } from '@prisma/client'

export class UpdateTypingContentCategoryDto implements Prisma.TypingContentCategoryUpdateInput {
  @ApiProperty()
  title?: string
}
