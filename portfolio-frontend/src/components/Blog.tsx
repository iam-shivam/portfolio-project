import { Calendar, Clock, Code2 } from 'lucide-react';
import ParticleBackground from './ui/ParticleBackground';
// import ParticleBackground from './ui/ParticleBackground';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readTime: number;
  tags?: string[];
}

interface BlogProps {
  blogPosts: BlogPost[];
  isDarkMode: boolean;
}

export default function Blog({ blogPosts }: BlogProps) {
  return (
    <section id="blog" className="py-32 px-4 sm:px-6 relative overflow-hidden">
      <ParticleBackground
        particleCount={40}
        opacity={0.25}
        connectionDistance={120}
      />
      {/* Glassmorphism Background */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-blue-900/20"></div>
      <div className="absolute inset-0 backdrop-blur-3xl"></div> */}

      <div className="w-full mx-auto relative z-10" style={{ maxWidth: '72rem' }}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Latest Articles
          </h2>
          <p className="text-gray-300 text-lg">
            Thoughts on backend development and software engineering
          </p>
        </div>

        {blogPosts.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 inline-block">
              <Code2 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-300 text-lg">No blog posts added yet.</p>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 overflow-hidden group cursor-pointer hover:scale-105"
              >
                {/* Blog header with gradient */}
                <div className="h-52 bg-gradient-to-br from-purple-600/40 via-pink-600/40 to-blue-600/40 flex items-center justify-center border-b border-white/20 group-hover:from-purple-500/50 group-hover:via-pink-500/50 group-hover:to-blue-500/50 transition-all relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Code2 className="w-20 h-20 text-white opacity-50 group-hover:opacity-70 group-hover:scale-110 transition-all relative z-10" />
                </div>

                <div className="p-6">
                  {/* Date and Read Time */}
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime} min</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-400 mb-4 line-clamp-3 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  {post.tags && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}