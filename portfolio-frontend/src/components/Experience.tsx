import ParticleBackground from "./ui/ParticleBackground";
import { cubicBezier, motion, useInView, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";

interface ExperienceProps {
  isDarkMode: boolean;
}

/* ✅ Type-safe animation variants */
const slideVariants: Variants = {
  hidden: (direction: "left" | "right") => ({
    opacity: 0,
    x: direction === "left" ? -80 : 80,
    y: 20
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.6,
      ease: cubicBezier(0.16, 1, 0.3, 1) // ✅ PERFECT
    }
  }
};


export default function Experience({}: ExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  /* 🔥 Scroll progress for glowing line */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const glowHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 1, 1]);

  const experiences = [
    {
      period: "Sep 2025 – Oct 2025",
      title: "Backend Developer",
      company: "Creative Hustle",
      achievements: [
        "Contributed to SmartBallot, a cloud-based global election & polling platform using Node.js, TypeScript, Redis & MongoDB.",
        "Implemented cron-based background jobs handling automated result publishing & scheduled verifications.",
        "Designed modular services for authentication, data validation & configuration, improving backend maintainability by 40%.",
        "Collaborated with a remote team ensuring secure & scalable API architecture ready for production deployment."
      ]
    },
    {
      period: "Jan 2024 – Mar 2025",
      title: "Software Developer",
      company: "Agile Infoways",
      achievements: [
        "Built & maintained high-performance REST APIs serving 100K+ monthly requests using Node.js, TypeScript & PostgreSQL.",
        "Improved DB performance with indexes & optimized queries, achieving 30–70% faster response times.",
        "Implemented CI/CD using GitHub Actions & Docker, reducing deployment time by 40%.",
        "Worked in Agile (Jira), ensuring smooth sprint execution and timely project delivery."
      ]
    },
    {
      period: "Jan 2022 – Nov 2023",
      title: "Software Developer",
      company: "iSyncEvolution Pvt Ltd",
      achievements: [
        "Developed scalable backend systems using Node.js, Express & MySQL (Sequelize ORM).",
        "Implemented real-time communication using Socket.IO.",
        "Integrated backend APIs with Angular/React teams.",
        "Reviewed code & mentored junior developers."
      ]
    }
  ];

  return (
    <section
      id="experience"
      className="relative overflow-hidden py-32 px-4 sm:px-6"
      ref={containerRef}
    >
      <ParticleBackground particleCount={40} opacity={0.25} connectionDistance={120} />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Experience
          </h2>
          <p className="text-gray-300 text-lg">
            My professional journey & impact
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Base line */}
          <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-white/10" />

          {/* 🔥 Glowing progress line */}
          <motion.div
            style={{ height: glowHeight, opacity: glowOpacity }}
            className="absolute left-4 top-0 w-[2px]
                       bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500
                       shadow-[0_0_20px_rgba(168,85,247,0.7)]"
          />

          <div className="space-y-20">
            {experiences.map((exp, index) => {
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: "-120px" });
              const direction = index % 2 === 0 ? "left" : "right";

              return (
                <motion.div
                  ref={ref}
                  key={index}
                  custom={direction}
                  variants={slideVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  className="relative pl-12"
                >
                  {/* Dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ duration: 0.4 }}
                    className="absolute left-0 top-3 w-8 h-8 rounded-full
                               bg-gradient-to-br from-purple-500 to-pink-600
                               border-4 border-[#1a1f2e]
                               shadow-lg shadow-purple-500/50"
                  />

                  {/* Card */}
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="bg-white/10 backdrop-blur-xl
                               border border-white/20
                               rounded-2xl p-6 md:p-8
                               hover:shadow-purple-500/30
                               transition-all duration-300"
                  >
                    <span className="inline-block mb-3 px-4 py-1 text-sm
                                     rounded-full bg-emerald-500/20
                                     border border-emerald-500/30
                                     text-emerald-400">
                      {exp.period}
                    </span>

                    <h3 className="text-2xl font-bold text-white">
                      {exp.title}
                    </h3>
                    <p className="text-purple-400 mb-4">{exp.company}</p>

                    <ul className="space-y-3">
                      {exp.achievements.map((a, i) => (
                        <li key={i} className="flex gap-3 text-gray-300">
                          <span className="text-purple-400">•</span>
                          {a}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
