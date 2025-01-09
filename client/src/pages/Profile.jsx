import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import supabase from "../../supabase/supabaseClient.js";

export default function Profile() {
  const fileRef = useRef(null);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [file, setFile] = useState(undefined);
  const [formData, setFormData] = useState({});
  const [fileUploadError, setFileUploadError] = useState(false);
  const [fileUploadSuccess, setFileUploadSuccess] = useState(false);


  console.log(formData)

  // Use Firebase user ID directly for storage path
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
  
      // Get the public URL of the uploaded file
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
  

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
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
          className="border p-3 rounded-lg"
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg"
        />
        <input
          type="text"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
        />
        <button className="bg-burgundy/50 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}
