# Expense Tracker APIs (NestJS)

A secure and scalable expense tracking backend built using **NestJS**, **MongoDB (Atlas)**, and **JWT Authentication**. It is deployed on **Vercel Serverless Functions**.

> **Base URL**: [Expense Tracker API](https://expense-tracker-backend-project.vercel.app)

---

## Features

- User Registration & Login
- JWT Auth with Passport
- Create, Read, Update, Delete (CRUD) expenses
- MongoDB Atlas integration
- Serverless ready (deployed on Vercel)

---
## Source Code

```
git clone https://github.com/pratyoos/expense-tracker-backend
cd expense-tracker-backend
```

---
## Environment Variables

Create a `.env` file in the root:

```env
PORT=3030
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
```

---

## Running Locally

```bash
pnpm install
pnpm run dev
```

API will be available at `http://localhost:3030`

---

## API Endpoints

### User Routes

Base path: `/user`

#### POST `/user/register`

Register a new user

**Request Body:**

```json
{
  "name": "Example User",
  "email": "exampleuser@example.com",
  "password": "examplepassword"
}
```

**Response:**

```json
{
  "message": "User registered successfully",
  "userId": "<user_id>"
}
```

---

#### POST `/user/login`

Login and receive JWT token

**Request Body:**

```json
{
  "email": "exampleuser@example.com",
  "password": "examplepassword"
}
```

**Response:**

```json
{
  "access_token": "<jwt_token>"
}
```

---

#### GET `/user/me`

Get logged-in user details (Protected)

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response:**

```json
{
  "id": "<user_id>",
  "name": "Example User",
  "email": "exampleuser@example.com",
}
```

---

### Expense Routes

Base path: `/expenses` (All routes protected)

#### POST `/expenses`

Create an expense

**Headers:**

```
Authorization: Bearer <access_token>
```

**Request Body:**

```json
{
  "title": "Groceries",
  "amount": 500,
  "category": "Food",
}
```

**Response:**

```json
{
  "_id": "<expense_id>",
  "user": "<user_id>",
  "title": "Groceries",
  "amount": 500,
  "category": "Food",
  "date": "2025-07-25T00:00:00.000Z"
}
```

---

#### GET `/expenses`

Fetch all expenses of the logged-in user

**Headers:**

```
Authorization: Bearer <access_token>
```

---

#### GET `/expenses/:id`

Fetch a specific expense by ID

**Headers:**

```
Authorization: Bearer <access_token>
```

---

#### PATCH `/expenses/:id`

Update an expense

**Headers:**

```
Authorization: Bearer <access_token>
```

**Request Body:** (any field to update)

```json
{
  "amount": 550
}
```

---

#### DELETE `/expenses/:id`

Delete an expense

**Headers:**

```
Authorization: Bearer <access_token>
```

---

## API Testing (Postman / Thunder Client)

1. Register → `/user/register`
2. Login → copy `access_token`
3. Add `Authorization: Bearer <access_token>` to all subsequent requests
4. Test `/expenses` endpoints

---

## Deployment

- Backend is deployed on **Vercel** using `@vendia/serverless-express`
- Base URL: [Expense Tracker API](https://expense-tracker-backend-project.vercel.app)

---

## Tech Stack

- NestJS
- MongoDB Atlas
- Mongoose
- Passport JWT
- Vercel Serverless

---

## Author

Made with ❤️ by [Pratyoos](https://github.com/pratyoos)

---
