import AnimatedBackground from "./ui/AnimatedBackground";

interface AboutProps {
  isDarkMode: boolean;
}

export default function About({  }: AboutProps) {
  return (
    <section id="about" className="py-32 px-4 sm:px-6 relative overflow-hidden">
      {/* Glassmorphism Background */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20"></div>
      <div className="absolute inset-0 backdrop-blur-3xl"></div> */}
      <AnimatedBackground particleCount={60} opacity={0.35} />

      <div className="w-full mx-auto relative z-10" style={{ maxWidth: '56rem' }}>
        <div className="text-center mb-12">
         
          {/* <div className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4"> */}
             <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          <h2>  About Me </h2>
          </h2>
          {/* </div> */}
          <p className="text-gray-300 text-lg">Get to know me better</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-lg p-8 md:p-12 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
          <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
            <p>
              I am a backend-focused Software Developer with 3+ years of experience building scalable and maintainable systems using Node.js, TypeScript, Express.js, and NestJS.
            </p>
            <p>
              My work focuses on clean architecture, API design, authentication & authorization, and performance optimization. I approach problems by first understanding requirements, modeling data, and designing APIs before implementation.
            </p>
            <p>
              I also work with React and Angular to build integrated full-stack solutions, enabling me to deliver complete features and collaborate effectively across teams.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}