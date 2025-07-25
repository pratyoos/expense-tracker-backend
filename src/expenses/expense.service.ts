import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Expense, ExpenseDocument } from './expense.schema';
import { CreateExpenseDto } from './dto/create-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectModel(Expense.name) private expenseModel: Model<ExpenseDocument>,
  ) {}

  private toObjectId(id: string): Types.ObjectId {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid ObjectId: ${id}`);
    }
    return new Types.ObjectId(id);
  }

  async create(userId: string, expenseData: CreateExpenseDto): Promise<Expense> {
    const createdExpense = new this.expenseModel({
      ...expenseData,
      userId: this.toObjectId(userId),
    });
    return createdExpense.save();
  }

  async findAll(userId: string): Promise<Expense[]> {
    return this.expenseModel
      .find({ userId: this.toObjectId(userId) }) 
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(userId: string, id: string): Promise<Expense> {
    const expense = await this.expenseModel.findById(this.toObjectId(id)).exec(); 
    if (!expense) throw new NotFoundException(`Expense with ID ${id} not found`);
    if (expense.userId.toString() !== userId)
      throw new ForbiddenException('Unauthorized');
    return expense;
  }

  async update(
    userId: string,
    id: string,
    expenseData: Partial<CreateExpenseDto>,
  ): Promise<Expense> {
    const expense = await this.expenseModel.findById(this.toObjectId(id)).exec();
    if (!expense) throw new NotFoundException(`Expense with ID ${id} not found`);
    if (expense.userId.toString() !== userId)
      throw new ForbiddenException('Unauthorized');

    Object.assign(expense, expenseData);
    return expense.save();
  }

  async delete(userId: string, id: string): Promise<{ message: string }> {
    const expense = await this.expenseModel.findById(this.toObjectId(id)).exec();
    if (!expense) throw new NotFoundException(`Expense with ID ${id} not found`);
    if (expense.userId.toString() !== userId)
      throw new ForbiddenException('Unauthorized');

    await expense.deleteOne();
    return { message: 'Expense deleted successfully' };
  }
}
