import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { OAuthProvider } from '@prisma/client';

import { AuthResponseDto } from '../auth/dto';

import { GenerateLinkDto, LoginDto } from './dto';
import { OAuthService } from './oauth.service';

@Controller('oauth')
@ApiTags('oauth')
export class OAuthController {
  constructor(private readonly oauthService: OAuthService) {}

  @Get('google')
  @ApiOkResponse({
    type: GenerateLinkDto,
  })
  async getAuthorizationGoogleUrl(): Promise<GenerateLinkDto> {
    const url = await this.oauthService.getAuthorizationUrl(OAuthProvider.GOOGLE);

    return { url };
  }

  @Post('google/login')
  @ApiOkResponse({
    type: AuthResponseDto,
  })
  async googleLogin(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.oauthService.oauthLogin(OAuthProvider.GOOGLE, loginDto);
  }
}
