// auth.controller.ts
import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('company') company,
    @Body('uid') uid?: string,
  ) {
    console.log('IN LOGIN: ', username, password, company, uid);
    return await this.authService.login(username, password, company, uid);
  }

  @Public()
  @Post('/register')
  async register(
    @Body() createUserDto: Partial<User>,
    @Body('company') company,
  ) {
    return await this.authService.createUser(createUserDto, company);
  }

  @Public()
  @Post('/reset-password')
  async resetPassword(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('company') company,
  ) {
    const user = await this.authService.findUserByUsername(username, company);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const hashedPassword = this.authService.hashPassword(password);
    await this.usersService.updateUser(
      user.uid,
      { upass: hashedPassword },
      company,
    );

    return { message: 'Password reset successful' };
  }

  @Public()
  @Post('/refresh-token')
  async refreshToken(
    @Body('refreshToken') refreshToken: string,
    @Body('company') company,
  ) {
    return await this.authService.refreshToken(refreshToken, company);
  }
}
