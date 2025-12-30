// import { useState, useEffect } from 'react';
// import { Menu, X, Github, Linkedin, Mail, Download, Code2, Database, Globe, Server, Terminal, Sun, Moon, ExternalLink, ChevronDown, Calendar, Clock } from 'lucide-react';

// // const API_BASE_URL = 'http://localhost:5000/api';


// const api = {
//   getBlogs: async () => {
//     const res = await fetch(`${import.meta.env.VITE_API_URL}/blogs?published=true`);
//     if (!res.ok) throw new Error('Failed to fetch blogs');
//     return res.json();
//   },
//   getProjects: async () => {
//     const res = await fetch(`${import.meta.env.VITE_API_URL}/projects?featured=true`);
//     if (!res.ok) throw new Error('Failed to fetch projects');
//     return res.json();
//   },
//   getSkills: async () => {
//     const res = await fetch(`${import.meta.env.VITE_API_URL}/skills/by-category`);
//     if (!res.ok) throw new Error('Failed to fetch skills');
//     return res.json();
//   },
//   submitContact: async (data: { name: string; email: string; message: string }) => {
//     const res = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data),
//     });
//     if (!res.ok) throw new Error('Failed to submit');
//     return res.json();
//   },
// };

// export default function Portfolio() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [activeSection, setActiveSection] = useState('home');
//   const [isDarkMode, setIsDarkMode] = useState(true);
//   interface Skill {
//     id: string;
//     name: string;
//     level: number;
//   }

//   interface SkillsData {
//     backend: Skill[];
//     database: Skill[];
//     frontend: Skill[];
//     other: Skill[];
//   }

//   interface Project {
//     id: string;
//     name: string;
//     description: string;
//     link?: string;
//     stack?: string[];
//   }

