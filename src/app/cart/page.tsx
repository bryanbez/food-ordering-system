export default function CartPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Cart</h1>
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-4xl">🛒</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-800">
          Your cart is empty
        </h3>
        <p className="text-gray-500 mt-2">
          Looks like you haven't added anything yet.
        </p>
        <button className="mt-6 px-6 py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors">
          Start Ordering
        </button>
      </div>
    </div>
  );
}
