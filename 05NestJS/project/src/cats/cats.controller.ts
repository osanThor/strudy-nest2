import {
  Controller,
  Get,
  Body,
  Post,
  UseFilters,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptor/success.interceptor';
import { CatsRequestDto } from './dto/cats.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCatDto } from './dto/cat.dto';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '고양이 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentCat(@CurrentUser() cat: ReadOnlyCatDto) {
    return cat;
  }

  @ApiResponse({ status: 500, description: 'Server Error...' })
  @ApiResponse({ status: 200, description: '성공', type: ReadOnlyCatDto })
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signUp(@Body() body: CatsRequestDto) {
    return await this.catsService.signUp(body);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  login(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogin(data);
  }

  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  async logout() {
    return 'logout';
  }

  @ApiOperation({ summary: '업데이트' })
  @Post('upload/cats')
  async uploadCatImg() {
    return 'uplaod cat img';
  }
}
