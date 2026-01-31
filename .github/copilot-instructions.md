# Credit Card Application - AI Coding Instructions

## Project Overview
Credit card application system using MERN stack (MongoDB, Express, React, Node.js) with TypeScript. Early-stage project - backend API functional, frontend still Vite starter template.

## Architecture
```
credit-card-apply/
├── backend/                    # Express.js API (TypeScript)
│   └── src/
│       ├── server.ts           # Entry point, all routes, MongoDB connection
│       └── models/             # Mongoose schemas + TypeScript interfaces
│           ├── index.ts        # Barrel export (import models from here)
│           ├── User.ts         # User with embedded address subdocument
│           └── Application.ts  # Application history (one-to-many per user)
├── frontend/credit-card-apply/ # React 19 + Vite (nested directory!)
│   └── src/App.tsx             # Currently Vite starter - needs implementation
```

## Developer Workflow
```bash
# Backend (from project root)
cd backend && npm run dev       # tsx watch mode on :3000

# Frontend (note nested path!)
cd frontend/credit-card-apply && npm run dev   # Vite on :5173
```

## API Response Pattern
All endpoints return consistent JSON structure - follow this when adding routes:
```typescript
// Success: { success: true, data: <result> }
// Error:   { success: false, error: <message> }
res.status(201).json({ success: true, data: user });
res.status(400).json({ success: false, error: message });
```

## Current API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/users` | Create user |
| GET | `/api/users` | List all users |
| GET | `/api/users/:id` | Get user by ID |
| POST | `/api/applications` | Create application (requires `userId` in body) |
| GET | `/api/applications` | List all applications (populates user) |
| GET | `/api/applications/user/:userId` | Get applications for specific user |

## Mongoose Model Patterns
```typescript
// 1. Always export interface + model together
export interface IModelName extends Document {
  _id: Types.ObjectId;  // Required for TypeScript refs
  // fields...
  createdAt: Date;      // From timestamps: true
  updatedAt: Date;
}

// 2. Embedded subdocuments use { _id: false }
const addressSchema = new Schema({...}, { _id: false });

// 3. Add new models to models/index.ts barrel export
export { NewModel, INewModel } from './NewModel';
```

## Adding New Features

**New API route**: Add directly in `server.ts` (no separate routes directory yet)
**New model**: Create in `backend/src/models/`, export from `index.ts`, import in `server.ts`
**Frontend components**: `frontend/credit-card-apply/src/` - structure not yet established

## Environment Variables
- **Backend**: `backend/.env` → `MONGODB_URI`, `PORT` (defaults: localhost:27017, 3000)
- **Frontend**: `frontend/credit-card-apply/.env` → use `VITE_` prefix

## Security Requirements
- `User.ssn` and `User.passwordHash` must NEVER be stored in plaintext
- Never log PII (SSN, passwords) even in development
