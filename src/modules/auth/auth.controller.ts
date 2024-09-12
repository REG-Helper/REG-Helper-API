import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthResponseDto, GoogleLoginDto } from './dto';

@Controller('auth')
@ApiBearerAuth()
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  async generateGoogleLoginLink() {
    return this.authService.generateGoogleLoginLink();
  }

  @Post('google/login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: AuthResponseDto })
  async googleLogin(@Body() googleLoginDto: GoogleLoginDto): Promise<AuthResponseDto> {
    return this.authService.googleLogin(googleLoginDto);
  }
}
