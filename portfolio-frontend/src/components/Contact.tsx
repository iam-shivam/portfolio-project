import { Mail, Linkedin, Github } from 'lucide-react';
import type { FormEvent } from 'react';
import ParticleBackground from './ui/ParticleBackground';

interface ContactProps {
  isDarkMode: boolean;
  submitContact: (data: { name: string; email: string; message: string }) => Promise<any>;
}

export default function Contact({ submitContact }: ContactProps) {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    try {
      await submitContact(data);
      alert('✅ Message sent successfully!');
      form.reset();
    } catch (err) {
      alert('❌ Failed to send message');
    }
  };

  return (
    <section id="contact" className="py-32 px-4 sm:px-6 relative overflow-hidden bg-[#1a1f2e]">
      {/* Animated background */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <ParticleBackground
        particleCount={40}
        opacity={0.25}
        connectionDistance={120}
      />


      <div className="w-full mx-auto text-center relative z-10" style={{ maxWidth: '56rem' }}>
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-300">
            I'm always open to discussing new projects and opportunities.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
          <a
            href="mailto:shivammakwana.01@gmail.com"
            className="group flex items-center justify-center space-x-2 px-8 py-4 rounded-lg font-medium bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all shadow-lg shadow-purple-500/50 hover:scale-105"
          >
            <Mail className="w-5 h-5" />
            <span>Email Me</span>
          </a>
          <a
            href="https://www.linkedin.com/in/makwana-shivam11/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center space-x-2 px-8 py-4 rounded-lg font-medium bg-white/10 border border-white/20 hover:bg-white/20 text-white transition-all hover:scale-105"
          >
            <Linkedin className="w-5 h-5" />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://github.com/iam-shivam"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center space-x-2 px-8 py-4 rounded-lg font-medium bg-white/10 border border-white/20 hover:bg-white/20 text-white transition-all hover:scale-105"
          >
            <Github className="w-5 h-5" />
            <span>GitHub</span>
          </a>
        </div>

        <div className="group bg-gradient-to-br from-purple-900/30 to-indigo-900/30 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 rounded-2xl transition-all duration-300"></div>

          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-6 text-white">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                type="text"
                placeholder="Your Name"
                required
                className="w-full px-4 py-3 rounded-lg bg-white/5 text-white border border-purple-500/20 focus:border-purple-500 focus:outline-none placeholder-gray-400 transition-all"
              />
              <input
                name="email"
                type="email"
                placeholder="Your Email"
                required
                className="w-full px-4 py-3 rounded-lg bg-white/5 text-white border border-purple-500/20 focus:border-purple-500 focus:outline-none placeholder-gray-400 transition-all"
              />
              <textarea
                name="message"
                rows={5}
                placeholder="Your Message"
                required
                className="w-full px-4 py-3 rounded-lg bg-white/5 text-white border border-purple-500/20 focus:border-purple-500 focus:outline-none placeholder-gray-400 transition-all"
              ></textarea>
              <button
                type="submit"
                className="w-full px-8 py-4 rounded-lg font-medium bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all shadow-lg shadow-purple-500/50 hover:scale-[1.02]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}