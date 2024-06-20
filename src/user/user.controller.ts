import { Body, Controller, Get, HttpStatus, NotFoundException, Param, Put, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'
import { UserService } from './user.service'
import { JwtService } from '@nestjs/jwt'
import { ApiTags } from '@nestjs/swagger'
import { User } from '@prisma/client'
import { getErrorMessage, getLang } from 'src/common/utils'
import { LanguageType } from 'src/common/types'
import { UserEntity } from './entities'

@ApiTags('user')
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
      const user = await this.userService.getUser({ id: decoded.sub })
      if (!user) {
        return res.status(HttpStatus.NOT_FOUND).send({ status: false, message: 'User not found' })
      }
      res.send({ status: true, data: user as UserEntity })
    } catch (error) {
      console.log('Token Error:', error)
      res.status(HttpStatus.FORBIDDEN).send({ status: false, message: 'Invalid or expired token' })
    }
  }

  @Get(':id')
  async user(@Param('id') id: number, @Res() res: Response, lang: LanguageType) {
    try {
      console.log('id', id)
      const user = await this.userService.getUser({ id: Number(id) })
      console.log('user', user)
      if (!user) {
        throw new NotFoundException({
          status: false,
          statusCode: HttpStatus.NOT_FOUND,
          ...getErrorMessage('USER_NOT_FOUND', lang),
        })
      }
      return res.send({ status: true, data: user })
    } catch (error) {
      res.status(404).send(error)
    }
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() data: User, @Req() req: Request, @Res() res: Response) {
    try {
      const lang = getLang(req)
      return this.userService.updateUser(
        {
          where: { id },
          data,
        },
        lang,
      )
    } catch (error) {
      console.log('USER PUT ERROR', error)
      res.status(429).send({ status: false, message: error })
    }
  }
}
