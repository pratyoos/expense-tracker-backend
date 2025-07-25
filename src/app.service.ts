import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
  return `
    <div style="font-family: sans-serif; line-height: 1.6; padding: 2rem;">
      <h1> Welcome to the <span style="color: #4f46e5;">Expense Tracker API</span></h1>
      <p>This is a secure backend service built with <strong>NestJS</strong> and <strong>MongoDB</strong> to help you manage your personal expenses efficiently.</p>
      <p>
        <strong>Documentation</strong>: 
        <a href="https://github.com/pratyoos/expense-tracker-backend" target="_blank">
          GitHub Repo
        </a><br />
        <strong>Base URL</strong>: 
        <a href="https://expense-tracker-backend-project.vercel.app" target="_blank">
          expense-tracker-backend.vercel.app
        </a>
      </p>
      <h2>Getting Started</h2>
      <ol>
        <li>Register → <code>/user/register</code></li>
        <li>Login → <code>/user/login</code></li>
        <li>Manage expenses → <code>/expenses</code></li>
      </ol>
      <p>Made with ❤️ by <a href="https://github.com/pratyoos" target="_blank">Pratyoos</a></p>
    </div>
  `;
}

  getProtectedHello(): string {
    return 'This is a protected route!';
  }
}
