import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import type { Course } from '@client/types/course';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'], // Vite and CRA default ports
  credentials: true
}));
app.use(express.json());

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

app.get('/api/courses', (req, res) => {
  try {
    // Read course data from the client's courses.json file
    const coursesPath = path.join(__dirname, '../../client/data/courses.json');
    
    if (!fs.existsSync(coursesPath)) {
      return res.status(404).json({ error: 'Courses data not found' });
    }

    const coursesData = JSON.parse(fs.readFileSync(coursesPath, 'utf-8'));
    res.json(coursesData);
  } catch (error) {
    console.error('Error reading courses data:', error);
    res.status(500).json({ error: 'Failed to load courses data' });
  }
});

app.get('/api/courses/:code', (req, res) => {
  try {
    const { code } = req.params;
    const coursesPath = path.join(__dirname, '../../client/data/courses.json');
    
    if (!fs.existsSync(coursesPath)) {
      return res.status(404).json({ error: 'Courses data not found' });
    }

    const coursesData = JSON.parse(fs.readFileSync(coursesPath, 'utf-8'));
    const course = coursesData.courses.find((c: Course) => c.code === code);
    
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    
    res.json(course);
  } catch (error) {
    console.error('Error reading course data:', error);
    res.status(500).json({ error: 'Failed to load course data' });
  }
});

// Save course positions (for when users drag nodes around)
app.put('/api/courses/:code/position', (req, res) => {
  try {
    const { code } = req.params;
    const { x, y } = req.body;
    
    if (typeof x !== 'number' || typeof y !== 'number') {
      return res.status(400).json({ error: 'Invalid position coordinates' });
    }

    const coursesPath = path.join(__dirname, '../../client/data/courses.json');
    
    if (!fs.existsSync(coursesPath)) {
      return res.status(404).json({ error: 'Courses data not found' });
    }

    const coursesData = JSON.parse(fs.readFileSync(coursesPath, 'utf-8'));
    const courseIndex = coursesData.courses.findIndex((c: Course) => c.code === code);
    
    if (courseIndex === -1) {
      return res.status(404).json({ error: 'Course not found' });
    }
    
    coursesData.courses[courseIndex].position = { x, y };
    
    fs.writeFileSync(coursesPath, JSON.stringify(coursesData, null, 2));
    
    res.json({ message: 'Position updated successfully', course: coursesData.courses[courseIndex] });
  } catch (error) {
    console.error('Error updating course position:', error);
    res.status(500).json({ error: 'Failed to update course position' });
  }
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📚 API endpoints available at http://localhost:${PORT}/api`);
});