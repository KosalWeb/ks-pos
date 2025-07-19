import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router";
import { useQuery } from "../../hooks/useQuery";
import { useStorage } from "../../hooks/useStorage";
import { useCollection } from "../../hooks/useCollection";
import toast from "react-hot-toast";
import { useFindById } from "../../hooks/useFindById";
import { apiUrl } from "../../configs/env";

function EditProduct() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [costPrice, setCostPrice] = useState("")
    const [salePrice, setSalePrice] = useState("")
    const [note, setNote] = useState("")
    const [oldImageUrl, setOldImageUrl] = useState("")

    const { data: categories } = useQuery("categories", "", 1, 100)
    const { uploadFile, removeFile } = useStorage()

    const route = useParams()
    const navigate = useNavigate()

    const { update, isLoading } = useCollection("products")
    const { data: product, isLoading: isFinding } = useFindById("products", route.id)


    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    function handleRemoveImage() {
        setImage(null);
        setPreview(null);
    };


    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            name,
            category,
            salePrice,
            costPrice,
            note
        }
        //1). upload image 
        if (image) {
            const res = await uploadFile(image)
            if (res?.filename) {
                data['imageUrl'] = res?.filename
                await removeFile(oldImageUrl)
            }
        }
        const updateDoc = await update(data, route.id)
        if (updateDoc) {
            toast.success("Updated Successfully!")
            setName("")
            setCategory("")
            setCostPrice("")
            setSalePrice("")
            setNote("")
            setImage(null)
            setPreview(null)
            navigate("/product")
        }
    }

    useEffect(() => {
        if (product && isFinding == false) {
            setName(product?.name || "")
            setCategory(product?.category?._id || "")
            setCostPrice(product?.costPrice || "")
            setSalePrice(product?.salePrice || "")
            setNote(product?.note || "")
            if (product?.imageUrl) {
                setPreview(`${apiUrl}/upload/${product?.imageUrl}`)
                setOldImageUrl(product?.imageUrl)
            }
        }
    }, [product, isFinding])


    return (
        <div className="p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold">កែតម្រូវ ផលិតផល</h1>
            </div>

            <form onSubmit={handleSubmit} className="max-w-4xl w-full mt-4 grid grid-cols-2 gap-2 items-start">
                <div className="bg-white p-4 rounded-md">
                    <div className="mb-3">
                        <label htmlFor="" className="block">
                            Name*
                        </label>
                        <input
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                            className="input w-full"
                            placeholder="Enter name"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="block">
                            ប្រភេទទំនិញ*
                        </label>
                        <select className="select w-full" required onChange={(e) => setCategory(e.target.value)} value={category} >
                            <option value="" disabled>
                                Choose Category
                            </option>
                            {
                                categories?.map((item) => (
                                    <option key={item._id} value={item?._id}>{item?.name}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="" className="block">
                            តម្លៃដើម*
                        </label>
                        <input
                            type="number"
                            onChange={(e) => setCostPrice(e.target.value)}
                            value={costPrice}
                            required
                            className="input input-bordered w-full"
                            placeholder="0.0"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="" className="block">
                            តម្លៃលក់e*
                        </label>
                        <input
                            type="number"
                            onChange={(e) => setSalePrice(e.target.value)}
                            value={salePrice}
                            required
                            className="input input-bordered w-full"
                            placeholder="0.0"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="" className="block">
                            សំគាល់*
                        </label>
                        <textarea
                            className="textarea w-full"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Type your note here..." ></textarea>
                    </div>


                    <div className="flex items-center justify-end gap-2">
                        <Link to="/product" className="btn btn-sm">ចាកចេញ</Link>
                        <button className="btn btn-sm btn-neutral" disabled={isLoading}>
                            {
                                isLoading ? (
                                    <span className="loading loading-spinner loading-md"></span>
                                ) : (
                                    <span>រក្សាទុក</span>
                                )
                            }
                        </button>
                    </div>
                </div>


                <div className="bg-white p-4 rounded-md">
                    {preview ? (
                        <div className="relative w-full h-[300px]">
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

export default EditProduct;
