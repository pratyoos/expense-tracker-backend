import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Expense Tracker API is running!';
  }

  getProtectedHello(): string {
    return 'This is a protected route!';
  }
}