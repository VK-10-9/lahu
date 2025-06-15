# Blood Bank Management System - Backend

This is the backend server for the Blood Bank Management System, built with Node.js and Express.

## Features

- RESTful API endpoints
- JWT authentication
- Database integration
- Input validation
- Error handling
- Logging system
- API documentation
- Rate limiting
- CORS support

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB/Mongoose
- JWT for authentication
- Jest for testing
- ESLint & Prettier
- Swagger for API documentation

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/blood-bank-system.git
cd blood-bank-system/backend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Start development server:
```bash
npm run dev
# or
yarn dev
```

## Project Structure

```
backend/
├── src/
│   ├── controllers/    # Request handlers
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   ├── middleware/    # Custom middleware
│   ├── services/      # Business logic
│   ├── utils/         # Utility functions
│   ├── config/        # Configuration files
│   ├── types/         # TypeScript types
│   └── tests/         # Test files
├── .env.example       # Environment variables template
├── package.json       # Dependencies and scripts
└── tsconfig.json      # TypeScript configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run build` - Build TypeScript
- `npm run docs` - Generate API documentation

## API Documentation

API documentation is available at `/api-docs` when the server is running. The documentation is generated using Swagger/OpenAPI.

## Development Guidelines

### Code Style

- Follow ESLint configuration
- Use async/await for asynchronous code
- Implement proper error handling
- Follow REST API best practices
- Document API endpoints

### Controller Structure

```typescript
import { Request, Response } from 'express';
import { BloodInventoryService } from '../services';

export class BloodInventoryController {
  public static async getInventory(req: Request, res: Response) {
    try {
      const inventory = await BloodInventoryService.getInventory();
      res.json(inventory);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
```

### Error Handling

Use the error handling middleware:

```typescript
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});
```

### Database Models

Example model structure:

```typescript
import mongoose from 'mongoose';

const bloodUnitSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  bloodGroup: { type: String, required: true },
  collectionDate: { type: Date, required: true },
  expiryDate: { type: Date, required: true },
  donorId: { type: String, required: true },
  isAvailable: { type: Boolean, default: true },
  location: { type: String, required: true },
  notes: String
});

export const BloodUnit = mongoose.model('BloodUnit', bloodUnitSchema);
```

## Testing

- Write unit tests for services
- Test API endpoints
- Mock database calls
- Test error scenarios

Example test:
```typescript
describe('BloodInventoryService', () => {
  it('should get inventory', async () => {
    const inventory = await BloodInventoryService.getInventory();
    expect(inventory).toBeDefined();
  });
});
```

## Security

- Use environment variables for sensitive data
- Implement rate limiting
- Use helmet for security headers
- Validate input data
- Sanitize user input
- Use HTTPS in production

## Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Contributing

Please read our [Contributing Guide](../CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details. # Blood Bank Management System
