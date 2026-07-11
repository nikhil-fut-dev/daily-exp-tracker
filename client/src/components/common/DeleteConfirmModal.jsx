import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Trash2, } from "lucide-react";

export default function DeleteConfirmModal({
  open,
  title = "Delete Item",
  message = "Are you sure you want to delete this item?",
  onClose,
  onConfirm,
  loading = false,
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
          >
            <div
              className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20">
                <AlertTriangle className="text-red-500" size={34} />
              </div>

              <h2 className="mt-6 text-center text-2xl font-bold text-white">
                {title}
              </h2>

              <p className="mt-3 text-center text-slate-400">{message}</p>

              <div className="mt-8 flex gap-4">
                <button
                  onClick={onClose}
                  className="flex-1 rounded-xl border border-slate-700 py-3 text-white hover:bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  disabled={loading}
                  onClick={onConfirm}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-white hover:bg-red-700 disabled:opacity-50"
                >
                  <Trash2 size={18} />

                  {loading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
