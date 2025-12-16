import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from "react-date-range";
import { useState, useContext } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(SearchContext);

  const navigate = useNavigate();

  const handleOption = (name, operation) => {
    setOptions((prev) => ({
      ...prev,
      [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
    }));
  };

  const handleSearch = () => {
    dispatch({
      type: "NEW_SEARCH",
      payload: { destination, dates, options },
    });
    navigate("/hotels", { state: { destination, dates, options } });
  };

  return (
    <div className="bg-[#003580] text-white flex justify-center relative">
      <div
        className={`w-full max-w-[1024px] ${
          type === "list" ? "mt-5 mb-0" : "mt-5 mb-24"
        }`}
      >
        {/* Menu */}
        <div className="flex gap-10 mb-12">
          {[
            { icon: faBed, label: "Stays", active: true },
            { icon: faPlane, label: "Flights" },
            { icon: faCar, label: "Car rentals" },
            { icon: faBed, label: "Attractions" },
            { icon: faTaxi, label: "Airport taxis" },
          ].map(({ icon, label, active }, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 ${
                active ? "border border-white px-3 py-2 rounded-2xl" : ""
              }`}
            >
              <FontAwesomeIcon icon={icon} />
              <span>{label}</span>
            </div>
          ))}
        </div>

        {type !== "list" && (
          <>
            <h1 className="text-3xl font-bold">
              A lifetime of discounts? It's Genius.
            </h1>

            <p className="my-5">
              Get rewarded for your travels – unlock instant savings of 10% or
              more with a free Lamabooking account.
            </p>

            {!user && (
              <button className="bg-[#0071c2] text-white font-medium px-4 py-2 rounded">
                Sign in / Register
              </button>
            )}

            {/* Search Box */}
            <div className="bg-white h-[60px] border-4 border-[#febb02] rounded-md flex items-center justify-around text-black absolute -bottom-6 w-full max-w-[1024px] px-4">
              {/* Destination */}
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faBed} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="outline-none border-none"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>

              {/* Date */}
              <div className="flex items-center gap-3 relative">
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="text-gray-400"
                />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="text-gray-400 cursor-pointer"
                >
                  {`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                    dates[0].endDate,
                    "MM/dd/yyyy"
                  )}`}
                </span>

                {openDate && (
                  <div className="absolute top-12 z-20">
                    <DateRange
                      editableDateInputs={true}
                      onChange={(item) => {
                        const newRange = item.selection;
                        setDates([newRange]);

                        // close ONLY when user selects end date
                        if (
                          newRange.startDate &&
                          newRange.endDate &&
                          newRange.startDate !== newRange.endDate
                        ) {
                          setOpenDate(false);
                        }
                      }}
                      moveRangeOnFirstSelection={false}
                      ranges={dates}
                      minDate={new Date()}
                    />
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="flex items-center gap-3 relative">
                <FontAwesomeIcon icon={faPerson} className="text-gray-400" />

                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="text-gray-400 cursor-pointer"
                >
                  {`${options.adult} adult · ${options.children} children · ${options.room} room`}
                </span>

                {openOptions && (
                  <div className="absolute bg-white text-gray-700 rounded-md shadow-md p-3 top-12 z-20 w-48">
                    {["adult", "children", "room"].map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center my-2"
                      >
                        <span className="capitalize">{item}</span>
                        <div className="flex items-center gap-3 text-black">
                          <button
                            disabled={
                              options[item] <=
                              (item === "adult" || item === "room" ? 1 : 0)
                            }
                            onClick={() => handleOption(item, "d")}
                            className="border border-[#0071c2] text-[#0071c2] w-7 h-7"
                          >
                            -
                          </button>
                          <span>{options[item]}</span>
                          <button
                            onClick={() => handleOption(item, "i")}
                            className="border border-[#0071c2] text-[#0071c2] w-7 h-7"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="bg-[#0071c2] text-white px-4 py-2 rounded"
              >
                Search
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
