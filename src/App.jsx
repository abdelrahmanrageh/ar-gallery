import './App.css'
import Products from './components/Products';
import HeroSection from './components/HeroSection';
import Banner from './components/Banner';

function App() {
  const categories = [
    {sectionName: 'Jewelery', filter: 'jewelery'},
    {sectionName: 'Men\'s Clothes', filter: 'men\'s clothing'},
    {sectionName: 'Women\'s Clothes', filter: 'women\'s clothing'},
    {sectionName: 'Electronics', filter: 'electronics'},
  ]
  return (
    <>
      <Banner />
      <HeroSection />
      <div className="container">
        {
          categories.map((category) =>
            <Products key={category.sectionName} filter={category.filter} sectionName={category.sectionName} />
          )
        }
      </div>
    </>
  )
}

export default App
