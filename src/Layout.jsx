import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import ShoppingCart from './components/ShoppingCart.jsx';
import Footer from './components/Footer.jsx';

function Layout() {
  return (
    <>
      <ShoppingCart />
      <Navbar />
      <Outlet />
      <Footer/>
    </>
  );
}

export default Layout;