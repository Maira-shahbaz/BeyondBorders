import Navbar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import MailList from "../components/MailList.jsx";
import FeaturedProperties from "../components/FeaturedProperties.jsx";
import PropertyList from "../components/PropertyList.jsx";
import Featured from "../components/Featured.jsx";

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {}
      <Navbar />

      {}
      <Header />

      {}
      <main className="mt-12 flex flex-col items-center gap-12 w-full">
        {}
        <div className="w-full max-w-6xl px-4">
          <Featured />
        </div>

        {}
        <div className="w-full max-w-6xl px-4">
          <h2 className="text-2xl font-bold mb-4">Browse by property type</h2>
          <PropertyList />
        </div>

        {}
        <div className="w-full max-w-6xl px-4">
          <h2 className="text-2xl font-bold mb-4">Homes guests love</h2>
          <FeaturedProperties />
        </div>

        {}
        <MailList />
      </main>

      {}
      <Footer />
    </div>
  );
};

export default Home;
