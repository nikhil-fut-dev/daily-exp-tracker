import BillCard from "./BillCard";

export default function BillList({ bills, onEdit, onDelete }) {
  if (bills.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-700 py-20 text-center">
        <h2 className="text-2xl font-semibold text-white">No Bills Found</h2>

        <p className="mt-3 text-slate-400">
          Click "Add Bill" to create your first bill.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {bills.map((bill) => (
        <BillCard
          key={bill._id}
          bill={bill}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
