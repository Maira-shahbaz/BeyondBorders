import useFetch from "../../hooks/useFetch";

const Featured = () => {
  const { data, loading, error } = useFetch("/api/hotels/countByCity?cities=berlin,madrid,london");

  const cities = [
    {
      name: "Berlin",
      img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=60",
    },
    {
      name: "Madrid",
      img: "https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o=",
    },
    {
      name: "London",
      img: "https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o=",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-5 w-full max-w-6xl mx-auto mt-10">
      {loading
        ? <p className="text-center text-gray-500 w-full">Loading please wait...</p>
        : cities.map((city, idx) => (
            <div key={idx} className="relative flex-1 min-w-[280px] rounded-lg overflow-hidden h-64 md:h-80 shadow-lg">
              <img
                src={city.img}
                alt={city.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 text-white">
                <h1 className="text-xl md:text-2xl font-bold">{city.name}</h1>
                <h2 className="text-sm md:text-base">
                  {data[idx] ? data[idx] : 0} properties
                </h2>
              </div>
            </div>
          ))
      }
    </div>
  );
};

export default Featured;
