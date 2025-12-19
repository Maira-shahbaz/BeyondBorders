import { Link } from "react-router-dom";

const SearchItem = ({ item }) => {
  return (
    <div className="flex justify-between gap-5 border border-gray-300 p-4 rounded-lg mb-5">
      {}
      <img
        src={item.photos[0] || "https://via.placeholder.com/200"}
        alt={item.name}
        className="w-48 h-48 object-cover rounded"
      />

      {}
      <div className="flex-2 flex flex-col gap-2">
        <h1 className="text-xl text-blue-700 font-semibold">{item.name}</h1>
        <span className="text-xs">{item.distance}m from center</span>
        {item.freeTaxi && (
          <span className="text-xs bg-green-600 text-white px-2 py-1 rounded w-max">
            Free airport taxi
          </span>
        )}
        <span className="text-xs font-bold">Studio Apartment with Air conditioning</span>
        <span className="text-xs">{item.desc}</span>
        {item.freeCancellation && (
          <>
            <span className="text-xs text-green-600 font-bold">Free cancellation</span>
            <span className="text-xs text-green-600">
              You can cancel later, so lock in this great price today!
            </span>
          </>
        )}
      </div>

      {}
      <div className="flex-1 flex flex-col justify-between items-end">
        {item.rating && (
          <div className="flex justify-between items-center w-full mb-2">
            <span className="font-medium">Excellent</span>
            <button className="bg-blue-900 text-white px-2 py-1 font-bold rounded">
              {item.rating}
            </button>
          </div>
        )}
        <div className="flex flex-col gap-2 items-end text-right">
          <span className="text-2xl font-bold">${item.cheapestPrice}</span>
          <span className="text-xs text-gray-500">Includes taxes and fees</span>
          <Link to={`/hotels/${item._id}`}>
            <button className="bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-800 transition">
              See availability
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
