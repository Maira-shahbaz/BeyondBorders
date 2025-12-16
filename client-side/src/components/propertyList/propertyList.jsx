import useFetch from "../../hooks/useFetch";

const PropertyList = () => {
  const { data, loading, error } = useFetch("/api/hotels/countByType");

  const images = [
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg",
  ];

  if (loading) return <p className="text-center text-gray-500 mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">Something went wrong!</p>;

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4">
      <div className="flex gap-5 overflow-x-auto scrollbar-hide">
        {data &&
          images.map((img, i) => (
            <div
              key={i}
              className="flex-none w-64 rounded-lg overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform"
            >
              <img
                src={img}
                alt={data[i]?.type || ""}
                className="w-full h-36 object-cover"
              />
              <div className="p-4">
                <h1 className="text-lg font-semibold text-gray-700 capitalize">{data[i]?.type}</h1>
                <h2 className="text-sm font-light text-gray-500">
                  {data[i]?.count} {data[i]?.type}
                </h2>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PropertyList;
