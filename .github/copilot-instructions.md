# Credit Card Application - AI Coding Instructions

## Project Overview
A credit card application system built with the MERN stack (MongoDB, Express, React, Node.js) using TypeScript throughout.

## Architecture
```
credit-card-apply/
├── backend/           # Express.js + TypeScript API server
│   ├── src/
│   │   ├── controllers/   # Route handlers
│   │   ├── models/        # Mongoose schemas
│   │   ├── routes/        # Express route definitions
│   │   ├── middleware/    # Auth, validation, error handling
│   │   ├── services/      # Business logic
│   │   └── types/         # TypeScript interfaces
│   └── package.json
├── frontend/          # React + TypeScript SPA
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Route-level components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API client functions
│   │   └── types/         # Shared TypeScript types
│   └── package.json
```

## Getting Started

### Backend
```bash
cd backend
npm install
npm run dev      # Start dev server with hot reload
npm run build    # Compile TypeScript
npm start        # Run production build
```

### Frontend
```bash
cd frontend
npm install
npm run dev      # Vite dev server
npm run build    # Production build
```

## Code Conventions

### TypeScript
- Use strict mode (`"strict": true` in tsconfig)
- Prefer interfaces over types for object shapes
- Define API request/response types in `types/` directories
- Use `unknown` over `any`; narrow types explicitly

### Backend Patterns
- **Controllers** handle HTTP concerns only; delegate to services
- **Services** contain business logic; return typed results
- **Models** use Mongoose with TypeScript interfaces:
  ```typescript
  interface IApplication extends Document {
    applicantId: Types.ObjectId;
    status: 'pending' | 'approved' | 'rejected';
  }
  ```
- Use async/await with try-catch in controllers
- Validate requests with middleware (e.g., express-validator, zod)

### Frontend Patterns
- Functional components with hooks
- Use React Query or SWR for server state
- Keep API calls in `services/` directory
- Type all props with interfaces

### API Design
- RESTful routes: `/api/applications`, `/api/applications/:id`
- Return consistent response shapes:
  ```typescript
  { success: true, data: T } | { success: false, error: string }
  ```

## Environment Variables
- Backend: `.env` in `backend/` (never commit)
- Frontend: `.env` in `frontend/` (Vite uses `VITE_` prefix)
- Required: `MONGODB_URI`, `JWT_SECRET`, `VITE_API_URL`

## Security Considerations
- Sanitize all user input before MongoDB queries
- Hash sensitive data (SSN, etc.) before storage
- Use JWT for authentication with httpOnly cookies
- Implement rate limiting on application submission endpoints
- Never log PII in production
