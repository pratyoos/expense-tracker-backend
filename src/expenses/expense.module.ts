import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Expense, ExpenseSchema } from './expense.schema';
import { ExpensesService } from './expense.service';
import { ExpensesController } from './expense.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Expense.name, schema: ExpenseSchema }]),
  ],
  providers: [ExpensesService],
  controllers: [ExpensesController],
})
export class ExpensesModule {}