//   interface BlogPost {
//     id: string;
//     title: string;
//     excerpt: string;
//     publishedAt: string;
//     readTime: number;
//     tags?: string[];
//   }
//   const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [skills, setSkills] = useState<SkillsData>({ backend: [], database: [], frontend: [], other: [] });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const [blogs, projs, skls] = await Promise.all([
//           api.getBlogs(),
//           api.getProjects(),
//           api.getSkills(),
//         ]);
//         setBlogPosts(blogs);
//         setProjects(projs);
//         setSkills(skls);
//         setLoading(false);
//       } catch (err: string | any) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       const sections = ['home', 'about', 'skills', 'experience', 'projects', 'blog', 'contact'];
//       const scrollPosition = window.scrollY + 100;
//       for (const section of sections) {
//         const element = document.getElementById(section);
//         if (element) {
//           const { offsetTop, offsetHeight } = element;
//           if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
//             setActiveSection(section);
//             break;
//           }
//         }
//       }
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const scrollToSection = (id: string) => {
//     const element = document.getElementById(id);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' });
//       setIsMenuOpen(false);
//     }
//   };

//   const toggleTheme = () => setIsDarkMode(!isDarkMode);
//   interface ContactFormData {
//     name: string;
//     email: string;
//     message: string;
//   }

//   interface ContactFormEvent extends React.FormEvent<HTMLFormElement> {
//     target: HTMLFormElement & {
//       name: { value: string };
//       email: { value: string };
//       message: { value: string };
//       reset: () => void;
//     };
//   }
//   const handleContactSubmit = async (e: ContactFormEvent) => {
//     e.preventDefault();
//     const data: ContactFormData = {
//       name: e.target.name.value,
//       email: e.target.email.value,
//       message: e.target.message.value,
//     };
//     try {
//       await api.submitContact(data);
//       alert('✅ Message sent successfully!');
//       e.target.reset();
//     } catch (err) {
//       alert('❌ Failed to send message');
//     }
//   };

//   const navigationItems = [
//     { id: 'home', label: 'Home' },
//     { id: 'about', label: 'About' },
//     { id: 'skills', label: 'Skills' },
//     { id: 'experience', label: 'Experience' },
//     { id: 'projects', label: 'Projects' },
//     { id: 'blog', label: 'Blog' },
//     { id: 'contact', label: 'Contact' }
//   ];

//   const bgPrimary = isDarkMode ? 'bg-[#1a1f2e]' : 'bg-white';
//   const bgSecondary = isDarkMode ? 'bg-[#151922]' : 'bg-gray-50';
//   const textPrimary = isDarkMode ? 'text-gray-100' : 'text-gray-900';
//   const textSecondary = isDarkMode ? 'text-gray-300' : 'text-gray-700';
//   const textTertiary = isDarkMode ? 'text-gray-400' : 'text-gray-600';
//   const borderColor = isDarkMode ? 'border-gray-800' : 'border-gray-200';
//   const cardBg = isDarkMode ? 'bg-[#151922]' : 'bg-white';
//   const cardHover = isDarkMode ? 'hover:border-purple-500/50' : 'hover:border-purple-400';

//   if (loading) {
//     return (
//       <div className={`min-h-screen w-full flex items-center justify-center ${bgPrimary}`}>
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mb-4"></div>
//           <p className={`text-xl ${textSecondary}`}>Loading portfolio...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className={`min-h-screen w-full flex items-center justify-center ${bgPrimary} px-6`}>
//         <div className="text-center max-w-md">
//           <div className="text-red-500 text-6xl mb-4">⚠️</div>
//           <h2 className={`text-2xl font-bold mb-2 ${textPrimary}`}>Failed to Load</h2>
//           <p className={`${textSecondary} mb-4`}>{error}</p>
//           <button onClick={() => window.location.reload()} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg">
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={`min-h-screen w-screen overflow-x-hidden ${bgPrimary} ${textPrimary} transition-colors duration-300`}>
//       <nav className={`fixed top-0 left-0 right-0 z-50 ${isDarkMode ? 'bg-[#1a1f2e]/95' : 'bg-white/95'} backdrop-blur-sm border-b ${borderColor} transition-colors duration-300`} style={{ width: '100vw' }}>
//         <div className="w-full px-4 sm:px-6 lg:px-8" style={{ maxWidth: '1280px', margin: '0 auto' }}>
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center space-x-2">
//               <Code2 className="w-7 h-7 text-purple-500" />
//               <span className="text-xl font-bold">Dev-Shivam</span>
//             </div>
//             <div className="hidden md:flex items-center space-x-8">
//               {navigationItems.map((item) => (
//                 <button key={item.id} onClick={() => scrollToSection(item.id)} className={`transition-colors ${activeSection === item.id ? 'text-green-400' : `${textTertiary} hover:${textPrimary}`}`}>
//                   {item.label}
//                 </button>
//               ))}
//               <button onClick={toggleTheme} className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} transition-all`}>
//                 {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//               </button>
//             </div>
//             <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2">
//               {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </button>
//           </div>
//           {isMenuOpen && (
//             <div className="md:hidden pb-4 space-y-2">
//               {navigationItems.map((item) => (
//                 <button key={item.id} onClick={() => scrollToSection(item.id)} className={`block w-full text-left py-2 px-4 ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} rounded`}>
//                   {item.label}
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>
//       </nav>

//       <section id="home" className={`min-h-screen flex items-center justify-center px-4 sm:px-6 pt-16 ${bgPrimary}`}>
//         <div className="w-full text-center" style={{ maxWidth: '56rem' }}>
//           <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-6 ${isDarkMode ? 'bg-purple-900/30 text-purple-400 border border-purple-800/50' : 'bg-purple-100 text-purple-700 border border-purple-200'}`}>
//             <Terminal className="w-4 h-4" />
//             <span className="text-sm font-medium">Backend Developer</span>
//           </div>
//           <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
//             Building Scalable
//             <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Backend Systems</span>
//           </h1>
//           <p className={`text-xl md:text-2xl mb-10 ${textTertiary} max-w-3xl mx-auto`}>
//             Specialized in Node.js, TypeScript, and architecting high-performance APIs with modern databases and cloud infrastructure
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <a href="/ShivamMakwanaResume.pdf" download className="px-8 py-4 rounded-lg font-medium transition-all bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white flex items-center justify-center space-x-2">
//               <Download className="w-5 h-5" />
//               <span>Download Resume</span>
//             </a>
//             <button onClick={() => scrollToSection('contact')} className={`px-8 py-4 rounded-lg font-medium transition-all ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700' : 'bg-gray-100 hover:bg-gray-200 border border-gray-300'}`}>
//               Contact Me
//             </button>
//           </div>
//           <div className="mt-16 animate-bounce">
//             <ChevronDown className={`w-8 h-8 mx-auto ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
//           </div>
//         </div>
//       </section>

//       <section id="about" className={`py-32 px-4 sm:px-6 ${bgSecondary}`}>
//         <div className="w-full mx-auto" style={{ maxWidth: '56rem' }}>
//           <div className="text-center mb-12">
//             <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">About Me</h2>
//             <p className={`${textTertiary} text-lg`}>Get to know me better</p>
//           </div>
//           <div className={`space-y-6 text-lg ${textSecondary} leading-relaxed`}>
//             <p>I am a backend-focused Software Developer specialized in building scalable, reliable, and high-performance systems using Node.js, TypeScript, Express.js, and NestJS.</p>
//             <p>My approach centers on clean architecture, optimized API design, and robust system patterns.</p>
//             <p>While my expertise lies in backend development, I also work with React and Angular to build integrated full-stack solutions.</p>
//           </div>
//         </div>
//       </section>

//       <section id="skills" className="py-32 px-4 sm:px-6">
//         <div className="w-full mx-auto" style={{ maxWidth: '72rem' }}>
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Skills & Technologies</h2>
//             <p className={`${textTertiary} text-lg`}>My technical expertise and proficiency levels</p>
//           </div>
//           <div className="grid md:grid-cols-3 gap-8">
//             {skills.backend?.length > 0 && (
//               <div className={`p-8 rounded-xl ${cardBg} border-2 ${borderColor} ${cardHover} transition-all hover:shadow-2xl hover:shadow-purple-500/10`}>
//                 <h3 className="text-2xl font-bold mb-8 flex items-center space-x-3">
//                   <div className="p-3 rounded-lg bg-purple-500/10">
//                     <Server className="text-purple-400 w-6 h-6" />
//                   </div>
//                   <span>Backend</span>
//                 </h3>
//                 <div className="space-y-4">
//                   {skills.backend.map((skill) => (
//                     <div key={skill.id} className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100'} p-3 rounded-lg`}>
//                       <div className="flex items-center justify-between mb-2">
//                         <span className="font-medium">{skill.name}</span>
//                         <span className={`text-sm ${textTertiary}`}>{skill.level}%</span>
//                       </div>
//                       <div className={`w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
//                         <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: `${skill.level}%` }}></div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//             {skills.database?.length > 0 && (
//               <div className={`p-8 rounded-xl ${cardBg} border-2 ${borderColor} ${cardHover} transition-all hover:shadow-2xl hover:shadow-purple-500/10`}>
//                 <h3 className="text-2xl font-bold mb-8 flex items-center space-x-3">
//                   <div className="p-3 rounded-lg bg-purple-500/10">
//                     <Database className="text-purple-400 w-6 h-6" />
//                   </div>
//                   <span>Databases</span>
//                 </h3>
//                 <div className="space-y-4">
//                   {skills.database.map((skill) => (
//                     <div key={skill.id} className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100'} p-3 rounded-lg`}>
//                       <div className="flex items-center justify-between mb-2">
//                         <span className="font-medium">{skill.name}</span>
//                         <span className={`text-sm ${textTertiary}`}>{skill.level}%</span>
//                       </div>
//                       <div className={`w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
//                         <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: `${skill.level}%` }}></div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//             {skills.frontend?.length > 0 && (
//               <div className={`p-8 rounded-xl ${cardBg} border-2 ${borderColor} ${cardHover} transition-all hover:shadow-2xl hover:shadow-purple-500/10`}>
//                 <h3 className="text-2xl font-bold mb-8 flex items-center space-x-3">
//                   <div className="p-3 rounded-lg bg-purple-500/10">
//                     <Globe className="text-purple-400 w-6 h-6" />
//                   </div>
//                   <span>Frontend</span>
//                 </h3>
//                 <div className="space-y-4">
//                   {skills.frontend.map((skill) => (
//                     <div key={skill.id} className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100'} p-3 rounded-lg`}>
//                       <div className="flex items-center justify-between mb-2">
//                         <span className="font-medium">{skill.name}</span>
//                         <span className={`text-sm ${textTertiary}`}>{skill.level}%</span>
//                       </div>
//                       <div className={`w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
//                         <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: `${skill.level}%` }}></div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* <section id="experience" className={`py-32 px-4 sm:px-6 ${bgSecondary}`}>
//         <div className="w-full max-w-4xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Experience</h2>
//             <p className={`${textTertiary} text-lg`}>Professional journey and achievements</p>
//           </div>
//           <div className="border-l-4 border-purple-500 pl-8 ml-4">
//             <div className="text-sm font-medium mb-2 text-green-400">2022 - Present</div>
//             <h3 className="text-2xl font-bold mb-4">Software Developer</h3>
//             <ul className={`space-y-3 ${textSecondary}`}>
//               <li className="flex items-start space-x-2">
//                 <span className="text-purple-400 mt-1">•</span>
//                 <span>Architected scalable REST APIs serving 100K+ users with Node.js, TypeScript, and NestJS</span>
//               </li>
//               <li className="flex items-start space-x-2">
//                 <span className="text-purple-400 mt-1">•</span>
//                 <span>Optimized PostgreSQL queries reducing response times by 70%</span>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </section> */}.
//       <section id="experience" className={`py-32 px-4 sm:px-6 ${bgSecondary}`}>
//         <div className="w-full max-w-4xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
//               Experience
//             </h2>
//             <p className={`${textTertiary} text-lg`}>
//               My professional journey, achievements, and impact
//             </p>
//           </div>

//           {/* Timeline Wrapper */}
//           <div className="relative border-l-4 border-purple-500 pl-8 ml-4 space-y-16">

//             {/* Creative Hustle – SmartBallot */}
//             <div className="relative">
//               <div className="absolute -left-[38px] top-1 w-6 h-6 rounded-full bg-purple-600 border-4 border-[#1a1f2e]"></div>
//               <div>
//                 <div className="text-sm font-medium text-green-400 mb-2">
//                   Sep 2025 – Oct 2025
//                 </div>
//                 <h3 className="text-2xl font-bold mb-4">Backend Developer — Creative Hustle</h3>

//                 <ul className={`space-y-3 ${textSecondary}`}>
//                   <li className="flex items-start space-x-2">
//                     <span className="text-purple-400 mt-1">•</span>
//                     <span>Contributed to <strong>SmartBallot</strong>, a cloud-based global election & polling platform using Node.js, TypeScript, Redis & MongoDB.</span>
//                   </li>

//                   <li className="flex items-start space-x-2">
//                     <span className="text-purple-400 mt-1">•</span>
//                     <span>Implemented cron-based background jobs handling automated result publishing & scheduled verifications.</span>
//                   </li>

//                   <li className="flex items-start space-x-2">
//                     <span className="text-purple-400 mt-1">•</span>
//                     <span>Designed modular services for authentication, data validation & configuration, improving backend maintainability by <strong>40%</strong>.</span>
//                   </li>

//                   <li className="flex items-start space-x-2">
//                     <span className="text-purple-400 mt-1">•</span>
//                     <span>Collaborated with a remote team ensuring secure & scalable API architecture ready for production deployment.</span>
//                   </li>
//                 </ul>
//               </div>
//             </div>

//             {/* Agile Infoways */}
//             <div className="relative">
//               <div className="absolute -left-[38px] top-1 w-6 h-6 rounded-full bg-purple-600 border-4 border-[#1a1f2e]"></div>
//               <div>
//                 <div className="text-sm font-medium text-green-400 mb-2">
//                   Jan 2024 – Mar 2025
//                 </div>
//                 <h3 className="text-2xl font-bold mb-4">Software Developer — Agile Infoways</h3>
//                 <ul className={`space-y-3 ${textSecondary}`}>
//                   <li className="flex items-start space-x-2">
//                     <span className="text-purple-400 mt-1">•</span>
//                     <span>Built & maintained high-performance REST APIs serving <strong>100K+ monthly requests</strong> using Node.js, TypeScript & PostgreSQL.</span>
//                   </li>

//                   <li className="flex items-start space-x-2">
//                     <span className="text-purple-400 mt-1">•</span>
//                     <span>Improved DB performance with indexes & optimized queries, achieving <strong>30–70% faster response times</strong>.</span>
//                   </li>

//                   <li className="flex items-start space-x-2">
//                     <span className="text-purple-400 mt-1">•</span>
//                     <span>Implemented CI/CD using GitHub Actions & Docker, reducing deployment time by <strong>40%</strong>.</span>
//                   </li>

//                   <li className="flex items-start space-x-2">
//                     <span className="text-purple-400 mt-1">•</span>
//                     <span>Worked in Agile (Jira), ensuring smooth sprint execution and timely project delivery.</span>
//                   </li>
//                 </ul>
//               </div>
//             </div>

//             {/* iSyncEvolution Pvt Ltd */}
//             <div className="relative">
//               <div className="absolute -left-[38px] top-1 w-6 h-6 rounded-full bg-purple-600 border-4 border-[#1a1f2e]"></div>
//               <div>
//                 <div className="text-sm font-medium text-green-400 mb-2">
//                   Jan 2022 – Nov 2023
//                 </div>
//                 <h3 className="text-2xl font-bold mb-4">Software Developer — iSyncEvolution Pvt Ltd</h3>

//                 <ul className={`space-y-3 ${textSecondary}`}>
//                   <li className="flex items-start space-x-2">
//                     <span className="text-purple-400 mt-1">•</span>
//                     <span>Developed scalable backend systems using Node.js, Express & MySQL (Sequelize ORM) powering multiple production applications.</span>
//                   </li>

//                   <li className="flex items-start space-x-2">
//                     <span className="text-purple-400 mt-1">•</span>
//                     <span>Implemented real-time communication using <strong>Socket.IO</strong> for chat & live updates.</span>
//                   </li>

//                   <li className="flex items-start space-x-2">
//                     <span className="text-purple-400 mt-1">•</span>
//                     <span>Integrated backend APIs with Angular/React teams and ensured smooth API compatibility.</span>
//                   </li>

//                   <li className="flex items-start space-x-2">
//                     <span className="text-purple-400 mt-1">•</span>
//                     <span>Reviewed code, improved architecture, and mentored junior developers to maintain clean scalable codebases.</span>
//                   </li>
//                 </ul>
//               </div>
//             </div>

//           </div>
//         </div>
//       </section>

//       <section id="projects" className="py-32 px-4 sm:px-6">
//         <div className="w-full mx-auto" style={{ maxWidth: '72rem' }}>
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Featured Projects</h2>
//             <p className={`${textTertiary} text-lg`}>Showcase of my best work and technical solutions</p>
//           </div>
//           {projects.length === 0 ? (
//             <div className="text-center py-16">
//               <div className={`inline-block p-8 rounded-xl ${cardBg} border ${borderColor}`}>
//                 <Code2 className={`w-16 h-16 mx-auto mb-4 ${textTertiary}`} />
//                 <p className={`${textTertiary} text-lg`}>No projects added yet.</p>
//                 {/* <p className={`${textTertiary} text-sm mt-2`}>POST http://localhost:5000/api/projects</p> */}
//               </div>
//             </div>
//           ) : (
//             <div className="grid md:grid-cols-2 gap-8">
//               {projects.map((project) => (
//                 <div key={project.id} className={`p-8 rounded-xl ${cardBg} border-2 ${borderColor} ${cardHover} transition-all group hover:shadow-2xl hover:shadow-purple-500/10`}>
//                   <div className="flex items-start justify-between mb-6">
//                     <h3 className="text-2xl font-bold group-hover:text-purple-400 transition-colors">{project.name}</h3>
//                     {project.link && (
//                       <a href={project.link} target="_blank" rel="noopener noreferrer" className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} hover:bg-purple-600 hover:text-white transition-all`}>
//                         <ExternalLink className="w-5 h-5" />
//                       </a>
//                     )}
//                   </div>
//                   <p className={`mb-6 ${textSecondary} text-base leading-relaxed`}>{project.description}</p>
//                   {project.stack && (
//                     <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-700">
//                       {project.stack.map((tech) => (
//                         <span key={tech} className={`text-xs px-4 py-2 rounded-full font-medium ${isDarkMode ? 'bg-gray-800 text-gray-300 border border-gray-700' : 'bg-gray-100 text-gray-700 border border-gray-300'}`}>{tech}</span>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </section>

//       <section id="blog" className={`py-32 px-4 sm:px-6 ${bgSecondary}`}>
//         <div className="w-full mx-auto" style={{ maxWidth: '72rem' }}>
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Latest Articles</h2>
//             <p className={`${textTertiary} text-lg`}>Thoughts on backend development and software engineering</p>
//           </div>
//           {blogPosts.length === 0 ? (
//             <div className="text-center py-16">
//               <div className={`inline-block p-8 rounded-xl ${cardBg} border ${borderColor}`}>
//                 <Code2 className={`w-16 h-16 mx-auto mb-4 ${textTertiary}`} />
//                 <p className={`${textTertiary} text-lg`}>No blog posts added yet.</p>
//                 {/* <p className={`${textTertiary} text-sm mt-2`}>POST http://localhost:5000/api/blogs</p> */}
//               </div>
//             </div>
//           ) : (
//             <div className="grid md:grid-cols-3 gap-8">
//               {blogPosts.map((post) => (
//                 <div key={post.id} className={`${cardBg} rounded-xl border-2 ${borderColor} ${cardHover} transition-all overflow-hidden group cursor-pointer hover:shadow-2xl hover:shadow-purple-500/10`}>
//                   <div className={`h-52 bg-gradient-to-br from-purple-900/30 to-pink-900/30 flex items-center justify-center border-b-2 ${borderColor} group-hover:from-purple-800/40 group-hover:to-pink-800/40 transition-all`}>
//                     <Code2 className="w-20 h-20 text-purple-400 opacity-50 group-hover:opacity-70 group-hover:scale-110 transition-all" />
//                   </div>
//                   <div className="p-6">
//                     <div className={`flex items-center justify-between text-sm ${textTertiary} mb-3`}>
//                       <div className="flex items-center space-x-1">
//                         <Calendar className="w-4 h-4" />
//                         <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
//                       </div>
//                       <div className="flex items-center space-x-1">
//                         <Clock className="w-4 h-4" />
//                         <span>{post.readTime} min</span>
//                       </div>
//                     </div>
//                     <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors line-clamp-2">{post.title}</h3>
//                     <p className={`${textTertiary} mb-4 line-clamp-3 text-sm leading-relaxed`}>{post.excerpt}</p>
//                     {post.tags && (
//                       <div className="flex flex-wrap gap-2">
//                         {post.tags.map((tag) => (
//                           <span key={tag} className={`text-xs px-2 py-1 rounded ${isDarkMode ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-100 text-purple-700'}`}>{tag}</span>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </section>
//       {/* <!-- Services Section --> */}
//     <section id="services" className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
//         <div className="container mx-auto px-6">
//             <h2 className="text-4xl font-bold text-center mb-4 text-white">Services</h2>
//             <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">Comprehensive web solutions tailored to your needs</p>
            
//             <div className="grid md:grid-cols-3 gap-8">
//                 <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
//                     <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
//                         <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
//                         </svg>
//                     </div>
//                     <h3 className="text-2xl font-bold text-white mb-3">Web Development</h3>
//                     <p className="text-gray-300 mb-4">Custom websites and web applications built with modern technologies and best practices.</p>
//                     <ul className="text-gray-400 space-y-2">
//                         <li>• Responsive Design</li>
//                         <li>• React & Next.js</li>
//                         <li>• Performance Optimization</li>
//                     </ul>
//                 </div>

//                 <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
//                     <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4">
//                         <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
//                         </svg>
//                     </div>
//                     <h3 className="text-2xl font-bold text-white mb-3">UI/UX Design</h3>
//                     <p className="text-gray-300 mb-4">Beautiful, intuitive interfaces that provide exceptional user experiences.</p>
//                     <ul className="text-gray-400 space-y-2">
//                         <li>• Modern Aesthetics</li>
//                         <li>• User-Centered Design</li>
//                         <li>• Interactive Prototypes</li>
//                     </ul>
//                 </div>

//                 <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
//                     <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center mb-4">
//                         <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
//                         </svg>
//                     </div>
//                     <h3 className="text-2xl font-bold text-white mb-3">Performance & SEO</h3>
//                     <p className="text-gray-300 mb-4">Optimize your website for speed, search engines, and conversions.</p>
//                     <ul className="text-gray-400 space-y-2">
//                         <li>• Speed Optimization</li>
//                         <li>• SEO Best Practices</li>
//                         <li>• Analytics Integration</li>
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     </section>

//     {/* <!-- Testimonials Section --> */}
//     <section id="testimonials" className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
//         <div className="container mx-auto px-6">
//             <h2 className="text-4xl font-bold text-center mb-4 text-white">What Clients Say</h2>
//             <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">Don't just take my word for it</p>
            
//             <div className="grid md:grid-cols-3 gap-8">
//                 <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
//                     <div className="flex items-center mb-4">
//                         <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">S</div>
//                         <div className="ml-4">
//                             <h4 className="text-white font-bold">Sarah Johnson</h4>
//                             <p className="text-gray-400 text-sm">CEO, TechStart Inc.</p>
//                         </div>
//                     </div>
//                     <div className="flex mb-3">
//                         <span className="text-yellow-400">★★★★★</span>
//                     </div>
//                     <p className="text-gray-300 italic">"Exceptional work! The website exceeded our expectations. Professional, responsive, and delivered on time. Highly recommend!"</p>
//                 </div>

//                 <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
//                     <div className="flex items-center mb-4">
//                         <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xl">M</div>
//                         <div className="ml-4">
//                             <h4 className="text-white font-bold">Michael Chen</h4>
//                             <p className="text-gray-400 text-sm">Founder, Creative Studios</p>
//                         </div>
//                     </div>
//                     <div className="flex mb-3">
//                         <span className="text-yellow-400">★★★★★</span>
//                     </div>
//                     <p className="text-gray-300 italic">"Amazing attention to detail and creative solutions. Our new site has significantly improved user engagement and conversions!"</p>
//                 </div>

//                 <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
//                     <div className="flex items-center mb-4">
//                         <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl">E</div>
//                         <div className="ml-4">
//                             <h4 className="text-white font-bold">Emily Rodriguez</h4>
//                             <p className="text-gray-400 text-sm">Marketing Director</p>
//                         </div>
//                     </div>
//                     <div className="flex mb-3">
//                         <span className="text-yellow-400">★★★★★</span>
//                     </div>
//                     <p className="text-gray-300 italic">"Working with Miraj was a pleasure. Great communication, innovative ideas, and a final product that perfectly captured our brand."</p>
//                 </div>
//             </div>
//         </div>
//     </section>

//       <section id="contact" className={`py-32 px-4 sm:px-6 ${bgSecondary}`}>
//         <div className="w-full mx-auto text-center" style={{ maxWidth: '56rem' }}>
//           <div className="mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Get In Touch</h2>
//             <p className={`text-xl ${textSecondary}`}>I'm always open to discussing new projects and opportunities.</p>
//           </div>
//           <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
//             <a href="mailto:shivammakwana.01@gmail.com" className="flex items-center justify-center space-x-2 px-8 py-4 rounded-lg font-medium bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
//               <Mail className="w-5 h-5" />
//               <span>Email Me</span>
//             </a>
//             <a href="https://www.linkedin.com/in/makwana-shivam11/" target="_blank" rel="noopener noreferrer" className={`flex items-center justify-center space-x-2 px-8 py-4 rounded-lg font-medium ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700' : 'bg-gray-100 hover:bg-gray-200 border border-gray-300'}`}>
//               <Linkedin className="w-5 h-5" />
//               <span>LinkedIn</span>
//             </a>
//             <a href="https://github.com/iam-shivam" target="_blank" rel="noopener noreferrer" className={`flex items-center justify-center space-x-2 px-8 py-4 rounded-lg font-medium ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700' : 'bg-gray-100 hover:bg-gray-200 border border-gray-300'}`}>
//               <Github className="w-5 h-5" />
//               <span>GitHub</span>
//             </a>
//           </div>
//           <div className={`p-8 rounded-xl ${cardBg} border ${borderColor}`}>
//             <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
//             <form onSubmit={handleContactSubmit} className="space-y-4">
//               <input name="name" type="text" placeholder="Your Name" required className={`w-full px-4 py-3 rounded-lg ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'} border focus:border-purple-500 focus:outline-none`} />
//               <input name="email" type="email" placeholder="Your Email" required className={`w-full px-4 py-3 rounded-lg ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'} border focus:border-purple-500 focus:outline-none`} />
//               <textarea name="message" rows={5} placeholder="Your Message" required className={`w-full px-4 py-3 rounded-lg ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'} border focus:border-purple-500 focus:outline-none`}></textarea>
//               <button type="submit" className="w-full px-8 py-4 rounded-lg font-medium bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
//                 Send Message
//               </button>
//             </form>
//           </div>
//         </div>
//       </section>

//       <footer className={`py-8 px-4 sm:px-6 border-t ${borderColor}`}>
//         <div className="w-full mx-auto text-center" style={{ maxWidth: '72rem' }}>
//           <p className={textTertiary}>© 2025 Dev-Shivam. Built with React & Node.js</p>
//         </div>
//       </footer>
//     </div>
//   );
// }

// import { useState, useEffect } from 'react';

// // Import all components
// import Header from './components/Header';
// import Hero from './components/Hero';
// import About from './components/About';
// import Skills from './components/Skills';
// import Experience from './components/Experience';
// import Projects from './components/Projects';
// import Blog from './components/Blog';
// import Services from './components/Services';
// import Footer from './components/Footer';
// import Testimonials from './components/Testimonials';
// import Contact from './components/Contact';

// // Types
// interface Skill {
//   id: string;
//   name: string;
//   level: number;
// }

// interface SkillsData {
//   backend: Skill[];
//   database: Skill[];
//   frontend: Skill[];
//   other: Skill[];
// }

// interface Project {
//   id: string;
//   name: string;
//   description: string;
//   link?: string;
//   stack?: string[];
// }

// interface BlogPost {
//   id: string;
//   title: string;
//   excerpt: string;
//   publishedAt: string;
//   readTime: number;
//   tags?: string[];
// }

// // API Helper
// const api = {
//   getBlogs: async () => {
//     const res = await fetch(`${import.meta.env.VITE_API_URL}/blogs?published=true`);
//     if (!res.ok) throw new Error('Failed to fetch blogs');
//     return res.json();
//   },
//   getProjects: async () => {
//     const res = await fetch(`${import.meta.env.VITE_API_URL}/projects?featured=true`);
//     if (!res.ok) throw new Error('Failed to fetch projects');
//     return res.json();
//   },
//   getSkills: async () => {
//     const res = await fetch(`${import.meta.env.VITE_API_URL}/skills/by-category`);
//     if (!res.ok) throw new Error('Failed to fetch skills');
//     return res.json();
//   },
//   submitContact: async (data: { name: string; email: string; message: string }) => {
//     const res = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data),
//     });
//     if (!res.ok) throw new Error('Failed to submit');
//     return res.json();
//   },
// };

// export default function Portfolio() {
//   const [activeSection, setActiveSection] = useState('home');
//   const [isDarkMode, setIsDarkMode] = useState(true);
//   const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [skills, setSkills] = useState<SkillsData>({ 
//     backend: [], 
//     database: [], 
//     frontend: [], 
//     other: [] 
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch data on mount
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const [blogs, projs, skls] = await Promise.all([
//           api.getBlogs(),
//           api.getProjects(),
//           api.getSkills(),
//         ]);
//         setBlogPosts(blogs);
//         setProjects(projs);
//         setSkills(skls);
//         setLoading(false);
//       } catch (err: any) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   // Track active section on scroll
//   useEffect(() => {
//     const handleScroll = () => {
//       const sections = ['home', 'about', 'skills', 'experience', 'projects', 'blog', 'services', 'testimonials', 'contact'];
//       const scrollPosition = window.scrollY + 100;
      
//       for (const section of sections) {
//         const element = document.getElementById(section);
//         if (element) {
//           const { offsetTop, offsetHeight } = element;
//           if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
//             setActiveSection(section);
//             break;
//           }
//         }
//       }
//     };
    
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const scrollToSection = (id: string) => {
//     const element = document.getElementById(id);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   const toggleTheme = () => setIsDarkMode(!isDarkMode);

//   const bgPrimary = isDarkMode ? 'bg-[#1a1f2e]' : 'bg-white';
//   const textPrimary = isDarkMode ? 'text-gray-100' : 'text-gray-900';
//   const textSecondary = isDarkMode ? 'text-gray-300' : 'text-gray-700';

//   // Loading state
//   if (loading) {
//     return (
//       <div className={`min-h-screen w-full flex items-center justify-center ${bgPrimary}`}>
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mb-4"></div>
//           <p className={`text-xl ${textSecondary}`}>Loading portfolio...</p>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className={`min-h-screen w-full flex items-center justify-center ${bgPrimary} px-6`}>
//         <div className="text-center max-w-md">
//           <div className="text-red-500 text-6xl mb-4">⚠️</div>
//           <h2 className={`text-2xl font-bold mb-2 ${textPrimary}`}>Failed to Load</h2>
//           <p className={`${textSecondary} mb-4`}>{error}</p>
//           <button 
//             onClick={() => window.location.reload()} 
//             className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={`min-h-screen w-screen overflow-x-hidden ${bgPrimary} ${textPrimary} transition-colors duration-300`}>
//       <Header 
//         isDarkMode={isDarkMode}
//         toggleTheme={toggleTheme}
//         activeSection={activeSection}
//         scrollToSection={scrollToSection}
//       />
      
//       <Hero 
//         isDarkMode={isDarkMode}
//         scrollToSection={scrollToSection}
//       />
      
//       <About isDarkMode={isDarkMode} />
      
//       <Skills 
//         skills={skills}
//         isDarkMode={isDarkMode}
//       />
      
//       <Experience isDarkMode={isDarkMode} />
      
//       <Projects 
//         projects={projects}
//         isDarkMode={isDarkMode}
//       />
      
//       <Blog 
//         blogPosts={blogPosts}
//         isDarkMode={isDarkMode}
//       />
      
//       <Services />
      
//       <Testimonials />
      
//       <Contact 
//         isDarkMode={isDarkMode}
//         submitContact={api.submitContact}
//       />
      
//       <Footer isDarkMode={isDarkMode} />
//     </div>
//   );
// }

import { useState, useEffect } from 'react';

// Import all components
import Header from './components/Header';
import Hero from './components/Hero';
import ShowcaseAnimation from './components/ShowcaseAnimation';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Blog from './components/Blog';
// import Services from './components/Services';
// import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GlowBackground from './components/background/GlowBackground';

// Types
interface Skill {
  id: string;
  name: string;
  level: number;
}

interface SkillsData {
  backend: Skill[];
  database: Skill[];
  frontend: Skill[];
  other: Skill[];
}

interface Project {
  id: string;
  name: string;
  description: string;
  link?: string;
  stack?: string[];
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readTime: number;
  tags?: string[];
}

// API Helper
const api = {
  getBlogs: async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/blogs?published=true`);
    if (!res.ok) throw new Error('Failed to fetch blogs');
    return res.json();
  },
  getProjects: async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/projects?featured=true`);
    if (!res.ok) throw new Error('Failed to fetch projects');
    return res.json();
  },
  getSkills: async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/skills/by-category`);
    if (!res.ok) throw new Error('Failed to fetch skills');
    return res.json();
  },
  submitContact: async (data: { name: string; email: string; message: string }) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to submit');
    return res.json();
  },
};

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<SkillsData>({ 
    backend: [], 
    database: [], 
    frontend: [], 
    other: [] 
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [blogs, projs, skls] = await Promise.all([
          api.getBlogs(),
          api.getProjects(),
          api.getSkills(),
        ]);
        setBlogPosts(blogs);
        setProjects(projs);
        setSkills(skls);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      // const sections = ['home', 'about', 'skills', 'experience', 'projects', 'blog', 'services', 'testimonials', 'contact'];
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'blog', 'contact'];
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const bgPrimary = isDarkMode ? 'bg-[#1a1f2e]' : 'bg-white';
  const textPrimary = isDarkMode ? 'text-gray-100' : 'text-gray-900';
  const textSecondary = isDarkMode ? 'text-gray-300' : 'text-gray-700';

  // Loading state
  if (loading) {
    return (
      <div className={`min-h-screen w-full flex items-center justify-center ${bgPrimary}`}>
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mb-4"></div>
          <p className={`text-xl ${textSecondary}`}>Loading portfolio...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`min-h-screen w-full flex items-center justify-center ${bgPrimary} px-6`}>
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className={`text-2xl font-bold mb-2 ${textPrimary}`}>Failed to Load</h2>
          <p className={`${textSecondary} mb-4`}>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen w-screen overflow-x-hidden ${bgPrimary} ${textPrimary} transition-colors duration-300`}>
      <GlowBackground />
      <Header 
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />
      
      <Hero 
        isDarkMode={isDarkMode}
        scrollToSection={scrollToSection}
      />
      
      {/* NEW: Animated Showcase Section */}
      <ShowcaseAnimation />
      
      <About isDarkMode={isDarkMode} />
      
      <Skills 
        skills={skills}
        isDarkMode={isDarkMode}
      />
      
      <Experience isDarkMode={isDarkMode} />
      
      <Projects 
        projects={projects}
        isDarkMode={isDarkMode}
      />
      
      <Blog 
        blogPosts={blogPosts}
        isDarkMode={isDarkMode}
      />
      
      {/* <Services /> */}
      
      {/* <Testimonials /> */}
      
      <Contact 
        isDarkMode={isDarkMode}
        submitContact={api.submitContact}
      />
      
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}