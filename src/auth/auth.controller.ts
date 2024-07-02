import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { AuthGuard } from '@nestjs/passport'
import { Request, Response } from 'express'
import { COOKIE_EXPIRY_DATE } from 'src/common/constants'
import { AuthProvidersType } from 'src/common/types'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { getLang } from 'src/common/utils'
import { UserLoginDto, UserRegisterDto } from 'src/auth/dto'
import { AuthEntity } from './entities'

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  private async handleOAuthRedirect(req: Request, res: Response, provider: AuthProvidersType) {
    const lang = getLang(req)
    const profile = req.user as UserRegisterDto
    try {
      if (!profile) {
        console.warn(`${provider} callback did not provide user data.`)
        return res.status(HttpStatus.BAD_REQUEST).json({
          status: false,
          message: `Email is required but was not provided by ${provider}.`,
        })
      }
      const { accessToken } = await this.authService.validateOauthLogin(profile, provider, lang)
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: COOKIE_EXPIRY_DATE,
      })
      res.redirect(`${process.env.FRONT_BASE_URL}`)
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: 'Failed to process the login',
      })
    }
  }

  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  async login(@Body() loginDto: UserLoginDto, @Req() req: Request, @Res() res: Response) {
    const lang = getLang(req)
    const { accessToken } = await this.authService.login(loginDto, lang)
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: COOKIE_EXPIRY_DATE,
    })
    return res.status(HttpStatus.OK).json({ status: true, message: 'Login successful' })
  }

  @Post('register')
  async register(@Body() registerDto: UserRegisterDto, @Req() req: Request, @Res() res: Response) {
    const lang = getLang(req)
    const { accessToken, ...result } = await this.authService.register(registerDto, 'LOCAL', lang)
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: COOKIE_EXPIRY_DATE,
    })
    return res.status(HttpStatus.CREATED).json({ status: true, ...result })
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user
  }

  /// GOOGLE AUTH
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() _req) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    return this.handleOAuthRedirect(req, res, 'GOOGLE')
    // res.send({ message: 'User infromation from Github', user: req.user })
  }

  /// GITHUB AUTH
  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubAuth(@Req() _req) {}

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubAuthRedirect(@Req() req, @Res() res: Response) {
    this.handleOAuthRedirect(req, res, 'GITHUB')
    // res.send({ message: 'User infromation from Github', user: req.user })
  }
}
