export default function Services() {
  const services = [
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
        </svg>
      ),
      title: "Backend Development",
      description: "Scalable APIs and server-side applications built with Node.js, TypeScript, and modern frameworks.",
      features: ["RESTful & GraphQL APIs", "Microservices Architecture", "Database Optimization"],
      gradient: "from-blue-500 to-purple-600"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path>
        </svg>
      ),
      title: "Database Design",
      description: "Efficient database schemas and optimization for PostgreSQL, MongoDB, and Redis.",
      features: ["Schema Design", "Query Optimization", "Data Migration"],
      gradient: "from-purple-500 to-pink-600"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
      ),
      title: "Performance & DevOps",
      description: "Optimize application performance and implement CI/CD pipelines for seamless deployment.",
      features: ["Performance Tuning", "Docker & Kubernetes", "CI/CD Automation"],
      gradient: "from-green-500 to-teal-600"
    }
  ];

  return (
    <section id="services" className="py-32 px-4 sm:px-6 relative overflow-hidden">
      {/* Glassmorphism Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-purple-900/20 to-gray-900/20"></div>
      <div className="absolute inset-0 backdrop-blur-3xl"></div>
      
      <div className="w-full mx-auto relative z-10" style={{ maxWidth: '72rem' }}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Services</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Comprehensive backend solutions tailored to your needs
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-4`}>
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-gray-300 mb-4">{service.description}</p>
              <ul className="text-gray-400 space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx}>• {feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}