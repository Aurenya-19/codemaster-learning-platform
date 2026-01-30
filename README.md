# CodeMaster Learning Platform 🚀

A full-stack, production-ready learning platform for mastering Python and C++ from zero to professional level.

## 🌟 Features

### Core Learning
- **Interactive Code Editor** - Monaco Editor (VS Code engine) with syntax highlighting
- **Real Code Execution** - Run Python & C++ code with instant feedback
- **Progress Tracking** - Save your progress across all modules
- **Automated Testing** - Test cases for every challenge
- **AI-Powered Hints** - Get intelligent help when stuck

### Python Curriculum (Zero to Master)
1. **Beginner** - Basics, Control Flow, Data Structures
2. **Intermediate** - OOP, File I/O, APIs
3. **Advanced** - AI/ML, Neural Networks, Simulations
4. **Professional** - Advanced Algorithms, System Design

### C++ Curriculum (Zero to Professional)
1. **Beginner** - Fundamentals, Pointers & Memory
2. **Intermediate** - Data Structures, OOP
3. **Advanced** - State Machines, Event Systems, Deterministic vs Stochastic
4. **Professional** - Game Engine Architecture, Multithreading

### AI Lab & Simulations
- 🧠 Neural Network Playground
- 🎲 Monte Carlo Simulations
- 🔄 State Machine Designer
- ⚡ Event System Simulator
- 🎯 Pathfinding Visualizer
- 🌊 Physics Engine

## 🛠️ Tech Stack

**Frontend:**
- React 18 with TypeScript
- Monaco Editor for code editing
- TailwindCSS for styling
- Zustand for state management

**Backend:**
- Node.js + Express
- Python execution via child_process
- C++ compilation with g++
- PostgreSQL for data persistence

**Deployment:**
- Railway for backend
- Vercel for frontend
- GitHub Actions for CI/CD

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.10+
- GCC/G++ compiler
- PostgreSQL (optional for local dev)

### Installation

```bash
# Clone the repository
git clone https://github.com/Aurenya-19/codemaster-learning-platform.git
cd codemaster-learning-platform

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

## 📁 Project Structure

```
codemaster-learning-platform/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom hooks
│   │   ├── store/         # State management
│   │   └── utils/         # Utility functions
│   └── public/
├── server/                # Node.js backend
│   ├── routes/           # API routes
│   ├── controllers/      # Business logic
│   ├── models/           # Database models
│   ├── middleware/       # Express middleware
│   └── executors/        # Code execution engines
├── database/             # Database schemas
└── docs/                 # Documentation
```

## 🔧 Environment Variables

```env
# Server
PORT=5000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/codemaster

# Code Execution
PYTHON_PATH=/usr/bin/python3
GCC_PATH=/usr/bin/g++
EXECUTION_TIMEOUT=5000

# Security
JWT_SECRET=your-secret-key
ALLOWED_ORIGINS=http://localhost:3000
```

## 📚 API Documentation

### Code Execution
```
POST /api/execute/python
POST /api/execute/cpp
```

### User Progress
```
GET /api/progress/:userId
POST /api/progress/update
```

### Challenges
```
GET /api/challenges
GET /api/challenges/:id
POST /api/challenges/:id/submit
```

## 🎯 Roadmap

- [x] Core platform setup
- [x] Code editor integration
- [x] Python execution engine
- [x] C++ execution engine
- [ ] User authentication
- [ ] Progress tracking
- [ ] AI-powered hints
- [ ] Interactive simulations
- [ ] Mobile app (React Native)
- [ ] Community features

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

- Monaco Editor by Microsoft
- Judge0 for code execution inspiration
- freeCodeCamp for curriculum ideas

## 📞 Support

- GitHub Issues: [Report bugs](https://github.com/Aurenya-19/codemaster-learning-platform/issues)
- Email: support@codemaster.dev

---

Built with ❤️ for aspiring developers worldwide
