export function BackgroundFog() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-50 overflow-hidden bg-[#04080e] transform-gpu">
      {/* Yellow/Gold Ambient Glow */}
      <div className="absolute -top-[200px] -left-[200px] w-[700px] h-[700px] bg-[radial-gradient(circle_at_center,_rgba(212,166,60,0.12)_0%,_rgba(212,166,60,0)_70%)] pointer-events-none" />

      {/* Midnight/Deep Blue Glow */}
      <div className="absolute top-[30%] -right-[200px] w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_rgba(37,99,235,0.08)_0%,_rgba(37,99,235,0)_70%)] pointer-events-none" />

      {/* Center Emerald ambient glow */}
      <div className="absolute top-[60%] -left-[200px] w-[750px] h-[750px] bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.06)_0%,_rgba(16,185,129,0)_70%)] pointer-events-none" />

      {/* Subtle top subtle light beam */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,_rgba(226,183,103,0.07)_0%,_transparent_70%)] pointer-events-none" />
    </div>
  );
}
