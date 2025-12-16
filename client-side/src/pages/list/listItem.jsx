import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/searchItem";
import useFetch from "../../hooks/useFetch";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";

const List = () => {
  const location = useLocation();

  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options] = useState(location.state.options);

  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  // Debounced values for min and max
  const [debouncedMin, setDebouncedMin] = useState(min);
  const [debouncedMax, setDebouncedMax] = useState(max);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedMin(min);
      setDebouncedMax(max);
    }, 680); // 680ms debounce

    return () => clearTimeout(timer);
  }, [min, max]);

  // Fetch hotels using debounced min/max
  const { data, loading, error, reFetch } = useFetch(
    `/api/hotels?city=${destination}&min=${debouncedMin || 0}&max=${debouncedMax || 999}`
  );

  const handleClick = () => {
    reFetch();
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />

      <div className="flex justify-center mt-5 w-full">
        <div className="w-full max-w-5xl flex gap-5 px-4">

          {/* LEFT SEARCH PANEL */}
          <div className="flex-1 bg-blue-100 p-6 rounded-lg sticky top-5 h-max shadow-lg">
            <h1 className="text-xl font-semibold text-blue-800 mb-4">Search</h1>

            {/* DESTINATION */}
            <div className="flex flex-col gap-1 mb-3">
              <label className="text-sm text-blue-800 font-medium">Destination</label>
              <input
                type="text"
                className="h-10 px-3 rounded border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>

            {/* DATE PICKER */}
            <div className="flex flex-col gap-1 mb-3 relative">
              <label className="text-sm text-blue-800 font-medium">Check-in Date</label>
              <span
                onClick={() => setOpenDate(!openDate)}
                className="h-10 px-3 bg-white rounded flex items-center cursor-pointer border border-blue-400"
              >
                {`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}
              </span>

              {openDate && (
                <div className="absolute z-50 mt-2">
                  <DateRange
                    onChange={(item) => setDates([item.selection])}
                    ranges={dates}
                    minDate={new Date()}
                  />
                </div>
              )}
            </div>

            {/* OPTIONS */}
            <div className="flex flex-col mb-4">
              <label className="text-sm text-blue-800 font-medium mb-2">Options</label>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-700">Min Price (per night)</span>
                  <input
                    type="number"
                    className="w-24 px-2 py-1 border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={min || ""}
                    onChange={(e) => setMin(e.target.value)}
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-700">Max Price (per night)</span>
                  <input
                    type="number"
                    className="w-24 px-2 py-1 border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={max || ""}
                    onChange={(e) => setMax(e.target.value)}
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-700">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="w-24 px-2 py-1 border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={options.adult}
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-700">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="w-24 px-2 py-1 border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={options.children}
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-700">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="w-24 px-2 py-1 border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>

            {/* SEARCH BUTTON */}
            <button
              onClick={handleClick}
              className="w-full bg-blue-700 text-white py-2 rounded font-medium hover:bg-blue-800 transition"
            >
              Search
            </button>
          </div>

          {/* RIGHT SIDE RESULTS */}
          <div className="flex-[3] flex flex-col gap-5">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-600">Error loading hotels</p>
            ) : Array.isArray(data) ? (
              data.map((item) => <SearchItem key={item._id} item={item} />)
            ) : (
              <p>No results found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
