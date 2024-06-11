import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { CreateUserDto, UserAuthDto, UserReturnDto } from 'src/dto'
import { AuthGuard } from '@nestjs/passport'
import { Request, Response } from 'express'
import { COOKIE_EXPIRY_DATE } from 'src/constants'
import { AuthProvidersType } from 'src/types'

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  private getLang(req: Request): 'en' | 'uz' {
    return req.headers['accept-language'] === 'en' ? 'en' : 'uz'
  }

  private async handleOAuthRedirect(req: Request, res: Response, provider: AuthProvidersType) {
    const lang = this.getLang(req)
    const profile = req.user as CreateUserDto
    try {
      if (!profile) {
        console.warn(`${provider} callback did not provide user data.`)
        return res.status(HttpStatus.BAD_REQUEST).json({
          status: false,
          message: `Email is required but was not provided by ${provider}.`,
        })
      }
      const { accessToken, ...result } = await this.authService.validateOauthLogin(profile, provider, lang)
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
  async login(@Body() loginDto: UserAuthDto, @Req() req: Request, @Res() res: Response) {
    const lang = this.getLang(req)
    const { accessToken } = await this.authService.login(loginDto, lang)
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: COOKIE_EXPIRY_DATE,
    })
    return res.status(HttpStatus.OK).json({ status: true, message: 'Login successful' })
  }

  @Post('register')
  async register(@Body() registerDto: UserAuthDto, @Req() req: Request, @Res() res: Response) {
    const lang = this.getLang(req)
    const { accessToken, ...result } = await this.authService.register(registerDto, lang)
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
  async googleAuth(@Req() req) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    return this.handleOAuthRedirect(req, res, 'google')
    // res.send({ message: 'User infromation from Github', user: req.user })
  }

  /// GITHUB AUTH
  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubAuth(@Req() req) {}

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubAuthRedirect(@Req() req, @Res() res: Response) {
    this.handleOAuthRedirect(req, res, 'github')
    // res.send({ message: 'User infromation from Github', user: req.user })
  }
}
