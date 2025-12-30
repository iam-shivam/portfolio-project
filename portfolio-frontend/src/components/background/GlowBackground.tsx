import { useEffect, useRef } from 'react';

export default function GlowBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 80 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      speed: Math.random() * 0.3 + 0.1,
    }));

    let scrollY = window.scrollY;

    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', onScroll);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.y -= p.speed;
        if (p.y < 0) p.y = canvas.height;

        // 🔥 scroll influence
        const offset = (scrollY * 0.05) % canvas.height;

        ctx.beginPath();
        ctx.arc(p.x, p.y + offset, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(168, 85, 247, 0.35)'; // purple glow
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
}
