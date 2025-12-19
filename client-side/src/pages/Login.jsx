import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const response = await axios.post("/api/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
      navigate("/");
    } catch (err) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: err.response?.data || "Login failed",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-80 space-y-4">
        <h1 className="text-2xl font-bold text-center text-gray-800">Login</h1>

        <input
          type="text"
          id="username"
          placeholder="Username"
          onChange={handleChange}
          className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          disabled={loading}
          onClick={handleClick}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && (
          <span className="text-red-500 text-sm text-center block">
            {error.message || error}
          </span>
        )}
      </div>
    </div>
  );
};

export default Login;
