import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, Profile } from 'passport-yandex'

@Injectable()
export class YandexStrategy extends PassportStrategy(Strategy, 'yandex') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/auth/yandex/callback`,
      scope: ['email', 'profile'],
    })
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: Function): Promise<any> {
    const { username, emails, gender, photos, displayName } = profile
    const user = {
      username,
      displayName,
      email: emails[0].value,
      photos: photos[0].value,
      gender,
      accessToken,
    }
    done(null, user)
  }
}
