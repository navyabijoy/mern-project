import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const res = await fetch('/api/auth/signup',formData);
    setLoading(true);
    console.log("Form Data:", formData);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!res.ok) {
        const errorMessage = `Error: ${res.status} ${res.statusText}`;
        throw new Error(errorMessage);
      }
  
      const data = await res.json();
  
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
  
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  
  
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder='username' className='border border-gray-300 p-3 rounded-lg' id='username' onChange={handleChange} />
        <input type="email" placeholder='email' className='border border-gray-300 p-3 rounded-lg' id='email' onChange={handleChange} />
        <input type="password" placeholder='password' className='border border-gray-300 p-3 rounded-lg' id='password' onChange={handleChange} />
        <button 
        disabled={loading}
        className=" bg-burgundy/50 text-white p-3 rounded-lg uppercase hover:opacity-95">
  {loading ? 'loading...': 'Sign Up'}
</button>
<OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={'/sign-in'}>
          <span className="text-blue-700 hover:opacity-70">Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}
