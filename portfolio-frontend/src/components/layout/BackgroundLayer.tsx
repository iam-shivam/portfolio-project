import AnimatedBackground from "../ui/AnimatedBackground";

export default function BackgroundLayer() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <AnimatedBackground particleCount={80} opacity={0.35} />
    </div>
  );
}
