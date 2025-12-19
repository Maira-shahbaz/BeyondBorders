import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";
import useFetch from "../hooks/useFetch";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data: rooms, loading, error } = useFetch(`/api/hotels/room/${hotelId}`);
  const { dates } = useContext(SearchContext);
  const navigate = useNavigate();

  // Generate all dates in range
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    const datesArray = [];
    while (date <= end) {
      datesArray.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return datesArray;
  };

  const allDates = dates && dates.length > 0
    ? getDatesInRange(dates[0].startDate, dates[0].endDate)
    : [];

  const isAvailable = (roomNumber) => {
    return !roomNumber.unavailableDates.some((date) =>
      allDates.includes(new Date(date).getTime())
    );
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) =>
          axios.put(`/api/rooms/availability/${roomId}`, { dates: allDates })
        )
      );
      setOpen(false);
      navigate("/");
    } catch (err) {
      console.error("Failed to reserve rooms:", err);
    }
  };

  if (loading) return <div className="text-center p-5">Loading rooms...</div>;
  if (error) return <div className="text-center p-5 text-red-500">Failed to load rooms.</div>;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-11/12 max-w-3xl relative">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="absolute top-4 right-4 text-2xl cursor-pointer"
          onClick={() => setOpen(false)}
        />
        <span className="text-lg font-semibold mb-4 block">Select your rooms:</span>

        {rooms.map((item) => (
          <div key={item._id} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b py-4">
            <div className="flex flex-col gap-1">
              <div className="font-medium text-lg">{item.title}</div>
              <div className="text-sm text-gray-700">{item.desc}</div>
              <div className="text-sm">Max people: <b>{item.maxPeople}</b></div>
              <div className="text-sm font-semibold">${item.price}</div>
            </div>

            <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
              {item.roomNumbers.map((roomNumber) => (
                <label key={roomNumber._id} className="flex flex-col items-center">
                  <span className="text-xs">{roomNumber.number}</span>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                    className="mt-1 accent-blue-600 cursor-pointer disabled:cursor-not-allowed"
                  />
                </label>
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={handleClick}
          className="mt-6 w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition"
        >
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
