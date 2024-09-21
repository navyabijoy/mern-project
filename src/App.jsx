import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Add this part
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import About from "./pages/About";

export default function App() {
  return (
    <BrowserRouter>  {/* Corrected BrowserRouter */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
