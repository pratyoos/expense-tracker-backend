import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ExpensesService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
    email: string;
  };
}

@Controller('expenses')
@UseGuards(JwtAuthGuard)
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  create(@Req() req: AuthenticatedRequest, @Body() dto: CreateExpenseDto) {
    return this.expensesService.create(req.user.userId, dto);
  }

  @Get()
  findAll(@Req() req: AuthenticatedRequest) {
    return this.expensesService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.expensesService.findOne(req.user.userId, id);
  }

  @Patch(':id')
  update(@Req() req: AuthenticatedRequest, @Param('id') id: string, @Body() dto: Partial<CreateExpenseDto>) {
    return this.expensesService.update(req.user.userId, id, dto);
  }

  @Delete(':id')
  delete(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.expensesService.delete(req.user.userId, id);
  }
}