import { connectDatabase, mongoUri } from '../database';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

async function seed() {
  console.log('Seed the octofit_db database with test data');
  await connectDatabase();

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    LeaderboardEntry.deleteMany({})
  ]);

  const users = await User.create([
    { email: 'jordan@octofit.app', displayName: 'Jordan Miles', createdAt: new Date('2026-01-12T10:00:00Z') },
    { email: 'sierra@octofit.app', displayName: 'Sierra Chen', createdAt: new Date('2026-02-25T14:30:00Z') },
    { email: 'noah@octofit.app', displayName: 'Noah Ramirez', createdAt: new Date('2026-03-03T08:15:00Z') }
  ]);

  const teams = await Team.create([
    { name: 'Ocean Warriors', members: [users[0]._id.toString(), users[1]._id.toString()], createdAt: new Date('2026-03-01T09:00:00Z') },
    { name: 'Sunrise Sprinters', members: [users[2]._id.toString()], createdAt: new Date('2026-04-11T07:15:00Z') }
  ]);

  const workouts = await Workout.create([
    { name: 'Full Body Blast', difficulty: 'hard', durationMinutes: 55, tags: ['strength', 'endurance'], createdAt: new Date('2026-04-20T06:00:00Z') },
    { name: 'Morning Mobility', difficulty: 'easy', durationMinutes: 25, tags: ['stretching', 'warmup'], createdAt: new Date('2026-05-05T06:30:00Z') },
    { name: 'Cardio Burn', difficulty: 'medium', durationMinutes: 40, tags: ['cardio', 'intervals'], createdAt: new Date('2026-05-15T18:00:00Z') }
  ]);

  const activities = await Activity.create([
    { userId: users[0]._id.toString(), type: 'cycling', durationMinutes: 45, caloriesBurned: 420, timestamp: new Date('2026-06-01T07:20:00Z') },
    { userId: users[1]._id.toString(), type: 'yoga', durationMinutes: 30, caloriesBurned: 160, timestamp: new Date('2026-06-02T06:50:00Z') },
    { userId: users[2]._id.toString(), type: 'running', durationMinutes: 35, caloriesBurned: 380, timestamp: new Date('2026-06-02T19:15:00Z') }
  ]);

  await LeaderboardEntry.create([
    { userId: users[0]._id.toString(), score: 1275, rank: 1, updatedAt: new Date('2026-06-02T20:00:00Z') },
    { userId: users[1]._id.toString(), score: 1180, rank: 2, updatedAt: new Date('2026-06-02T20:00:00Z') },
    { userId: users[2]._id.toString(), score: 1105, rank: 3, updatedAt: new Date('2026-06-02T20:00:00Z') }
  ]);

  console.log('Seeding complete.');
  await mongoose.disconnect();
}

seed().catch(error => {
  console.error('Seed error:', error);
  process.exit(1);
});
