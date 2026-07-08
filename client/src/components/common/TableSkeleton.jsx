export default function TableSkeleton({ rows = 5, columns = 5 }) {
  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden animate-pulse">
      {/* Header */}

      <div className="border-b bg-gray-50 p-4">
        <div className="flex gap-4">
          {Array.from({ length: columns }).map((_, index) => (
            <div key={index} className="h-5 flex-1 rounded bg-gray-300" />
          ))}
        </div>
      </div>

      {/* Rows */}

      <div className="p-4 space-y-4">
        {Array.from({ length: rows }).map((_, row) => (
          <div key={row} className="flex gap-4">
            {Array.from({ length: columns }).map((_, col) => (
              <div key={col} className="h-5 flex-1 rounded bg-gray-200" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
