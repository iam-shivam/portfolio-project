import ParticleBackground from './ParticleBackground';
import GlowBackground from './GlowBackground';

interface AnimatedBackgroundProps {
  particleCount?: number;
  opacity?: number;
}

export default function AnimatedBackground({
  particleCount = 50,
  opacity = 0.3,
}: AnimatedBackgroundProps) {
  return (
    <>
      <GlowBackground />
      <ParticleBackground
        particleCount={particleCount}
        opacity={opacity}
        scrollStrength={0.2}
      />
    </>
  );
}
