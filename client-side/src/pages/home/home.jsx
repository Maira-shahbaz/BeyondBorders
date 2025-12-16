// src/pages/home/Home.jsx
import Navbar from "../../components/navBar/navBar.jsx";
import Header from "../../components/header/header.jsx";
import Featured from "../../components/Featured/Featured.jsx";
import PropertyList from "../../components/propertyList/propertyList.jsx";
import FeaturedProperties from "../../components/featuredProperties/featuredProperties.jsx";
import MailList from "../../components/mailList/mailList.jsx";
import Footer from "../../components/footer/footer.jsx";

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Navbar */}
      <Navbar />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="mt-12 flex flex-col items-center gap-12 w-full">
        {/* Featured Cities Section */}
        <div className="w-full max-w-6xl px-4">
          <Featured />
        </div>

        {/* Browse by Property Type Section */}
        <div className="w-full max-w-6xl px-4">
          <h2 className="text-2xl font-bold mb-4">Browse by property type</h2>
          <PropertyList />
        </div>

        {/* Homes Guests Love Section */}
        <div className="w-full max-w-6xl px-4">
          <h2 className="text-2xl font-bold mb-4">Homes guests love</h2>
          <FeaturedProperties />
        </div>

        {/* Mailing List Section */}
        <MailList />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
