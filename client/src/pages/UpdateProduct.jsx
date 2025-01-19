import { Upload } from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import supabase from "../../supabase/supabaseClient";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateProduct() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    brand: "",
    category: "",
    condition: "",
    swatchedTimes: 0,
    originalPrice: 5,
    resalePrice: 3,
    isAuthentic: true,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams()

  useEffect(() => {
      const fetchProduct = async() => {
          const productId = params.productId;
          const res = await fetch(`/api/product/get/${productId}`);
          const data = await res.json();
          if (data.success === false){ // if the response has an error
              console.log(data.message)
              return
          }
          setFormData(data)
      }
      fetchProduct()
  }, []);

  const userId = currentUser?._id;

  const navigate = useNavigate();

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          console.log("Uploaded URLs:", urls);
          // Use functional update to ensure we're working with the latest state
          setFormData((prevFormData) => {
            const updatedFormData = {
              ...prevFormData,
              imageUrls: [...prevFormData.imageUrls, ...urls],
            };
            console.log("Updated formData:", updatedFormData);
            return updatedFormData;
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          console.error("Upload error:", err);
          setImageUploadError("Image upload failed (2 mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise(async (resolve, reject) => {
      try {
        const filePath = `product_images/${userId}/${file.name}`;

        // Upload file to Supabase storage
        const { data, error: uploadError } = await supabase.storage
          .from("user_uploads")
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: true,
          });

        if (uploadError) {
          throw uploadError;
        }

        // Get the public URL
        const {
          data: { publicUrl },
        } = await supabase.storage.from("user_uploads").getPublicUrl(filePath);

        console.log("Public URL:", publicUrl);

        // if (urlError) {
        //   throw urlError;
        // }

        resolve(publicUrl);
      } catch (error) {
        reject(error);
        console.error("Error uploading image:", error);
      }
    });
  };

    const handleRemoveImage = (index) => {
      setFormData({
        ...formData,
        imageUrls: formData.imageUrls.filter((_, i) => i !== index),
      });
    };

  const handleChange = (e) => {
    if (e.target.id === "isAuthentic") {
      setFormData({
        ...formData,
        isAuthentic: e.target.checked,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
    console.log("Updated formData:", formData); // Add this to debug
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting formData:", formData); // Debug log

      if (formData.imageUrls.length < 1) {
        setError("You must upload at least one image");
        return;
      }

      if (+formData.originalPrice < +formData.resalePrice) {
        setError("Resale price must be lower than original price");
        return;
      }

      setLoading(true);
      setError(false);

      const productData = {
        ...formData,
        userRef: currentUser._id,
      };

      console.log("Sending to API:", productData); // Debug log

      const res = await fetch(`/api/product/update/${params.productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const data = await res.json();
      console.log("API Response:", data); // Debug log

      setLoading(false);

      if (data.success === false) {
        setError(data.message);
      } else {
        navigate(`/product/${data._id}`);
      }
    } catch (error) {
      console.error("Submit error:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="p-4 md:p-6 max-w-5xl mx-auto">
      <div className="p-6 border-gray-200">
        <h1 className="text-2xl md:text-3xl font-semibold text-center text-gray-800">
          Update a Product
        </h1>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter product name"
                  className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-burg-500 focus:border-burg-500"
                  maxLength="62"
                  minLength="10"
                  required
                  onChange={handleChange}
                  value={formData.name}
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter product description"
                  className="w-full rounded-lg border border-gray-300 p-3 h-32 focus:outline-none focus:ring-2 focus:ring-burg-500 focus:border-burg-500"
                  required
                  onChange={handleChange}
                  value={formData.description}
                />
              </div>

              <div>
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Brand
                </label>
                <select
                  id="brand"
                  name="brand"
                  className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-burg-500 focus:border-burg-500"
                  required
                  onChange={handleChange}
                  value={formData.brand}
                >
                  <option value="" disabled>
                    Select a Brand
                  </option>
                  <option value="Maybelline">Maybelline</option>
                  <option value="MAC">MAC</option>
                  <option value="NYX">NYX</option>
                  <option value="Fenty Beauty">Fenty Beauty</option>
                  <option value="Estee Lauder">Estée Lauder</option>
                  <option value="Dior">Dior</option>
                  <option value="Urban Decay">Urban Decay</option>
                  <option value="Huda Beauty">Huda Beauty</option>
                  <option value="Tarte">Tarte</option>
                  <option value="Charlotte Tilbury">Charlotte Tilbury</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-burg-500 focus:border-burg-500"
                  required
                  onChange={handleChange}
                  value={formData.category}
                >
                  <option value="" disabled>
                    Select a Category
                  </option>
                  <option value="Makeup">Makeup</option>
                  <option value="Skincare">Skincare</option>
                  <option value="Haircare">Haircare</option>
                  <option value="Body Care">Body Care</option>
                  <option value="Fragrances">Fragrances</option>
                  <option value="Tools & Accessories">
                    Tools & Accessories
                  </option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="condition"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Condition
                  </label>
                  <select
                    id="condition"
                    name="condition"
                    className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-burg-500 focus:border-burg-500"
                    required
                    onChange={handleChange}
                    value={formData.condition}
                  >
                    <option value="" disabled>
                      Select a Condition
                    </option>
                    <option value="new">New</option>
                    <option value="Lightly Used">Lightly Used</option>
                    <option value="used">Used</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="swatchedTimes"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Swatch Times
                  </label>
                  <input
                    type="number"
                    id="swatchedTimes"
                    name="swatchedTimes"
                    min="0"
                    max="5"
                    className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-burg-500 focus:border-burg-500"
                    required
                    onChange={handleChange}
                    value={formData.swatchedTimes}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="originalPrice"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Original Price ($)
                  </label>
                  <input
                    type="number"
                    id="originalPrice"
                    name="originalPrice"
                    min="5"
                    className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-burg-500 focus:border-burg-500"
                    required
                    onChange={handleChange}
                    value={formData.originalPrice}
                  />
                </div>

                <div>
                  <label
                    htmlFor="resalePrice"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Resale Price ($)
                  </label>
                  <input
                    type="number"
                    id="resalePrice"
                    name="resalePrice"
                    min="1"
                    className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-burg-500 focus:border-burg-500"
                    required
                    onChange={handleChange}
                    value={formData.resalePrice}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <input
                  type="checkbox"
                  id="isAuthentic"
                  name="isAuthentic"
                  className="w-5 h-5 rounded border-gray-300 text-burg-600 focus:ring-burg-500"
                  onChange={handleChange}
                  checked={formData.isAuthentic}
                />
                <label
                  htmlFor="isAuthentic"
                  className="text-sm font-medium text-gray-700"
                >
                  Is Authentic
                </label>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Product Images
                  <span className="text-sm text-gray-500 ml-2">
                    (First image will be the cover, max 6)
                  </span>
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <input
                      onChange={(e) => setFiles(e.target.files)}
                      type="file"
                      id="imageUrls"
                      accept="image/*"
                      multiple
                      className="w-full rounded-lg border border-gray-300 p-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-burg-50 file:text-burg-700 hover:file:bg-burg-100"
                    />
                  </div>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-burg-50 text-burg-700 rounded-lg hover:bg-burg-100 transition-colors"
                    disabled={uploading}
                    onClick={handleImageSubmit}
                  >
                    <Upload size={20} />
                    <span>{uploading ? "Uploading..." : "Upload"}</span>
                  </button>
                </div>
                {imageUploadError && (
                  <p className="text-red-700 text-sm">{imageUploadError}</p>
                )}
              </div>

              {formData.imageUrls.length > 0 && (
                <div className="space-y-4">
                  <p className="text-sm font-medium text-gray-700">
                    Uploaded Images:
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {formData.imageUrls.map((url, index) => (
                      <div
                        key={url + index}
                        className="flex justify-between p-3 border items-center rounded-lg"
                      >
                        <img
                          src={url}
                          alt={`listing image ${index + 1}`}
                          className="w-20 h-20 object-contain rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            handleRemoveImage(index);
                          }}
                          className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="px-6 py-3 bg-burg-600 text-white rounded-lg hover:bg-burg-700 transition-colors focus:outline-none focus:ring-2 focus:ring-burg-500 focus:ring-offset-2"
                disabled={loading || uploading}
              >
                {loading ? "Creating.." : "Update Product"}
              </button>
              {error && <p className="text-red-700 text-sm">{error}</p>}
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
