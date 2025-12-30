import { ExternalLink, Code2 } from 'lucide-react';
import ParticleBackground from './ui/ParticleBackground';

interface Project {
  id: string;
  name: string;
  description: string;
  link?: string;
  stack?: string[];
}

interface ProjectsProps {
  projects: Project[];
  isDarkMode: boolean;
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <section id="projects" className="py-32 px-4 sm:px-6 relative overflow-hidden">
      {/* Glassmorphism Background */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
      <div className="absolute inset-0 backdrop-blur-3xl"></div> */}
      <ParticleBackground particleCount={40} opacity={0.25} connectionDistance={120} />
      
      <div className="w-full mx-auto relative z-10" style={{ maxWidth: '72rem' }}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Featured Projects
          </h2>
          <p className="text-gray-300 text-lg">
            Showcase of my best work and technical solutions
          </p>
        </div>
        
        {projects.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 inline-block">
              <Code2 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-300 text-lg">No projects added yet.</p>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 group hover:scale-105"
              >
                <div className="flex items-start justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
                    {project.name}
                  </h3>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/10 hover:bg-purple-600 hover:text-white transition-all flex-shrink-0"
                    >
                      <ExternalLink className="w-5 h-5 text-white" />
                    </a>
                  )}
                </div>
                
                <p className="mb-6 text-gray-300 text-base leading-relaxed">
                  {project.description}
                </p>
                
                {project.stack && (
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-4 py-2 rounded-full font-medium bg-white/5 text-gray-300 border border-white/20 hover:bg-white/10 transition-all"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}