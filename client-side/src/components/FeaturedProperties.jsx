import useFetch from "../hooks/useFetch";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("/api/hotels?featured=true&limit=3");

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Something went wrong!</p>;

  return (
    <div className="max-w-6xl mx-auto flex flex-wrap justify-between gap-5 mt-8">
      {data.map((hotel) => (
        <div
          key={hotel._id}
          className="flex-1 min-w-[280px] bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
        >
          <img
            src={hotel.photos[0] || "https://via.placeholder.com/400x250"}
            alt={hotel.name}
            className="w-full h-60 object-cover"
          />

          <div className="p-4 flex flex-col gap-2">
            <span className="text-lg font-semibold text-gray-800">{hotel.name}</span>
            <span className="text-gray-500">{hotel.city}</span>
            <span className="text-gray-700 font-medium">
              Starting from ${hotel.cheapestPrice}
            </span>

            {hotel.rating && (
              <div className="flex items-center gap-2 mt-2">
                <button className="bg-blue-700 text-white px-2 py-1 rounded font-bold">
                  {hotel.rating}
                </button>
                <span className="text-sm text-gray-600">Excellent</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProperties;
