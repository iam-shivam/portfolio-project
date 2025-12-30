export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart Inc.",
      initial: "S",
      gradient: "from-blue-500 to-indigo-600",
      rating: 5,
      text: "Exceptional work! The website exceeded our expectations. Professional, responsive, and delivered on time. Highly recommend!"
    },
    {
      name: "Michael Chen",
      role: "Founder, Creative Studios",
      initial: "M",
      gradient: "from-green-500 to-emerald-600",
      rating: 5,
      text: "Amazing attention to detail and creative solutions. Our new site has significantly improved user engagement and conversions!"
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director",
      initial: "E",
      gradient: "from-pink-500 to-rose-600",
      rating: 5,
      text: "Working with Miraj was a pleasure. Great communication, innovative ideas, and a final product that perfectly captured our brand."
    }
  ];

  return (
    <section id="testimonials" className="py-32 px-4 sm:px-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 50%, #db2777 100%)' }}>
      <div className="w-full mx-auto relative z-10" style={{ maxWidth: '72rem' }}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            What Clients Say
          </h2>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto">
            Don't just take my word for it
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-sm p-8 rounded-2xl border border-purple-400/30 hover:border-purple-300/50 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center mb-6">
                <div className={`w-12 h-12 bg-gradient-to-br ${testimonial.gradient} rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                  {testimonial.initial}
                </div>
                <div className="ml-4">
                  <h4 className="text-white font-bold text-lg">{testimonial.name}</h4>
                  <p className="text-gray-300 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                <span className="text-yellow-400 text-lg">
                  {'★'.repeat(testimonial.rating)}
                </span>
              </div>
              <p className="text-gray-200 italic leading-relaxed">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}