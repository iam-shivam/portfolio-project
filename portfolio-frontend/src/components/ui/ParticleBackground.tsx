import { useEffect, useRef } from 'react';

interface ParticleBackgroundProps {
  particleCount?: number;
  opacity?: number;
  connectionDistance?: number;
  scrollStrength?: number; // 👈 NEW
}

export default function ParticleBackground({
  particleCount = 50,
  opacity = 0.3,
  connectionDistance = 150,
  scrollStrength = 0.15,
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollYRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();

    const colors = ['#8B5CF6', '#EC4899', '#3B82F6', '#10B981'];

    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const onScroll = () => {
      scrollYRef.current = window.scrollY;
    };

    let animationId: number;

    const animate = () => {
      ctx.fillStyle = 'rgba(26, 31, 46, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(139,92,246,${1 - dist / connectionDistance})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Particles (scroll-synced Y)
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy + scrollYRef.current * scrollStrength * 0.001;

        if (p.x <= 0 || p.x >= canvas.width) p.vx *= -1;
        if (p.y <= 0 || p.y >= canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
    };
  }, [particleCount, connectionDistance, scrollStrength]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity }}
    />
  );
}
