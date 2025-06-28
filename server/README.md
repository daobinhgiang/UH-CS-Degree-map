# UH CS Degree Map - Backend Server

This is the backend API server for the UH Computer Science Degree Map application.

## Features

- **Course Data API**: Serves course information, prerequisites, and positions
- **Position Persistence**: Saves node positions when users drag courses around
- **CORS Enabled**: Configured for frontend communication
- **TypeScript**: Full TypeScript support with proper typing

## API Endpoints

### Health Check
- `GET /api/health` - Server health status

### Courses
- `GET /api/courses` - Get all courses data
- `GET /api/courses/:code` - Get specific course by code
- `PUT /api/courses/:code/position` - Update course position (x, y coordinates)

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Development mode:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## Environment Variables

You can create a `.env` file with the following variables:

```env
PORT=3001
NODE_ENV=development
```

## Project Structure

```
server/
├── src/
│   └── index.ts          # Main server file
├── data/
│   └── course.json       # Legacy course data
├── dist/                 # Compiled JavaScript (after build)
├── package.json
├── tsconfig.json
└── README.md
```

## Development

The server uses `ts-node-dev` for hot reloading during development. Any changes to the TypeScript files will automatically restart the server.

## Data Source

The server reads course data from the client's `courses.json` file to ensure data consistency across frontend and backend. 