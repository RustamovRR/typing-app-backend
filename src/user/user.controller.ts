import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'
import { UserService } from './user.service'
import { JwtService } from '@nestjs/jwt'

@Controller('api/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('profile')
  async userProfile(@Req() req: Request, @Res() res: Response) {
    const cookies = req.cookies
    const accessToken = cookies['accessToken']

    if (!accessToken) {
      return res.status(HttpStatus.UNAUTHORIZED).send({ status: false, message: 'No access token provided' })
    }

    try {
      const decoded = this.jwtService.verify(accessToken, { secret: process.env.JWT_SECRET })
      const { password, ...user } = await this.userService.findOneById(decoded.sub)
      if (!user) {
        return res.status(HttpStatus.NOT_FOUND).send({ status: false, message: 'User not found' })
      }
      res.send({ status: true, data: user })
    } catch (error) {
      console.log('Token Error:', error)
      res.status(HttpStatus.FORBIDDEN).send({ status: false, message: 'Invalid or expired token' })
    }
  }
}
