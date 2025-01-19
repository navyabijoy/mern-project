import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact({ product }) {
    const [seller, setSeller] = useState(null);
    const [message, setMessage ] = useState('');
    const onChange = (e) => {
        setMessage(e.target.value);
    };

    useEffect(() => {
        const fetchSeller = async () => {
          try {
            const res = await fetch(`/api/user/${product.userRef}`);
            const data = await res.json();
            setSeller(data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchSeller();
      }, [product.userRef]);
  return (
    <>
    {seller && (
        <div>
            <p>
            Contact <span className='font-semibold'>{seller.username}</span>{' '}
            for{' '}
            <span className='font-semibold'>{product.name.toLowerCase()}</span>            
            </p>
            <textarea
             name='message'
             id='message'
             rows='2'
             value={message}
             onChange={onChange}
             placeholder='Enter your message here...'
             className='w-full border p-3 rounded-lg'
             >
            </textarea>
            <Link to={`mailto:${seller.email}?subject=Regarding ${product.name}&body=${message}`} className='block mt-3 bg-burg-500 text-white px-4 py-2 rounded-lg text-center'>
            Send Message
            </Link>
        </div>
    )}
    </>
  )
}
