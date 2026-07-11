import BudgetCard from "./BudgetCard";

export default function BudgetList({ budgets, onEdit, onDelete }) {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {budgets.map((budget) => (
        <BudgetCard
          key={budget._id}
          budget={budget}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
