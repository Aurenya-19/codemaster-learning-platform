const express = require('express');
const router = express.Router();

// In-memory storage (in production, use database)
const userProgress = new Map();

// Get user progress
router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  
  const progress = userProgress.get(userId) || {
    userId,
    python: {
      completedModules: [],
      currentModule: 'basics',
      completedChallenges: [],
      totalPoints: 0,
      level: 1
    },
    cpp: {
      completedModules: [],
      currentModule: 'fundamentals',
      completedChallenges: [],
      totalPoints: 0,
      level: 1
    },
    totalChallengesSolved: 0,
    totalPoints: 0,
    achievements: []
  };
  
  res.json(progress);
});

// Update progress
router.post('/update', (req, res) => {
  const { userId, language, moduleId, challengeId, points } = req.body;
  
  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }
  
  let progress = userProgress.get(userId) || {
    userId,
    python: {
      completedModules: [],
      currentModule: 'basics',
      completedChallenges: [],
      totalPoints: 0,
      level: 1
    },
    cpp: {
      completedModules: [],
      currentModule: 'fundamentals',
      completedChallenges: [],
      totalPoints: 0,
      level: 1
    },
    totalChallengesSolved: 0,
    totalPoints: 0,
    achievements: []
  };
  
  // Update language-specific progress
  if (language && challengeId) {
    if (!progress[language].completedChallenges.includes(challengeId)) {
      progress[language].completedChallenges.push(challengeId);
      progress[language].totalPoints += points || 0;
      progress.totalChallengesSolved += 1;
      progress.totalPoints += points || 0;
      
      // Level up logic
      const newLevel = Math.floor(progress.totalPoints / 500) + 1;
      progress[language].level = newLevel;
    }
  }
  
  // Update module progress
  if (language && moduleId) {
    if (!progress[language].completedModules.includes(moduleId)) {
      progress[language].completedModules.push(moduleId);
    }
    progress[language].currentModule = moduleId;
  }
  
  userProgress.set(userId, progress);
  
  res.json({
    success: true,
    progress
  });
});

// Get leaderboard
router.get('/leaderboard/top', (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  
  const leaderboard = Array.from(userProgress.values())
    .sort((a, b) => b.totalPoints - a.totalPoints)
    .slice(0, limit)
    .map((user, index) => ({
      rank: index + 1,
      userId: user.userId,
      totalPoints: user.totalPoints,
      challengesSolved: user.totalChallengesSolved
    }));
  
  res.json(leaderboard);
});

module.exports = router;
