# Contributing to Blood Bank Management System

Thank you for your interest in contributing to the Blood Bank Management System! This document provides guidelines and instructions for contributing to the project.

## Project Structure

The project is organized into three main components:

### 1. Frontend (`frontend/`)
- React-based web application
- Modern UI/UX design
- Responsive layout
- Key directories:
  - `src/` - Source code
  - `public/` - Static assets
  - `components/` - Reusable UI components
  - `pages/` - Page components
  - `services/` - API integration
  - `utils/` - Helper functions
  - `styles/` - CSS/SCSS files
  - `tests/` - Frontend tests

### 2. Backend (`backend/`)
- Node.js/Express server
- RESTful API implementation
- Database integration
- Key directories:
  - `src/` - Source code
  - `controllers/` - Request handlers
  - `models/` - Data models
  - `routes/` - API routes
  - `middleware/` - Custom middleware
  - `services/` - Business logic
  - `utils/` - Helper functions
  - `tests/` - Backend tests
  - `config/` - Configuration files

### 3. C++ Core (`cpp_core/`)
- Core business logic implementation
- High-performance components
- Key directories:
  - `include/` - Header files
  - `src/` - Implementation files
  - `tests/` - Unit tests
  - `build/` - Build artifacts

## Development Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- C++ compiler with C++17 support
- CMake (v3.10 or higher)
- Git

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### C++ Core Setup
```bash
cd cpp_core
mkdir build && cd build
cmake ..
cmake --build .
```

## Contribution Guidelines

### 1. Code Style

#### Frontend (JavaScript/TypeScript)
- Follow ESLint configuration
- Use Prettier for formatting
- Follow React best practices
- Write meaningful component names
- Use functional components with hooks
- Include PropTypes or TypeScript types

#### Backend (JavaScript/TypeScript)
- Follow ESLint configuration
- Use async/await for asynchronous code
- Implement proper error handling
- Follow REST API best practices
- Document API endpoints

#### C++ Core
- Follow Google C++ Style Guide
- Use meaningful variable and function names
- Include proper documentation
- Write unit tests for new features
- Handle exceptions appropriately

### 2. Git Workflow

1. Create a new branch:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes:
- Write clear commit messages
- Keep commits focused and atomic
- Reference issue numbers in commits

3. Push your changes:
```bash
git push origin feature/your-feature-name
```

4. Create a Pull Request:
- Fill out the PR template
- Link related issues
- Request reviews from maintainers

### 3. Testing

#### Frontend Tests
```bash
cd frontend
npm test
```

#### Backend Tests
```bash
cd backend
npm test
```

#### C++ Core Tests
```bash
cd cpp_core/build
ctest
```

### 4. Documentation

- Update README files when adding new features
- Document API changes
- Include code comments for complex logic
- Update installation instructions if needed

### 5. Pull Request Process

1. Ensure all tests pass
2. Update documentation
3. Follow the PR template
4. Get code review approval
5. Address review comments
6. Merge only after approval

## Issue Reporting

When reporting issues:
1. Use the issue template
2. Provide detailed steps to reproduce
3. Include relevant logs and screenshots
4. Specify your environment details

## Feature Requests

For feature requests:
1. Check existing issues first
2. Use the feature request template
3. Provide clear use cases
4. Explain potential implementation approach

## Code Review Process

1. All PRs require at least one review
2. Address review comments promptly
3. Keep the discussion focused
4. Be open to feedback

## Release Process

1. Version bump
2. Update changelog
3. Create release notes
4. Tag release
5. Deploy to production

## Community Guidelines

- Be respectful and professional
- Help others when possible
- Follow the code of conduct
- Give credit where due

## Getting Help

- Check the documentation
- Join our community chat
- Open an issue
- Contact maintainers

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License. 