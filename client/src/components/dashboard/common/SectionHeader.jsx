export default function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-xl font-bold text-white">{title}</h2>

        {subtitle && <p className="mt-1 text-sm text-slate-400">{subtitle}</p>}
      </div>

      {action}
    </div>
  );
}
