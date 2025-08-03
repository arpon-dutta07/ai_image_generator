---
description: Repository Information Overview
alwaysApply: true
---

# Image Generator Information

## Summary
This is a React-based AI image generator application created with Create React App. The application provides a user interface where users can input text descriptions to generate AI-created images.

## Structure
- **public/**: Contains static assets and the HTML entry point
- **src/**: Contains the React application source code
  - **Components/**: Custom React components
    - **ImageGenerator/**: Main component for the image generation functionality
    - **assets/**: Static assets used by components
  - **App.js**: Main application component
  - **index.js**: Application entry point

## Language & Runtime
**Language**: JavaScript/React
**Version**: React 19.1.0
**Build System**: Create React App
**Package Manager**: npm

## Dependencies
**Main Dependencies**:
- react: ^19.1.0
- react-dom: ^19.1.0
- react-scripts: 5.0.1
- @emailjs/browser: ^4.4.1
- web-vitals: ^2.1.4

**Development Dependencies**:
- @testing-library/jest-dom: ^6.6.3
- @testing-library/react: ^16.3.0
- @testing-library/user-event: ^13.5.0
- @testing-library/dom: ^10.4.0

## Build & Installation
```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

**Available Scripts**:
- `npm start`: Runs the app in development mode on http://localhost:3000
- `npm run dev`: Alternative command for development mode (same as npm start)
- `npm test`: Launches the test runner in interactive watch mode
- `npm run build`: Builds the app for production to the build folder
- `npm run eject`: Ejects from Create React App configuration

## Testing
**Framework**: Jest with React Testing Library
**Test Location**: src/App.test.js
**Configuration**: Default Create React App test configuration
**Run Command**:
```bash
npm test
```

## Main Components
**ImageGenerator**: The primary component that provides the UI for generating images based on text descriptions. It includes:
- Text input field for entering image descriptions
- Generate button to trigger image creation
- Image display area to show the generated image