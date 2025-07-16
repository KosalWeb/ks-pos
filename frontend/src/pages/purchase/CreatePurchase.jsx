import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { useQuery } from "../../hooks/useQuery";
import { useFindOneByCode } from "../../hooks/useFindOneByCode";
import toast from "react-hot-toast";
import { apiUrl } from "../../configs/env";
import {useCollection} from "../../hooks/useCollection"
import { Link, useNavigate } from "react-router";


function CreatePurchase() {
    const [productCode, setProductCode] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [unitPrice, setUnitPrice] = useState(0);
    const [total, setTotal] = useState(0);
    const [product, setProduct] = useState({});
    const [carts, setCarts] = useState([])
    const [totalCost, setTotalCost] = useState(0)

    const [supplier, setSuplier] = useState("")
    const [invoiceNumber, setInvoiceNumber] = useState("")
    const [purchaseDate, setPurchaseDate] = useState("")
    const [purchaseStatus, setPurchaseStatus] = useState("")
    const [note, setNote] = useState("")

    const { data: suppliers } = useQuery("suppliers", "", 1, 100)
    const { findOneByCode } = useFindOneByCode()
    const {create, isLoading} = useCollection("purchase")
    const navigate = useNavigate()

    const handleSearchProductByCode = async () => {
        if (!productCode) {
            toast.error("Product code is required")
            return;
        }
        const data = await findOneByCode("/products/code", productCode)
        if (data) {
            setUnitPrice(data?.costPrice)
            setProduct(data)
        }

    }

    const handleAddToCart = () => {
        const data = {
            product: product?._id,
            name: product?.name,
            imageUrl: product?.imageUrl,
            quantity: quantity * 1,
            unitPrice: unitPrice * 1,
            totalPrice: total
        }

        if (data?.quantity <= 0) {
            toast.error("Quantity cannot equal or less than zero!")
            return;
        }

        const exist = carts.find(el => el.product === data.product)
        if (exist) {
            toast.error("You can't add the same product!")
            return;
        }
        setCarts([...carts, data])
        clearForm()
    }

    const handleRemoveItemFromCart = (id) => {
        const updateCarts = carts.filter(el => el.product !== id)
        setCarts(updateCarts)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(carts.length <= 0 ){
            toast.error("Please add product to the cart!")
            return;
        }

        const data = {
            invoiceNumber,
            purchaseDate,
            purchaseStatus,
            note,
            totalCost,
            supplier,
            items: carts
        }

        try {
            const res = await create(data)
            if(res){
                toast.success("Create purchase successfully!")
                navigate("/purchase")
            }
        } catch (error) {
            console.log(error)
        }

    }


    function clearForm() {
        setTotal(0)
        setQuantity(1)
        setUnitPrice(0)
        setProduct({})
        setProductCode("")
    }

    useEffect(() => {
        setTotal(quantity * unitPrice)
    }, [quantity, unitPrice])

    useEffect(() => {
        const totalPayment = carts.reduce((sum, item) => {
            return sum + item.totalPrice
        }, 0)
        setTotalCost(totalPayment)
    }, [carts])



    return (
        <div className="p-4">
    
            <h1 className="text-xl font-semibold">Create Purchase</h1>
            <form onSubmit={handleSubmit} className="p-4 mt-5 bg-white  rounded-lg intro-y">
                <h3 className="text-base font-medium mt-1 w-fit mb-4 border-b border-slate-400 border-dashed">
                    Import Product
                </h3>
                <div className="grid grid-cols-12 gap-4">
                    <fieldset className="col-span-3">
                        <label className="block">Supplier</label>
                        <select onChange={(e) => setSuplier(e.target.value)} value={supplier} className="select w-full select-bordered" required>
                            <option value="" disabled>
                                Select supplier
                            </option>
                            {suppliers?.map(el => (
                                <option key={el._id} value={el?._id}>{el?.businessName}</option>
                            ))}
                        </select>
                    </fieldset>
                    <fieldset className="col-span-3">
                        <label className="block">Invoice Number</label>
                        <div className="flex items-center">
                            <input
                                type="text"
                                required
                                onChange={(e) => setInvoiceNumber(e.target.value)}
                                className="input w-full input-bordered"
                                placeholder="Enter invoice number"
                            />
                        </div>
                    </fieldset>
                    <fieldset className="col-span-3">
                        <label className="block">Import Date</label>
                        <div className="flex items-center">
                            <input
                                onChange={(e) => setPurchaseDate(e.target.value)}
                                type="date"
                                required
                                className="input w-full input-bordered"
                            />
                        </div>
                    </fieldset>
                    <fieldset className="col-span-3">
                        <label className="block">Status</label>
                        <div className="flex items-center">
                            <select required className="select w-full select-bordered" value={purchaseStatus} onChange={(e) => setPurchaseStatus(e.target.value)}>
                                <option value="" disabled>Select Purchase Status</option>
                                <option value="received">Received</option>
                                <option value="pending">Pending</option>
                                <option value="ordered">Ordered</option>
                            </select>
                        </div>
                    </fieldset>

                    <fieldset className="col-span-3">
                        <label className="block">Note</label>
                        <textarea
                            onChange={(e) => setNote(e.target.value)}
                            className="textarea w-full textarea-bordered"
                            placeholder="Type shipping address..."
                        ></textarea>
                    </fieldset>
                </div>

                <h3 className="text-base font-medium mt-8 mb-4 w-fit border-b border-slate-400 border-dashed">
                    Product Details
                </h3>

                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-4 space-y-2">
                        <fieldset>
                            <label className="block">Product Code</label>
                            <div className="flex items-center relative">
                                <input
                                    type="text"
                                    onChange={(e) => setProductCode(e.target.value)}
                                    value={productCode}
                                    className="input  w-full"
                                    placeholder="e.g 00001"
                                />
                                <button
                                    onClick={handleSearchProductByCode}
                                    type="button"
                                    className="btn btn-xs btn-neutral absolute top-o right-2"
                                >
                                    +
                                </button>
                            </div>
                        </fieldset>
                        <div className="grid grid-cols-2 gap-4">
                            <fieldset>
                                <label className="block">Quantity</label>
                                <div className="flex items-center">
                                    <input
                                        type="number"
                                        onChange={(e) => setQuantity(e.target.value)}
                                        value={quantity}
                                        className="input input-bordered w-full"
                                    />
                                </div>
                            </fieldset>
                            <fieldset>
                                <label className="label-b">Unit Price</label>
                                <div className="flex items-center">
                                    <input
                                        type="number"
                                        disabled
                                        value={unitPrice}
                                        className="input input-bordered w-full"
                                    />
                                </div>
                            </fieldset>
                        </div>

                        <fieldset>
                            <label className="label-b">Total : <span className="text-red-600 font-semibold">{total?.toFixed(2)}៛</span> </label>
                        </fieldset>
                        <fieldset className="flex justify-end">
                            <button
                                type="button"
                                onClick={handleAddToCart}
                                className="btn btn-sm btn-neutral w-20"
                            >
                                Add
                            </button>
                        </fieldset>
                    </div>

                    <div className="col-span-8">
                        <div className="mt-3 overflow-auto lg:overflow-visible">
                            <table className="w-full border border-gray-200">
                                <thead>
                                    <tr className="bg-gray-200 text-sm">
                                        <th className="text-left whitespace-nowrap p-4">Image</th>
                                        <th className="text-left whitespace-nowrap p-4">Product</th>
                                        <th className="text-right whitespace-nowrap p-4">
                                            Unit Price
                                        </th>
                                        <th className="text-right whitespace-nowrap p-4">Qty</th>
                                        <th className="text-right whitespace-nowrap p-4">Total</th>
                                        <th className="text-right whitespace-nowrap p-4">Action</th>
                                    </tr>
                                </thead>

                                {
                                    carts?.length <= 0 ? (
                                        <tbody>
                                            <tr>
                                                <td colSpan={6}>
                                                    <p className="text-center p-4">No Data!</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    ) : (
                                        <tbody>
                                            {carts?.map((el) => (
                                                <tr key={el.product} className="even:bg-gray-100">
                                                    <td className="py-2 !p-4">
                                                        <img className="w-10" src={`${apiUrl}/upload/${el.imageUrl}`} alt="" />
                                                    </td>
                                                    <td className="py-2 !p-4">{el?.name}</td>

                                                    <td className="text-right text-red-600">{el?.unitPrice?.toFixed(2)}៛</td>
                                                    <td className="text-right">{el?.quantity}</td>
                                                    <td className="text-right text-red-600">{el?.totalPrice?.toFixed(2)}៛</td>
                                                    <td className="text-center px-4">
                                                        <p onClick={() => handleRemoveItemFromCart(el.product)} className="text-red-600 w-full flex justify-end text-center space-x-1 mr-3 cursor-pointer">
                                                            <FaTrash className="w-4 h-4" />
                                                        </p>
                                                    </td>
                                                </tr>
                                            ))}

                                            <tr className="bg-gray-200 border-t">
                                                <td colSpan="6" className="text-right p-2 font-semibold uppercase">
                                                    Total : <span className="text-red-600">{totalCost?.toFixed(2)}៛</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    )   
                                }



                            </table>
                        </div>
                    </div>
                </div>

                <fieldset className="col-span-12 mt-4 flex items-center justify-end space-x-2">
                    <Link to="/purchase" type="button" className="w-20 btn btn-sm">
                        Back
                    </Link>
                    <button type="submit" disabled={isLoading} className="w-20 btn btn-sm btn-neutral">
                        Save
                    </button>
                </fieldset>
            </form>
        </div>
    );
}

export default CreatePurchase;