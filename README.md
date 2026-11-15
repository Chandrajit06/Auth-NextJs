# Next.js Authentication App

A full-stack authentication system built with **Next.js**, **MongoDB**, and **JWT cookies**. It covers signup, login, logout, protected pages, and an email verification flow.

## Features

- User signup with password hashing (`bcryptjs`)
- Login that issues a signed **JWT** stored in an `httpOnly` cookie
- Logout that clears the cookie
- Route protection with Next.js **middleware** (redirects based on login state)
- Protected `/api/users/me` route that returns the logged-in user
- Dynamic profile page (`/profile/[id]`)
- Email verification flow using **Nodemailer** + **Mailtrap** (for development)
- Mongoose model with reusable connection helper

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js (App Router), React, TypeScript |
| Database | MongoDB with Mongoose |
| Auth | JSON Web Tokens (`jsonwebtoken`), `bcryptjs` |
| Email | Nodemailer + Mailtrap (sandbox SMTP) |
| HTTP client | Axios |
| Styling | Tailwind CSS |

## How Authentication Works

1. **Signup**: the password is hashed with bcrypt and the user is saved in MongoDB.
2. **Login**: the password is compared with the stored hash. If it matches, the server signs a JWT containing the user's `id`, `username` and `email`, and sets it in an `httpOnly` cookie named `token`.
3. **Every request**: the browser automatically sends the cookie. The middleware checks that it exists (to redirect between pages), and API routes verify the JWT signature using `TOKEN_SECRET`.
4. **Logout**: the server overwrites the cookie with an expired one.

> The middleware only checks that a cookie is present, so it is used for page redirects. The real security check is `jwt.verify` inside the API routes.

## Project Structure

```
src/
├── app/
│   ├── login/page.tsx            # Login form
│   ├── signup/page.tsx           # Signup form
│   ├── verifyemail/page.tsx      # Reads token from URL, calls verify API
│   ├── profile/
│   │   ├── page.tsx              # Profile page (logout, get user details)
│   │   └── [id]/page.tsx         # Dynamic profile page
│   └── api/users/
│       ├── signup/route.ts       # POST: create user
│       ├── login/route.ts        # POST: verify password, set JWT cookie
│       ├── logout/route.ts       # GET: clear cookie
│       ├── me/route.ts           # GET: current user from token
│       └── verifyemail/route.ts  # POST: verify email token
├── dbConfig/dbConfig.ts          # MongoDB connection helper
├── helpers/
│   ├── getDataFromToken.ts       # Reads + verifies JWT from the cookie
│   └── mailer.ts                 # Sends verify / reset emails
├── models/userModel.js           # Mongoose user schema
└── middleware.ts                 # Route guard
```

## API Endpoints

| Method | Endpoint | Description | Auth required |
|--------|----------|-------------|---------------|
| POST | `/api/users/signup` | Register a new user | No |
| POST | `/api/users/login` | Log in and receive the `token` cookie | No |
| GET | `/api/users/logout` | Clear the `token` cookie | No |
| GET | `/api/users/me` | Get the logged-in user's details | Yes |
| POST | `/api/users/verifyemail` | Verify an email with a token | No |

## Getting Started

### Prerequisites

- Node.js 18+
- A MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- A free [Mailtrap](https://mailtrap.io) account (for testing emails)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>

# 2. Install dependencies
npm install

# 3. Create your environment file
cp .env.example .env
```

### Environment Variables

Create a `.env` file in the project root:

```env
MONGO_URI=your_mongodb_connection_string
TOKEN_SECRET=a_long_random_secret_string
DOMAIN=http://localhost:3000

MAILTRAP_USER=your_mailtrap_username
MAILTRAP_PASSWORD=your_mailtrap_password
```
### Run the app

```bash
npm run dev
```
## License

This project is open source and available for further improvements.