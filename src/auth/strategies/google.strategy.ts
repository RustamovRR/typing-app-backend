import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { User } from '@prisma/client'
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20'
import { UserReturnDto } from 'src/dto'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_API_URL}/auth/google/callback`,
      scope: ['email', 'profile'],
    })
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<User | void> {
    const { username, photos, displayName, emails } = profile

    const user: Partial<UserReturnDto> = {
      username,
      fullName: displayName,
      email: emails[0].value,
      photo: photos[0].value,
      accessToken,
    }
    done(null, user)
  }
}
