import { Server, Database, Globe } from 'lucide-react';
import ParticleBackground from './ui/ParticleBackground';

interface Skill {
  id: string;
  name: string;
  level: number;
}

interface SkillsData {
  backend: Skill[];
  database: Skill[];
  frontend: Skill[];
}

interface SkillsProps {
  skills: SkillsData;
  isDarkMode: boolean;
}

export default function Skills({ skills }: SkillsProps) {
  return (
    <section id="skills" className="py-32 px-4 sm:px-6 relative overflow-hidden">
      {/* Glassmorphism Background */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-indigo-900/20"></div>
      <div className="absolute inset-0 backdrop-blur-3xl"></div> */}
      <ParticleBackground particleCount={40} opacity={0.25} connectionDistance={120} />
      
      
      <div className="w-full mx-auto relative z-10" style={{ maxWidth: '72rem' }}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Skills & Technologies
          </h2>
          <p className="text-gray-300 text-lg">
            My technical expertise and proficiency levels
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Backend Skills */}
          {skills.backend?.length > 0 && (
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <h3 className="text-2xl font-bold mb-8 flex items-center space-x-3 text-white">
                <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                  <Server className="w-6 h-6 text-white" />
                </div>
                <span>Backend</span>
              </h3>
              <div className="space-y-4">
                {skills.backend.map((skill) => (
                  <div key={skill.id} className="bg-white/5 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white">{skill.name}</span>
                      <span className="text-sm text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Database Skills */}
          {skills.database?.length > 0 && (
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <h3 className="text-2xl font-bold mb-8 flex items-center space-x-3 text-white">
                <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <span>Databases</span>
              </h3>
              <div className="space-y-4">
                {skills.database.map((skill) => (
                  <div key={skill.id} className="bg-white/5 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white">{skill.name}</span>
                      <span className="text-sm text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Frontend Skills */}
          {skills.frontend?.length > 0 && (
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <h3 className="text-2xl font-bold mb-8 flex items-center space-x-3 text-white">
                <div className="p-3 rounded-lg bg-gradient-to-br from-green-500 to-teal-600">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <span>Frontend</span>
              </h3>
              <div className="space-y-4">
                {skills.frontend.map((skill) => (
                  <div key={skill.id} className="bg-white/5 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white">{skill.name}</span>
                      <span className="text-sm text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}