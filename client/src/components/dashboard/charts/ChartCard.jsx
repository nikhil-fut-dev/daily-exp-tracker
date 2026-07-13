export default function ChartCard({ title, children }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-6 shadow-xl h-full">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
      </div>

      {children}
    </div>
  );
}
