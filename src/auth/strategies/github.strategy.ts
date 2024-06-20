import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, Profile } from 'passport-github2'
import { UserEntity } from 'src/user/entities'

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_API_URL}/auth/github/callback`,
      scope: ['user:email'],
    })
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: any): Promise<any> {
    const { username, emails, photos, displayName } = profile

    const user: Partial<UserEntity> = {
      username,
      fullName: displayName,
      email: emails[0].value,
      photo: photos[0].value,
      accessToken,
    }
    done(null, user)
  }
}
