import {
  TrendingUp,
  TrendingDown,
  Target,
  Wallet,
  Receipt,
} from "lucide-react";

export default function TimelineItem({ item }) {
  const config = {
    income: {
      icon: <TrendingUp size={18} />,
      color: "bg-green-500/20 text-green-400",
    },

    expense: {
      icon: <TrendingDown size={18} />,
      color: "bg-red-500/20 text-red-400",
    },

    goal: {
      icon: <Target size={18} />,
      color: "bg-indigo-500/20 text-indigo-400",
    },

    budget: {
      icon: <Wallet size={18} />,
      color: "bg-cyan-500/20 text-cyan-400",
    },

    bill: {
      icon: <Receipt size={18} />,
      color: "bg-yellow-500/20 text-yellow-400",
    },
  };

  const current = config[item.type];

  return (
    <div className="flex gap-4">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-full ${current.color}`}
      >
        {current.icon}
      </div>

      <div className="flex-1 border-b border-slate-800 pb-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-white">{item.title}</h4>

          <span className="text-xs text-slate-500">
            {new Date(item.date).toLocaleDateString()}
          </span>
        </div>

        <p className="mt-1 text-sm text-slate-400">{item.message}</p>
      </div>
    </div>
  );
}
