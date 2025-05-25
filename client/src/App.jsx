import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Feature from './components/Feature';
import Categories from './components/Categories';
import FeaturedProducts from './components/FeaturedProducts';
import WhyChooseUs from './components/WhyChooseUs';
import Shop from './components/Shop';
import SingleProductPage from './components/SingleProductPage';
import BlogHighlights from './components/BlogHighlights';
import PartnerTestimonials from './components/PartnerTestimonials';
import CTASection from './components/CTASection';
import ShopPage from './components/ShopPage';
import BlogPage from './components/BlogPage';
import BlogPost from './components/BlogPost';
import About from './components/About';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Hero />
              <Feature />
              <Categories />
              <FeaturedProducts />
              <WhyChooseUs />
              <Shop />
              <BlogHighlights />
              <PartnerTestimonials />
              <CTASection />
            </div>
          }
        />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/:category" element={<ShopPage />} />
        <Route path="/product/:id" element={<SingleProductPage />} />
<Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/about" element={<About/>} />
        <Route path="/login" element={<div>Login Page (Coming Soon)</div>} />
      </Routes>
    </Router>
  );
}

export default App;