import "./App.css";
import Products from "./components/Products";
import HeroSection from "./components/HeroSection";
import Banner from "./components/Banner";

function App() {
  const categories = [
    { sectionName: "Top Stickers Collection", filter: "Stickers Collection" },
    { sectionName: "Top Stickers", filter: "Sticker" },
  ];
  return (
    <>
      <Banner />
      <HeroSection />
      <div className="container">
        {categories.map((category) => (
          <Products
            key={category.sectionName}
            filter={category.filter}
            sectionName={category.sectionName}
          />
        ))}
      </div>
    </>
  );
}

export default App;
