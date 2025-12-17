export default function Home() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white shadow-xl shadow-orange-500/20">
          <h3 className="text-lg font-semibold opacity-90">Total Orders</h3>
          <p className="text-4xl font-bold mt-2">245</p>
          <p className="text-sm mt-4 opacity-75">+12% from yesterday</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">
            Pending Delivery
          </h3>
          <p className="text-4xl font-bold mt-2 text-gray-900">12</p>
          <p className="text-sm mt-4 text-gray-500">Avg time: 35 mins</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">Total Spent</h3>
          <p className="text-4xl font-bold mt-2 text-gray-900">$1,240</p>
          <p className="text-sm mt-4 text-green-500">+5% this month</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 min-h-[400px]">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Orders</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                <div>
                  <p className="font-semibold text-gray-900">
                    Order #{1000 + i}
                  </p>
                  <p className="text-sm text-gray-500">2 items • $24.50</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                Delivered
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
