import GoalCard from "./GoalCard";

export default function GoalList(props) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {props.goals.map((goal) => (
        <GoalCard
          key={goal._id}
          goal={goal}
          onEdit={props.onEdit}
          onDelete={props.onDelete}
          onSaving={props.onSaving}
        />
      ))}
    </div>
  );
}
