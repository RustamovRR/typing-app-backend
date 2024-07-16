import { ApiProperty } from '@nestjs/swagger'
import { Expose, Transform } from 'class-transformer'
import { TypingContentCategoryEntity } from '../../typing-content-category/entities/typing-content-category.entity'

export class TypingContentEntity {
  @Expose()
  @ApiProperty()
  id: number

  @Expose()
  @ApiProperty()
  title: string

  @Expose()
  @Transform(({ value }) => value.join(', '), { toClassOnly: true })
  content: string[]

  @Expose()
  @ApiProperty()
  createdAt: Date

  @Expose()
  @ApiProperty()
  duration: number

  @Expose()
  @ApiProperty()
  difficulty: string

  @Expose()
  @ApiProperty()
  isActive: boolean

  @Expose()
  @ApiProperty()
  updatedAt: Date

  @Expose()
  @ApiProperty()
  categoryId?: number

  @Expose()
  @ApiProperty()
  category?: TypingContentCategoryEntity
}
