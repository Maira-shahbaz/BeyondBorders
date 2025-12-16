import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { AuthContext } from "../../../../client-side/src/context/AuthContext";
import { SearchContext } from "../../../../client-side/src/context/SearchContext";
import Reserve from "../../components/Reserve/reserve";


// Utility to calculate days between two dates
const dayDifference = (startDate, endDate) => {
  if (!startDate || !endDate) return 0;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const Hotel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.pathname.split("/")[2];

  const { user } = useContext(AuthContext);
  const { dates, options } = useContext(SearchContext);

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const days =
    dates && dates.length > 0
      ? dayDifference(dates[0]?.startDate, dates[0]?.endDate)
      : 0;

  // Fetch hotel data using Vite proxy
  useEffect(() => {
    const fetchHotel = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/hotels/find/${id}`);
        console.log("Fetched hotel data:", res.data);
        setHotel(res.data);
        setError(false);
      } catch (err) {
        console.error("Failed to fetch hotel:", err);
        setError(true);
      }
      setLoading(false);
    };
    fetchHotel();
  }, [id]);

  const handleReserveClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  if (loading)
    return <div className="text-center mt-10">Loading hotel data...</div>;

  if (error)
    return (
      <div className="text-red-500 text-center mt-10">
        Failed to load hotel data.
      </div>
    );

  return (
    <div>
      <Navbar />
      <Header type="list" />

      <div className="flex flex-col items-center mt-5">
        <div className="w-full max-w-5xl flex flex-col gap-2 relative">
          {/* Reserve Button */}
          <button
            className="absolute top-2 right-0 px-5 py-2 bg-blue-600 text-white font-bold rounded cursor-pointer"
            onClick={handleReserveClick}
          >
            Reserve or Book Now!
          </button>

          {/* Hotel Basic Info */}
          <h1 className="text-2xl font-semibold">{hotel?.name}</h1>
          <div className="flex items-center gap-2 text-sm">
            <span>📍</span>
            <span>{hotel?.address || "Address not available"}</span>
          </div>
          <span className="text-blue-600 font-medium">
            Excellent location – {Number(hotel?.distance) || 0}m from center
          </span>
          <span className="text-green-600 font-medium">
            Book a stay over ${hotel?.cheapestPrice || 0} at this property and
            get a free airport taxi
          </span>

          {/* Hotel Details */}
          <div className="flex flex-col md:flex-row justify-between gap-5 mt-5">
            <div className="flex-3">
              <h1 className="text-xl font-semibold">{hotel?.title}</h1>
              <p className="text-sm mt-5">{hotel?.desc}</p>
            </div>

            <div className="flex-1 bg-blue-50 p-5 flex flex-col gap-5">
              <h1 className="text-lg text-gray-600">
                Perfect for a {days}-night stay!
              </h1>
              <span className="text-sm">
                Located in the real heart of {hotel?.city || "the city"}, this
                property has an excellent location score of 9.8!
              </span>
              <h2 className="font-light text-lg">
                <b>${days * (hotel?.cheapestPrice || 0) * (options?.room || 1)}</b>{" "}
                ({days} nights)
              </h2>
              <button
                onClick={handleReserveClick}
                className="border-none px-5 py-2 bg-blue-600 text-white font-bold cursor-pointer rounded"
              >
                Reserve or Book Now!
              </button>
            </div>
          </div>
        </div>
      </div>

      <MailList />
      <Footer />

      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
};

export default Hotel;
