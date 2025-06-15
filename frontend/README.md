# Blood Bank Management System - Frontend

This is the frontend application for the Blood Bank Management System, built with React and modern web technologies.

## Features

- Modern, responsive user interface
- Real-time blood inventory tracking
- Donor management system
- Blood request processing
- Interactive dashboards
- User authentication and authorization
- Cross-browser compatibility

## Tech Stack

- React 18+
- TypeScript
- Material-UI
- Redux Toolkit
- React Router
- Axios
- Jest & React Testing Library
- ESLint & Prettier

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/blood-bank-system.git
cd blood-bank-system/frontend
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
npm start
# or
yarn start
```

## Project Structure

```
frontend/
├── public/              # Static files
├── src/
│   ├── components/      # Reusable components
│   ├── pages/          # Page components
│   ├── services/       # API services
│   ├── store/          # Redux store
│   ├── utils/          # Utility functions
│   ├── styles/         # Global styles
│   ├── types/          # TypeScript types
│   ├── hooks/          # Custom hooks
│   └── tests/          # Test files
├── .env.example        # Environment variables template
├── package.json        # Dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

## Available Scripts

- `npm start` - Start development server
- `npm test` - Run tests
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run type-check` - Check TypeScript types

## Development Guidelines

### Code Style

- Follow ESLint configuration
- Use Prettier for formatting
- Write meaningful component names
- Use functional components with hooks
- Include PropTypes or TypeScript types

### Component Structure

```typescript
import React from 'react';
import { useStyles } from './styles';

interface Props {
  // Component props
}

export const ComponentName: React.FC<Props> = ({ prop1, prop2 }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* Component content */}
    </div>
  );
};
```

### State Management

- Use Redux for global state
- Use React Context for theme/auth
- Use local state for component-specific state
- Use custom hooks for reusable logic

### Testing

- Write unit tests for components
- Test user interactions
- Mock API calls
- Test error handling

## API Integration

The frontend communicates with the backend through RESTful APIs. API calls are centralized in the `services` directory.

Example API service:
```typescript
import axios from 'axios';
import { API_BASE_URL } from '../config';

export const bloodInventoryService = {
  getInventory: async () => {
    const response = await axios.get(`${API_BASE_URL}/inventory`);
    return response.data;
  },
  // Other methods...
};
```

## Deployment

1. Build the application:
```bash
npm run build
```

2. Deploy the `build` directory to your hosting service.

## Contributing

Please read our [Contributing Guide](../CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details. 