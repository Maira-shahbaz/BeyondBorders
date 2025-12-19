import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="h-[50px] bg-[#003580] flex justify-center">
      <div className="w-full max-w-[1024px] text-white flex items-center justify-between px-4">
        <Link to="/" className="text-white no-underline">
          <span className="font-medium text-lg">lamabooking</span>
        </Link>

        {user ? (
          <span className="text-white">{user.username}</span>
        ) : (
          <div className="flex items-center">
            <button className="ml-5 bg-white text-[#003580] px-3 py-1 rounded-md hover:bg-gray-200">
              Register
            </button>
            <button className="ml-5 bg-white text-[#003580] px-3 py-1 rounded-md hover:bg-gray-200">
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
