import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Catalogue from './pages/Catalogue/Catalogue';
import CategoryProducts from './pages/CategoryProducts/category_products';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Contact from './pages/Contact/Contact';
import './App.css';
import ScrollToTop from './components/ScrollToTop';
export default function App() {
  return (
    <HelmetProvider>
      <Router>
       <ScrollToTop />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/catalogue/:categoryId/:subcategoryId" element={<CategoryProducts />} />
            <Route path="/catalogue/:categoryId/:subcategoryId/:productId" element={<ProductDetail />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </HelmetProvider>
  );
}