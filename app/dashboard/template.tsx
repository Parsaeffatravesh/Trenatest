export default function DashboardTemplate({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="animate-page-in"
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </div>
  );
}
