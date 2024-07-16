import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Put,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ApiTags } from '@nestjs/swagger'
import { plainToInstance } from 'class-transformer'
import { Request, Response } from 'express'
import { getErrorMessage, getLang } from 'src/common/utils'
import { UserUpdateDto } from './dto'
import { UserEntity } from './entities'
import { UserService } from './user.service'

@ApiTags('users')
@Controller('api/users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('profile')
  async userProfile(@Req() req: Request, @Res() res: Response) {
    const cookies = req.cookies
    const accessToken = cookies['accessToken']
    const lang = getLang(req)

    if (!accessToken) {
      throw new UnauthorizedException({
        status: false,
        statusCode: HttpStatus.UNAUTHORIZED,
        ...getErrorMessage('NO_ACCESS_TOKEN', lang),
      })
    }

    try {
      const decoded = this.jwtService.verify(accessToken, { secret: process.env.JWT_SECRET })
      const user = await this.userService.getUser({ id: decoded.sub })
      if (!user) {
        throw new NotFoundException({
          status: false,
          statusCode: HttpStatus.NOT_FOUND,
          ...getErrorMessage('USER_NOT_FOUND', lang),
        })
      }
      const userEntity = plainToInstance(UserEntity, user)
      res.send({ status: true, data: userEntity })
    } catch (error) {
      console.log('Token Error:', error)
      res.send({ status: false, message: error })
    }
  }

  @Get('/')
  async users() {
    const users = await this.userService.getUsers({})
    const userEntities = users.map((user) => plainToInstance(UserEntity, user))

    return userEntities
  }

  @Get(':id')
  async user(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
    const lang = getLang(req)
    try {
      if (isNaN(+id)) {
        throw new NotFoundException({
          status: false,
          statusCode: HttpStatus.NOT_FOUND,
          ...getErrorMessage('USER_NOT_FOUND', lang),
        })
      }

      const user = await this.userService.getUser({ id: +id })
      if (!user) {
        throw new NotFoundException({
          status: false,
          statusCode: HttpStatus.NOT_FOUND,
          ...getErrorMessage('USER_NOT_FOUND', lang),
        })
      }
      const userEntity = plainToInstance(UserEntity, user)
      return res.send({ status: true, data: userEntity })
    } catch (error) {
      res.status(404).send(error)
    }
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() data: UserUpdateDto, @Req() req: Request, @Res() res: Response) {
    try {
      const lang = getLang(req)
      const updatedUser = await this.userService.updateUser(
        {
          where: { id: +id },
          data,
        },
        lang,
      )
      const userEntity = plainToInstance(UserEntity, updatedUser)
      return res.send({ status: true, data: userEntity })
    } catch (error) {
      console.log('USER PUT ERROR', error)
      res.status(429).send({ status: false, message: error })
    }
  }
}
