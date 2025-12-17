export default function FoodsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Explore Foods</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="h-40 bg-gray-200 rounded-xl mb-4 animate-pulse"></div>
            <h3 className="font-semibold text-lg text-gray-800">
              Delicious Item #{i}
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              Description of the food item goes here.
            </p>
            <div className="flex items-center justify-between mt-4">
              <span className="font-bold text-gray-900">$12.99</span>
              <button className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
