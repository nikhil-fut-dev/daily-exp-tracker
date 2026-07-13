import {
  Target,
  Laptop,
  Car,
  Home,
  Plane,
  Wallet,
  Gift,
  PiggyBank,
} from "lucide-react";

export default function GoalProgress({ dashboard }) {
  const iconMap = {
    Target,
    Laptop,
    Car,
    Home,
    Plane,
    Wallet,
    Gift,
    PiggyBank,
  };

  return (
    <div className="col-span-12 xl:col-span-4 rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Your Goals</h2>
      </div>

      <div className="space-y-6">
        {dashboard.goals.slice(0, 4).map((goal) => {
          const progress = Math.min(
            (Number(goal.savedAmount) / Number(goal.targetAmount)) * 100,
            100,
          );

          const Icon = iconMap[goal.icon] || Target;

          return (
            <div key={goal._id}>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-2xl"
                    style={{
                      backgroundColor: `${goal.color}25`,
                    }}
                  >
                    <Icon
                      size={20}
                      style={{
                        color: goal.color,
                      }}
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold text-white">{goal.title}</h3>

                    <p className="text-xs text-slate-500">Goal Progress</p>
                  </div>
                </div>

                <span
                  className="font-bold"
                  style={{
                    color: goal.color,
                  }}
                >
                  {progress.toFixed(0)}%
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: goal.color,
                  }}
                />
              </div>

              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  ₹{Number(goal.savedAmount).toLocaleString()} / ₹
                  {Number(goal.targetAmount).toLocaleString()}
                </span>

                <span className="text-slate-500">
                  {goal.deadline
                    ? new Date(goal.deadline).toLocaleDateString("en-IN")
                    : "No Deadline"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
