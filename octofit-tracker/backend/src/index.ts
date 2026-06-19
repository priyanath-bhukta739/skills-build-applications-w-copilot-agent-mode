import express from 'express';
import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models';

const app = express();
const port = Number(process.env.PORT ?? 8000);
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.githubpreview.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'OctoFit Tracker backend is running',
    port,
    apiBaseUrl,
    mongoUri,
    routes: [
      '/api/users',
      '/api/teams',
      '/api/activities',
      '/api/leaderboard',
      '/api/workouts'
    ]
  });
});

app.get('/api/users', async (_req, res) => {
  const users = await User.find().lean();
  res.json({ data: users });
});

app.post('/api/users', async (req, res) => {
  const user = await User.create({
    email: req.body.email ?? `user+${Date.now()}@octofit.local`,
    displayName: req.body.displayName ?? `User ${Date.now()}`,
    createdAt: new Date()
  });
  res.status(201).json({ data: user });
});

app.get('/api/teams', async (_req, res) => {
  const teams = await Team.find().lean();
  res.json({ data: teams });
});

app.post('/api/teams', async (req, res) => {
  const team = await Team.create({
    name: req.body.name ?? `Team ${Date.now()}`,
    members: req.body.members ?? [],
    createdAt: new Date()
  });
  res.status(201).json({ data: team });
});

app.get('/api/activities', async (_req, res) => {
  const activities = await Activity.find().lean();
  res.json({ data: activities });
});

app.post('/api/activities', async (req, res) => {
  const activity = await Activity.create({
    userId: req.body.userId ?? 'unknown',
    type: req.body.type ?? 'running',
    durationMinutes: Number(req.body.durationMinutes ?? 30),
    caloriesBurned: Number(req.body.caloriesBurned ?? 250),
    timestamp: new Date()
  });
  res.status(201).json({ data: activity });
});

app.get('/api/leaderboard', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find().lean();
  res.json({ data: leaderboard });
});

app.post('/api/leaderboard', async (req, res) => {
  const entry = await LeaderboardEntry.create({
    userId: req.body.userId ?? 'unknown',
    score: Number(req.body.score ?? 0),
    rank: Number(req.body.rank ?? 1),
    updatedAt: new Date()
  });
  res.status(201).json({ data: entry });
});

app.get('/api/workouts', async (_req, res) => {
  const workouts = await Workout.find().lean();
  res.json({ data: workouts });
});

app.post('/api/workouts', async (req, res) => {
  const workout = await Workout.create({
    name: req.body.name ?? `Workout ${Date.now()}`,
    difficulty: req.body.difficulty ?? 'medium',
    durationMinutes: Number(req.body.durationMinutes ?? 45),
    tags: req.body.tags ?? ['fitness'],
    createdAt: new Date()
  });
  res.status(201).json({ data: workout });
});

app.listen(port, async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log(`Connected to MongoDB at ${mongoUri}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }

  console.log(`Backend server listening on ${apiBaseUrl}`);
});
