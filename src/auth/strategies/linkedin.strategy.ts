import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, Profile } from 'passport-linkedin-oauth2'

@Injectable()
export class LinkedinStrategy extends PassportStrategy(Strategy, 'linkedin') {
  constructor() {
    const callbackURL = `${process.env.NGROK_URL}/auth/linkedin/callback`
    console.log('LinkedIn Callback URL:', callbackURL)
    super({
      clientID: process.env.LINKEDIN_KEY,
      clientSecret: process.env.LINKEDIN_SECRET,
      callbackURL: `${process.env.NGROK_URL}/auth/linkedin/callback`,
      scope: ['r_emailaddress', 'r_liteprofile'],
    })
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: Function): Promise<any> {
    const { username, emails, photos, name, displayName } = profile
    const user = {
      username,
      name,
      displayName,
      email: emails[0].value,
      photos: photos[0].value,
      accessToken,
    }
    done(null, user)
  }
}
