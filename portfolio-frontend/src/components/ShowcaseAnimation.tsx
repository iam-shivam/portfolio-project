// import { useEffect, useRef } from 'react';
import { Server, Database, Code, Zap, GitBranch, Terminal } from 'lucide-react';
import ParticleBackground from './ui/ParticleBackground';

export default function ShowcaseAnimation() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     canvas.width = canvas.offsetWidth;
//     canvas.height = canvas.offsetHeight;

//     // Particle system for code visualization
//     const particles: Array<{
//       x: number;
//       y: number;
//       vx: number;
//       vy: number;
//       size: number;
//       color: string;
//     }> = [];

//     const colors = ['#8B5CF6', '#EC4899', '#3B82F6', '#10B981'];

//     // Create particles
//     for (let i = 0; i < 50; i++) {
//       particles.push({
//         x: Math.random() * canvas.width,
//         y: Math.random() * canvas.height,
//         vx: (Math.random() - 0.5) * 0.5,
//         vy: (Math.random() - 0.5) * 0.5,
//         size: Math.random() * 3 + 1,
//         color: colors[Math.floor(Math.random() * colors.length)]
//       });
//     }

//     function animate() {
//       if (!ctx || !canvas) return;
      
//       ctx.fillStyle = 'rgba(26, 31, 46, 0.1)';
//       ctx.fillRect(0, 0, canvas.width, canvas.height);

//       // Draw connections
//       particles.forEach((p1, i) => {
//         particles.slice(i + 1).forEach(p2 => {
//           const dx = p1.x - p2.x;
//           const dy = p1.y - p2.y;
//           const dist = Math.sqrt(dx * dx + dy * dy);

//           if (dist < 150) {
//             ctx.beginPath();
//             ctx.strokeStyle = `rgba(139, 92, 246, ${1 - dist / 150})`;
//             ctx.lineWidth = 0.5;
//             ctx.moveTo(p1.x, p1.y);
//             ctx.lineTo(p2.x, p2.y);
//             ctx.stroke();
//           }
//         });
//       });

//       // Update and draw particles
//       particles.forEach(p => {
//         p.x += p.vx;
//         p.y += p.vy;

//         if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
//         if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

//         ctx.beginPath();
//         ctx.fillStyle = p.color;
//         ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
//         ctx.fill();
//       });

//       requestAnimationFrame(animate);
//     }

//     animate();

//     const handleResize = () => {
//       canvas.width = canvas.offsetWidth;
//       canvas.height = canvas.offsetHeight;
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

  const features = [
    {
      icon: <Server className="w-8 h-8" />,
      title: "Scalable Architecture",
      description: "Building systems that grow with your business"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Optimized Databases",
      description: "Lightning-fast queries and efficient data models"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Clean Code",
      description: "Maintainable, tested, and documented solutions"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "High Performance",
      description: "Millisecond response times at scale"
    },
    {
      icon: <GitBranch className="w-8 h-8" />,
      title: "Modern Workflows",
      description: "CI/CD, Docker, and cloud-native deployments"
    },
    {
      icon: <Terminal className="w-8 h-8" />,
      title: "API Excellence",
      description: "RESTful and GraphQL APIs that developers love"
    }
  ];

  return (
    <section className="py-32 px-4 sm:px-6 relative overflow-hidden bg-[#1a1f2e]">
      {/* Animated Background Canvas */}
      {/* <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.3 }}
      /> */}
        <ParticleBackground particleCount={60} opacity={0.3} />
      <div className="w-full mx-auto relative z-10" style={{ maxWidth: '72rem' }}>
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4">
            💻 Backend Expertise
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Crafting Robust Backend Systems
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Specialized in building high-performance APIs, microservices, and scalable architectures
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 rounded-xl transition-all duration-300"></div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Code Snippet Animation */}
        <div className="mt-16 bg-[#0d1117] rounded-xl border border-gray-800 p-6 overflow-hidden relative">
          <div className="absolute top-4 left-4 flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          
          <div className="mt-8 font-mono text-sm">
            <div className="text-purple-400">
              <span className="text-pink-500">const</span>{' '}
              <span className="text-blue-400">buildAPI</span> ={' '}
              <span className="text-yellow-400">async</span> () =&gt; {'{'}
            </div>
            <div className="text-gray-400 ml-4">
              <span className="text-pink-500">const</span> server = <span className="text-green-400">express</span>();
            </div>
            <div className="text-gray-400 ml-4">
              <span className="text-pink-500">await</span> <span className="text-blue-400">connectDatabase</span>();
            </div>
            <div className="text-gray-400 ml-4">
              server.<span className="text-yellow-400">use</span>(<span className="text-green-400">middleware</span>);
            </div>
            <div className="text-gray-400 ml-4">
              <span className="text-pink-500">return</span> server.<span className="text-yellow-400">listen</span>(<span className="text-orange-400">3000</span>);
            </div>
            <div className="text-purple-400">{'};'}</div>
          </div>

          {/* Typing cursor animation */}
          <div className="absolute bottom-6 right-6 w-2 h-4 bg-purple-500 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}