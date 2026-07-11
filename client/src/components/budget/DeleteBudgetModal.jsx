import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Trash2, X } from "lucide-react";

export default function DeleteBudgetModal({
  open,
  onClose,
  onConfirm,
  budget,
}) {
  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-red-500/20 flex items-center justify-center">
                <AlertTriangle className="text-red-500" />
              </div>

              <h2 className="text-2xl font-bold text-white">Delete Budget</h2>
            </div>

            <button onClick={onClose}>
              <X className="text-slate-400 hover:text-white" />
            </button>
          </div>

          <p className="mt-6 text-slate-400 leading-7">
            Are you sure you want to delete
            <span className="text-white font-semibold">
              {" "}
              {budget?.category}
            </span>
            ?
          </p>

          <p className="mt-2 text-sm text-red-400">
            This action cannot be undone.
          </p>

          <div className="mt-8 flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-700 py-3 hover:bg-slate-800 transition"
            >
              Cancel
            </button>

            <button
              onClick={onConfirm}
              className="flex-1 rounded-xl bg-red-600 hover:bg-red-700 py-3 flex items-center justify-center gap-2 transition"
            >
              <Trash2 size={18} />
              Delete
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
