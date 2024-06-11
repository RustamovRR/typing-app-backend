import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, Profile } from 'passport-facebook'

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/auth/facebook/callback`,
      scope: ['email', 'profile'],
    })
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: Function): Promise<any> {
    const { username, emails, gender, photos, displayName, birthday, name, profileUrl } = profile
    const user = {
      username,
      name,
      displayName,
      email: emails[0].value,
      photos: photos[0].value,
      profileUrl,
      gender,
      birthday,
      accessToken,
    }
    done(null, user)
  }
}
