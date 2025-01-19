import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import supabase from "../../supabase/supabaseClient.js";
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserFailure, signOutUserStart, signOutUserSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from "../redux/userSlice.js";
import { Link } from 'react-router-dom';

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [formData, setFormData] = useState({});
  const [fileUploadError, setFileUploadError] = useState(false);
  const [fileUploadSuccess, setFileUploadSuccess] = useState(false);
  const [updateSucess, setUpdateSuccess ] = useState(false);
  const [showProductError, setShowProductError ] = useState(false)
  const [ userProducts , setUserProducts ] = useState([]); // we set it as an empty array
  const dispatch = useDispatch();
  // console.log(formData)

  // use Firebase user ID directly for storage path
  const userId = currentUser?._id;

  useEffect(() => {
    if (file && userId) {
      handleFileUpload(file);
    }
  }, [file, userId]);

  async function handleFileUpload(file) {
    try {
      if (!userId) {
        throw new Error('No authenticated user');
      }
  
      const filePath = `profile_images/${userId}/profile.jpg`;
  
      // Upload the file to Supabase
      const { data, error } = await supabase.storage
        .from("user_uploads")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });
  
        if (error) {
          setFileUploadError(true);
          setFileUploadSuccess(false);
          console.error("File upload error:", error);
        } else {
          setFileUploadError(false);
          setFileUploadSuccess(true);
          console.log("File uploaded successfully:", data);
        }
      console.log("Upload successful:", data);
  
      // here we get the public URL of the uploaded file
      const { data: { publicUrl } } = await supabase.storage
        .from("user_uploads")
        .getPublicUrl(filePath);
  
      console.log("Public URL:", publicUrl);
  
      // Update the formData with the new avatar URL
      setFormData(formData => ({
        ...formData,
        avatar: publicUrl
      }));
  
    } catch (error) {
      setFileUploadError(true);
      setFileUploadSuccess(false);
      console.error("Unexpected error:", error);
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value})
  }
  
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      dispatch(updateUserStart()); // start the process of updating the user
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false){
        dispatch(updateUserFailure(data.message))
        return
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    }
    catch(error){
      dispatch(updateUserFailure(error.message))
    }
  }

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
        });
        const data = await res.json();
        if (data.success === false){
          dispatch(deleteUserFailure(data.message))
          return
          }
          dispatch(deleteUserSuccess(data));
    }
    catch(error) {
      dispatch(deleteUserFailure(error.message))
    }
  }
  
  const handleSignOut = async() => {
    try {
      dispatch(signOutUserStart())
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false){
        dispatch(signOutUserFailure(data.message))
        return
      }
      dispatch(signOutUserSuccess(data));
  } catch(error) {
    dispatch(signOutUserFailure(error.message))
  }
}
  const handleShowProducts = async() => {
    try {
      setShowProductError(false)
      const res = await fetch (`/api/user/products/${currentUser._id}`)
      const data = await res.json()
      if(data.success === false) {
        setShowProductError(true);
        return
      }
      setUserProducts(data)
      console.log(data)
    } catch (error) {
      setShowProductError(true)
    }
  }
  const handleProductDelete = async (productId) => {
    try {
      const res = await fetch(`/api/product/delete/${productId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false){
        console.log(data.message)
        return;
    }
    setUserProducts((prev) =>
      prev.filter((product) => product._id !== productId)
    )
  } catch(error) {
    console.log(error.message)
    }
  }
  
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <p className="text-sm self-center">
            {fileUploadError ? (
              <span className="text-red-700">Error Image upload</span>
            ) : fileUploadSuccess ? (
              <span className="text-green-700 items-center">Image uploaded successfully !</span>
            ) : (
              ""
            )}
          </p>

        <input
          type="text"
          placeholder="username"
          id="username"
          defaultValue={currentUser.username}
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          defaultValue={currentUser.email}
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          defaultValue={currentUser.password}
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <button disabled={loading} className="bg-burgundy/50 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? 'Loading..' : 'Update'}
        </button>
        <Link className='bg-slate-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95' to={"/create-product"}>
          Create Product
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">Delete account</span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">Sign out</span>
      </div>

      <p className="text-red-700 mt-5">{error ? error : ''}</p>
      <p className="text-green-700 mt-5">{updateSucess ? 'User is updated successfully': ' '}</p>
      <button onClick={handleShowProducts} className="text-burgundy w-full"> Show Products</button>
      <p className="text-red-700 mt-5">
        {showProductError? 'Error showing products': ''}
      </p>
      { userProducts && userProducts.length > 0 && 
      <div className="flex flex-col gap-4">
        <h1 className="text-cetner mt-7 text-2xl font-semibold">Your Products</h1>
        {userProducts.map((product) => (
          <div key={product._id} className="border rounded-lg p-3 flex justify-between items-center gap-4">
            <Link to={`/product/${product._id}`}>
            <img src={product.imageUrls[0]} alt="product cover" className="h-16 w-16 object-contain" />
            </Link>
            <Link className="text-slate-700 font-semibold hover:opacity-80 truncate flex-1" to={`/product/${product._id}`}>
            <p>{product.name}</p>
            </Link>
            <div className='flex flex-col item-center'>
                <button onClick={()=> handleProductDelete(product._id) }className='text-red-700 uppercase'>Delete</button>
                <Link to={`/update-product/${product._id}`}>
                <button className='text-green-700 uppercase'>Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>}
    </div>
  );
}
