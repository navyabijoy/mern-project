import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateProduct from './pages/CreateProduct';
import UpdateProduct from './pages/UpdateProduct';
import Product from './pages/Product';
import Search from './pages/Search';
import Footer from './components/Footer';
export default function App() {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
       <Route path="/about" element={<About />} /> {/* localhost:5173/about will route to the about page */}
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/product/:productId" element={<Product />} />
      <Route path="/search" element={<Search />} />
      <Route element={<PrivateRoute />}>
         <Route path="/profile" element={<Profile />} /> {/*children of PrivateRoute component */}
         <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/update-product/:productId" element={<UpdateProduct />} />
      </Route>
    </Routes>
    <Footer />
    </BrowserRouter>
  )
}
