import { useEffect } from 'react';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa'; 
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user)
  const [ searchTerm, setSearchTerm ] = useState('')
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const term = urlParams.get('searchTerm');
    if (term) {
      setSearchTerm(term);
    }
  }, [location.search]);

  return (
    <header className='bg-coral/35 shadow-sm'>
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap tracking-tight'>
            <span className="text-burgundy/85 italic">En</span>
            <span className='text-burgundy/55'>core</span> 
          </h1>
        </Link>

        <form onSubmit={handleSubmit}className='bg-white p-3 rounded-lg flex items-center'>
            <input
                type="text"
                placeholder="Search..."
                className="bg-white focus:outline-none w-full sm:w-64" // Apply full width on small screens
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className='text-gray-700' />
        </form>


        <ul className='flex gap-4'>
          <Link to='/'>
            <li className='hidden sm:inline text-burgundy hover:opacity-65'>Home</li>
          </Link>   
          <Link to='/about'>
            <li className='hidden sm:inline text-burgundy hover:opacity-65'>About</li>
          </Link>
          <Link to='/profile'>
          {currentUser ? (
            <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='profile'></img>
        ):(
            <li className='hidden sm:inline text-burgundy hover:opacity-65'>Sign in</li>
        )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
