import {
  Controller,
  Post,
  Body,
  BadRequestException,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: { userId: string; email: string };
}

@Controller('user')
export class UserController {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const existingUser = await this.userService.findUserByEmail(createUserDto.email);
    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }
    const user = await this.userService.createUser(
      createUserDto.name,
      createUserDto.email,
      createUserDto.password,
    );

    return { message: 'User registered successfully', userId: user._id };
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.userService.validateUser(loginUserDto.email, loginUserDto.password);

    const payload = { email: user.email, sub: user._id };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getMe(@Req() req: AuthenticatedRequest) {
    const user = await this.userService.findUserById(req.user.userId);
    return { id: user._id, name: user.name, email: user.email };
  }
}
