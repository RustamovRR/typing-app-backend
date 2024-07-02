import { Exclude } from 'class-transformer'
import { IsOptional } from 'class-validator'

export class AuthEntity {
  @Exclude()
  @IsOptional()
  accessToken: string
}
