import { X, CheckCheck, Trash2 } from "lucide-react";
import { useEffect } from "react";

export default function NotificationDrawer({
  open,
  onClose,
  notifications = [],
  loading,
  onMarkAllRead,
  onDelete,
}) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.touchAction = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm touch-none"
        />
      )}

      {/* Drawer */}
      <aside
        aria-hidden={!open}
        className={`fixed top-0 right-0 z-50 flex h-screen w-full max-w-md flex-col border-l border-slate-800 bg-slate-950 shadow-2xl transition-all duration-300 ease-in-out ${
          open
            ? "translate-x-0 opacity-100 pointer-events-auto"
            : "translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 p-6">
          <h2 className="text-xl font-bold text-white">Notifications</h2>

          <button
            onClick={onClose}
            className="rounded-xl bg-slate-800 p-2 hover:bg-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between border-b border-slate-800 p-4">
          <button
            onClick={onMarkAllRead}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium hover:bg-indigo-500"
          >
            <CheckCheck size={16} />
            Mark All Read
          </button>

          <span className="text-sm text-slate-400">
            {notifications.length} Notifications
          </span>
        </div>

        {/* Body */}
        <div
          className="flex-1 overflow-y-auto overscroll-contain p-4"
          style={{
            WebkitOverflowScrolling: "touch",
          }}
        >
          {loading ? (
            <p className="text-center text-slate-400">Loading...</p>
          ) : notifications.length === 0 ? (
            <div className="mt-20 text-center">
              <h3 className="text-lg font-semibold text-white">
                No Notifications
              </h3>

              <p className="mt-2 text-slate-400">You're all caught up 🎉</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((item) => (
                <div
                  key={item._id}
                  className={`rounded-2xl border p-4 transition ${
                    item.isRead
                      ? "border-slate-800 bg-slate-900"
                      : "border-indigo-500 bg-slate-900"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-white">{item.title}</h3>

                      <p className="mt-1 text-sm text-slate-400">
                        {item.message}
                      </p>

                      <p className="mt-3 text-xs text-slate-500">
                        {new Date(item.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <button
                      onClick={() => onDelete(item._id)}
                      className="rounded-lg p-2 hover:bg-red-500/20"
                    >
                      <Trash2 size={16} className="text-red-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
