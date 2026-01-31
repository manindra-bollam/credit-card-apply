import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Application, User } from './models';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/credit-card-apply';

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ============ USER ROUTES ============

// Create a new user
app.post('/api/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create user';
    res.status(400).json({ success: false, error: message });
  }
});

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json({ success: true, data: users });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch users';
    res.status(500).json({ success: false, error: message });
  }
});

// Get user by ID
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch user';
    res.status(500).json({ success: false, error: message });
  }
});

// ============ APPLICATION ROUTES ============

// Create a new application for a user
app.post('/api/applications', async (req, res) => {
  try {
    const { userId } = req.body;
    
    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    // Find or create application record for user
    let application = await Application.findOne({ userId });
    if (!application) {
      application = new Application({ userId, history: [] });
    }

    // Add new application entry to history
    application.history.push({
      applicationId: new mongoose.Types.ObjectId(),
      timestamp: new Date(),
      status: 'pending'
    });

    await application.save();
    res.status(201).json({ success: true, data: application });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create application';
    res.status(400).json({ success: false, error: message });
  }
});

// Get all applications
app.get('/api/applications', async (req, res) => {
  try {
    const applications = await Application.find().populate('userId');
    res.json({ success: true, data: applications });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch applications';
    res.status(500).json({ success: false, error: message });
  }
});

// Get application by user ID
app.get('/api/applications/user/:userId', async (req, res) => {
  try {
    const application = await Application.findOne({ userId: req.params.userId }).populate('userId');
    if (!application) {
      return res.status(404).json({ success: false, error: 'No applications found for this user' });
    }
    res.json({ success: true, data: application });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch application';
    res.status(500).json({ success: false, error: message });
  }
});

// Connect to MongoDB and start server
async function startServer() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

startServer();
