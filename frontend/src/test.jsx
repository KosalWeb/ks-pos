import { useState } from "react";
import { Link } from "react-router";

function CreateProduct() {
 
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Create a preview URL
    }
  };

  function handleRemoveImage(){
    setImage(null);
    setPreview(null);
  };


  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Create new product</h1>
      </div>

      <form  className="max-w-4xl w-full mt-4 grid grid-cols-2 gap-2 items-start">
        <div className="bg-white p-4 rounded-md"> 
          <div className="mb-3">
            <label htmlFor="" className="block">
              Name*
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="" className="block">
              Category*
            </label>
            <select className="select select-bordered w-full" >
              <option value="" disabled>
                Choose Category
              </option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="" className="block">
              Cost Price*
            </label>
            <input
              type="number"

              className="input input-bordered w-full"
              placeholder="0.0"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="" className="block">
              Sale Price*
            </label>
            <input
              type="number"
   
              className="input input-bordered w-full"
              placeholder="0.0"
            />
          </div>

          {/* <div className="mb-3 hidden">
            <label htmlFor="" className="block">
              Current Stock*
            </label>
            <input
              type="hidden"
              onChange={(e) => setCurrentStock(e.target.value)}
              className="input input-bordered w-full"
              value={currentStock}
            />
          </div> */}

          <div className="flex items-center justify-end gap-2">
                <Link to="/product" className="btn btn-sm">Cancel</Link>
                <button  className="btn btn-sm btn-neutral">Save</button>
          </div>
        </div>


        <div className="bg-white p-4 rounded-md">
          {preview ? (
            <div className="relative w-full h-2/3">
              <img
                src={preview}
                alt="Preview"
                className="rounded-lg shadow object-cover w-full h-full"
              />
              <button
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-error hover:bg-error text-white rounded-full px-2 py-1 text-sm"
              >
                ✕
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-neutral hover:bg-gray-50">
              <span className="text-gray-500">Click to upload an image</span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          )}
          {image && (
            <div className="text-center mt-2">
              <p className="text-xs text-gray-600">{image.name}</p>
            </div>
          )}
        </div>
         

        
      </form>
    </div>
  );
}

export default CreateProduct;
