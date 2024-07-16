import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { TypingContentEntity } from 'src/typing-content/entities/typing-content.entity'

export class TypingContentCategoryEntity {
  @Expose()
  @ApiProperty()
  id: number

  @Expose()
  @ApiProperty()
  title: string

  @Expose()
  @ApiProperty()
  createdAt: Date

  @Expose()
  @ApiProperty()
  updatedAt: Date

  @Expose()
  @ApiProperty()
  contents?: TypingContentEntity[]
}
