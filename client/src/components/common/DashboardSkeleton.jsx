export default function DashboardSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow">
            <div className="h-4 w-24 bg-gray-200 rounded mb-5"></div>

            <div className="h-8 w-36 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>

      {/* Charts */}

      <div className="grid lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-2xl p-6 shadow h-[350px]">
          <div className="h-full rounded-xl bg-gray-200"></div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow h-[350px]">
          <div className="h-full rounded-xl bg-gray-200"></div>
        </div>
      </div>

      {/* Table */}

      <div className="bg-white rounded-2xl shadow mt-8 p-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-10 bg-gray-200 rounded mb-4" />
        ))}
      </div>
    </div>
  );
}
