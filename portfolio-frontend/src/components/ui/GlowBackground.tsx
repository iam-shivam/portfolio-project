export default function GlowBackground() {
  return (
    <>
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse [animation-delay:2s]" />
    </>
  );
}
