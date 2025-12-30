import { Download, Terminal, ChevronDown, X, Play } from 'lucide-react';
import { useEffect, useState } from 'react';
import ParticleBackground from './ui/ParticleBackground';

interface HeroProps {
  isDarkMode: boolean;
  scrollToSection: (id: string) => void;
}

export default function Hero({ scrollToSection }: HeroProps) {
  const [displayedCode, setDisplayedCode] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(0);
  const [modalCode, setModalCode] = useState('');
  const [modalIndex, setModalIndex] = useState(0);

  const codeExamples = [
    {
      language: 'Node.js',
      color: 'from-green-500 to-emerald-600',
      icon: '⬢',
      code: `// Express.js API Server
const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/users', async (req, res) => {
  const users = await User.findAll();
  res.json({ success: true, users });
});

app.listen(3000, () => {
  console.log('🚀 Server running on port 3000');
});`
    },
    {
      language: 'TypeScript',
      color: 'from-blue-500 to-indigo-600',
      icon: 'TS',
      code: `// Type-safe API with interfaces
interface User {
  id: number;
  name: string;
  email: string;
}

async function fetchUsers(): Promise<User[]> {
  const response = await fetch('/api/users');
  const data = await response.json();
  return data.users;
}

const users: User[] = await fetchUsers();
console.log(users);`
    },
    {
      language: 'Python',
      color: 'from-yellow-500 to-amber-600',
      icon: '🐍',
      code: `# FastAPI Backend
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class User(BaseModel):
    name: str
    email: str

@app.post("/users")
async def create_user(user: User):
    return {"message": "User created", "user": user}

@app.get("/users")
async def get_users():
    return {"users": []}
`
    },
    {
      language: 'SQL',
      color: 'from-purple-500 to-pink-600',
      icon: '🗄️',
      code: `-- Optimized database query
SELECT 
  u.id,
  u.name,
  COUNT(o.id) as order_count,
  SUM(o.total) as total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at >= '2024-01-01'
GROUP BY u.id, u.name
HAVING COUNT(o.id) > 5
ORDER BY total_spent DESC
LIMIT 10;`
    },
    {
      language: 'Docker',
      color: 'from-cyan-500 to-blue-600',
      icon: '🐳',
      code: `# Multi-stage Node.js Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]`
    },
    {
      language: 'GraphQL',
      color: 'from-pink-500 to-rose-600',
      icon: '◭',
      code: `// GraphQL Schema & Resolver
type Query {
  users: [User!]!
  user(id: ID!): User
}

type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
}

const resolvers = {
  Query: {
    users: () => db.users.findAll(),
    user: (_, { id }) => db.users.findById(id)
  }
};`
    }
  ];

  const currentCode = codeExamples[0].code;

  // Hero typing animation
  useEffect(() => {
    if (currentIndex < currentCode.length) {
      const timeout = setTimeout(() => {
        setDisplayedCode(currentCode.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 30);
      return () => clearTimeout(timeout);
    } else {
      const resetTimeout = setTimeout(() => {
        setCurrentIndex(0);
        setDisplayedCode('');
      }, 3000);
      return () => clearTimeout(resetTimeout);
    }
  }, [currentIndex, currentCode]);

  // Modal typing animation
  useEffect(() => {
    if (isModalOpen && modalIndex < codeExamples[selectedLanguage].code.length) {
      const timeout = setTimeout(() => {
        setModalCode(codeExamples[selectedLanguage].code.slice(0, modalIndex + 1));
        setModalIndex(modalIndex + 1);
      }, 20);
      return () => clearTimeout(timeout);
    }
  }, [modalIndex, isModalOpen, selectedLanguage]);

  const openModal = (index: number) => {
    setSelectedLanguage(index);
    setIsModalOpen(true);
    setModalCode('');
    setModalIndex(0);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalCode('');
    setModalIndex(0);
  };

  return (
    <>
      <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-16 relative overflow-hidden bg-[#1a1f2e]">
        {/* Animated gradient orbs */}
        {/* <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div> */}
        <ParticleBackground
          particleCount={40}
          opacity={0.25}
          connectionDistance={120}
        />
        <div className="w-full text-center relative z-10" style={{ maxWidth: '72rem' }}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div className="text-left">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-6 bg-purple-500/10 border border-purple-500/20">
                <Terminal className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium text-purple-300">Software Developer</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-white">
                Turning Complex Ideas
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500">
                  into Working Systems
                </span>
              </h1>

              <p className="text-xl mb-10 text-gray-300">
                Software Engineer with a strong backend focus, experienced in building scalable, high-performance APIs using Node.js and TypeScript, and designing systems with clean architecture and robust backend patterns.
              </p>

              <pre className="mt-6 mb-10 bg-[#0d1117] p-4 rounded-xl text-sm text-gray-300 font-mono border border-gray-800">
                {displayedCode}
                <span className="inline-block w-2 h-4 bg-purple-500 animate-pulse ml-1" />
              </pre>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/ShivamMakwanaResume.pdf"
                  download
                  className="px-8 py-4 rounded-lg font-medium transition-all bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white flex items-center justify-center space-x-2 shadow-lg shadow-purple-500/50"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Resume</span>
                </a>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-4 rounded-lg font-medium transition-all bg-white/10 border border-white/20 hover:bg-white/20 text-white"
                >
                  Contact Me
                </button>
              </div>
            </div>

            {/* Right side - Code snippets grid */}
            <div className="grid grid-cols-2 gap-4">
              {codeExamples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => openModal(index)}
                  className="group relative bg-[#0d1117] rounded-xl border border-gray-800 p-4 hover:border-purple-500 transition-all hover:scale-105 cursor-pointer"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${example.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity`}></div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{example.icon}</span>
                      <Play className="w-4 h-4 text-gray-500 group-hover:text-purple-400 transition-colors" />
                    </div>
                    <p className="text-white font-mono text-sm font-bold">{example.language}</p>
                    <p className="text-gray-500 text-xs mt-1">Click to view</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-20 animate-bounce">
            <ChevronDown className="w-8 h-8 mx-auto text-white/50" />
          </div>
        </div>
      </section>

      {/* Full Screen Code Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-4xl max-h-[90vh] bg-[#0d1117] rounded-2xl border border-gray-800 shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <div className="flex items-center space-x-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{codeExamples[selectedLanguage].icon}</span>
                  <span className="text-white font-mono font-bold">{codeExamples[selectedLanguage].language}</span>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <X className="w-6 h-6 text-gray-400 hover:text-white" />
              </button>
            </div>

            {/* Language Tabs */}
            <div className="flex overflow-x-auto border-b border-gray-800 px-6">
              {codeExamples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedLanguage(index);
                    setModalCode('');
                    setModalIndex(0);
                  }}
                  className={`px-4 py-3 font-mono text-sm whitespace-nowrap border-b-2 transition-colors ${selectedLanguage === index
                      ? 'border-purple-500 text-white'
                      : 'border-transparent text-gray-500 hover:text-gray-300'
                    }`}
                >
                  {example.icon} {example.language}
                </button>
              ))}
            </div>

            {/* Code Content */}
            <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
              <pre className="font-mono text-sm text-gray-300 whitespace-pre-wrap">
                {modalCode}
                <span className="inline-block w-2 h-4 bg-purple-500 animate-pulse ml-1"></span>
              </pre>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-800 bg-[#0d1117]">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>Lines: {modalCode.split('\n').length}</span>
                <span>•</span>
                <span>Characters: {modalCode.length}</span>
              </div>
              <button
                onClick={closeModal}
                className="px-6 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}