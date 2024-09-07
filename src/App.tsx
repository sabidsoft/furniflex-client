import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Cart from './pages/Cart';
import PrivateRoute from './routes/PrivateRoutes';
import NotFound from './pages/NotFound';
import TermsAndPolicy from './pages/TermsAndPolicy';
import Header from './components/Header';
import Products from './pages/Products';
import Categories from './pages/Categories';
import Custom from './pages/Custom';
import Blog from './pages/Blog';
import Checkout from './pages/Checkout';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/terms-and-policy" element={<TermsAndPolicy />} />

              <Route element={
                <>
                  <Header />
                  <PrivateRoute />
                </>
              }>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/custom" element={<Custom />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
              </Route>

              <Route path="*" element={
                <>
                  <Header />
                  <NotFound />
                </>
              } />
            </Routes>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
}
