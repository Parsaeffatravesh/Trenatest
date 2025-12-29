export default function DashboardLoading() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 w-48 bg-white/5 rounded-lg" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-white/5 rounded-2xl" />
        ))}
      </div>
      <div className="h-64 bg-white/5 rounded-2xl" />
    </div>
  );
}
