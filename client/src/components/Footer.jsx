import { FaInstagram, FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";
import  { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-burg-700 text-gray-300 py-8">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
        <div>
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className="text-burgundy/55">Face</span>
            <span className='text-burgundy/85'>Beauty</span> 
          </h1>
        </Link>
          <p className="text-sm mt-2">
            Bringing quality and innovation together to create meaningful experiences.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li><a href="/" className="hover:text-burg-500">Home</a></li>
            <li><a href="/about" className="hover:text-burg-500">About</a></li>
            <li><a href="/products" className="hover:text-burg-500">Products</a></li>
            <li><a href="/contact" className="hover:text-burg-500">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white">Follow Us</h3>
          <div className="flex justify-center md:justify-start gap-4 mt-2">
            <a href="https://instagram.com" target="_blank" className="hover:text-burg-500">
              <FaInstagram size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" className="hover:text-burg-500">
              <FaTwitter size={20} />
            </a>
            <a href="https://facebook.com" target="_blank" className="hover:text-burg-500">
              <FaFacebook size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" className="hover:text-burg-500">
              <FaLinkedin size={20} />
            </a>
          </div>
          <p className="text-sm mt-2">Email: support@brandname.com</p>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-6 text-center pt-4 text-sm">
        <p>&copy; {new Date().getFullYear()} BrandName. All rights reserved.</p>
      </div>
    </footer>
  );
}
