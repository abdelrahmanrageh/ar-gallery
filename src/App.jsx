import "./App.css";
import Products from "./components/Products";
import HeroSection from "./components/HeroSection";
import Banner from "./components/Banner";
import SuccessAlert from "./components/SuccessAlert";
import { useSelector } from "react-redux";

function App() {
  const categories = [
    { sectionName: "Top Stickers Collection", filter: "Stickers Collection" },
    { sectionName: "Top Stickers", filter: "Sticker" },
  ];
  const orderSuccess = useSelector((state) => state.shoppingCart.orderSuccess);
  return (
    <>
      <Banner />
      <HeroSection />
      <div className="container">
        {orderSuccess && <SuccessAlert message="Order placed successfully" />}
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
