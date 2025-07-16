import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useQuery } from "../../hooks/useQuery";
import { apiUrl } from "../../configs/env";
import { useCheckStock } from "../../hooks/useCheckStock";
import Modal from "../../components/Modal";
import toast from "react-hot-toast";
import {useCollection} from "../../hooks/useCollection"
function POS() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [carts, setCarts] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [paidAmount, setPaidAmount] = useState(1);
  const [customer, setCustomer] = useState("")

  const {create, isLoading} = useCollection("sale")
  const { checkStock } = useCheckStock();
  const { data: customers } = useQuery("customers", "", 1, 100);
  const { data: categories } = useQuery("categories", "", 1, 100);
  const { data: products, isLoading: isProductLoading } = useQuery(
    "products",
    search,
    1,
    8,
    false,
    condition
  );

  const handleAddToCart = async (item) => {
    const exist = carts.find((el) => el.product === item._id);
    if (exist) {
      handleIncrement(item._id);
      return;
    }
    const data = {
      product: item._id,
      name: item.name,
      quantity: 1,
      unitPrice: item.salePrice,
      totalPrice: 1 * item.salePrice,
    };
    const res = await checkStock(data.product, data.quantity);
    if (res?.success) {
      setCarts([...carts, data]);
    }
  };

  const handleIncrement = (id) => {
    const updatedCart = carts.map((el) => {
      if (el.product === id) {
        el.quantity += 1;
        el.totalPrice = el.quantity * el.unitPrice * 1;
      }
      return el;
    });
    setCarts(updatedCart);
  };

  const handleDecrement = (id) => {
    const updatedCart = carts.map((el) => {
      if (el.product === id) {
        el.quantity -= 1;
        el.totalPrice = el.quantity * el.unitPrice * 1;
      }
      return el;
    });
    setCarts(updatedCart);
  };

  const handleRemoveItem = (id) => {
    const updatedCart = carts.filter((el) => el.product !== id);
    setCarts(updatedCart);
  };

  const handleClearCart = () => {
    if (confirm("Are you sure?")) {
      setCarts([]);
    }
  };

  const handleAddPayment = async (e) => {
    e.preventDefault()
    if(carts.length <= 0){
      toast.error("Please add product to the cart!")
      return;
    }

    const data = {
       customer,
       totalCost,
       paidAmount,
       items: carts
    }
    const res = await create(data)
    console.log(res)
    if(res){
      clearForm()
       toast.success("Sale Created successfully!")
       window.open(`/sale/invoice/${res?.result?._id}`)
    }
  }

  function clearForm(){
    setPaidAmount(0)
    setCustomer("")
    setIsOpenModal(false)
    setCarts([])
  }

  useEffect(() => {
    if (category) {
      setCondition(`category=${category}`);
    } else {
      setCondition("");
    }
  }, [category]);

  useEffect(() => {
    const total = carts.reduce((sum, item) => (sum += item.totalPrice), 0);
    setTotalCost(total);
  }, [carts, totalCost]);

  return (
    <>
      <Modal
        open={isOpenModal}
        title="Add Payment"
        onClose={clearForm}
      >
        <form onSubmit={handleAddPayment}>
          <div className="mb-3">
            <label htmlFor="" className="block">
              Customer
            </label>
            <select className="select w-full" required onChange={(e) => setCustomer(e.target.value)} value={customer}>
              <option value="">--Select Customer--</option>
              {customers?.map((el) => (
                <option key={el?._id} value={el?._id}>{el?.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="" className="block">
              Paid Amount
            </label>
            <input
              type="number"
              onChange={(e) => setPaidAmount(e.target.value * 1)}
              value={paidAmount}
              className="input w-full validator"
              min={0}
              placeholder="Enter paid amount"
              required
            />
          </div>

          <div className="mt-2 space-x-2">
            <button
              onClick={() => setPaidAmount(totalCost)}
              type="button"
              className="btn btn-sm"
            >
              {totalCost?.toFixed(2)}៛
            </button>
            <button
              onClick={() => setPaidAmount(5000)}
              type="button"
              className="btn btn-sm"
            >
              5000.00៛
            </button>
            <button
              onClick={() => setPaidAmount(10000)}
              type="button"
              className="btn btn-sm"
            >
              10000.00៛
            </button>
            <button
              onClick={() => setPaidAmount(20000)}
              type="button"
              className="btn btn-sm"
            >
              20000.00៛
            </button>
          </div>
          <hr className="mt-4 mb-2 h-[2px] bg-gray-200" />
          <div className="mb-2 grid grid-cols-2">
            <label>
              Change Amount:
              <span className="text-red-600 font-semibold">
                {Math.max(paidAmount - totalCost, 0)}៛
              </span>
            </label>
            <label>
              Due Amount:
              <span className="text-red-600 font-semibold">
                {Math.max(totalCost - paidAmount, 0)}៛
              </span>
            </label>
          </div>
          <div className="mt-4">
            <button type="submit" disabled={isLoading} className="btn btn-neutral w-full">
              Save
            </button>
          </div>
        </form>
      </Modal>
      <div className="w-full">
        <h1 className="text-3xl font-bold">Point of Sale</h1>
        <div className="grid grid-cols-12 gap-4 mt-4 items-start">
          <div className="col-span-12  lg:col-span-8 gap-4">
            <div className="mb-3 bg-white p-3 shadow-sm rounded-lg">
              <div className="flex items-center justify-between">
                <h1 className="font-semibold text-lg">Categories</h1>
                <label className="input input-sm input-bordered flex items-center gap-2">
                  <BiSearch size={18} />
                  <input
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    className="grow"
                    value={search}
                    placeholder="Search product"
                  />
                </label>
              </div>
            </div>

            <div className="mb-3 overflow-x-scroll bg-white p-3 shadow-sm rounded-lg">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setCategory("");
                    setCondition("");
                  }}
                  className={`${
                    category === "" && "btn-neutral"
                  } btn btn-sm rounded-lg`}
                >
                  All
                </button>

                {categories?.map((item) => (
                  <button
                    key={item._id}
                    onClick={() => setCategory(item._id)}
                    className={`${
                      category === item._id && "btn-neutral"
                    } btn btn-sm rounded-lg capitalize`}
                  >
                    {item?.name}
                  </button>
                ))}
              </div>
            </div>

            {isProductLoading ? (
              <div className="h-[200px] flex justify-center items-center">
                <span className="loading loading-spinner loading-xl"></span>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {products?.map((item) => (
                  <div
                    onClick={() => handleAddToCart(item)}
                    key={item._id}
                    className="p-3 cursor-pointer bg-white rounded-lg overflow-hidden"
                  >
                    <div>
                      <img
                        className="w-full h-full object-cover"
                        src={`${apiUrl}/upload/${item.imageUrl}`}
                        alt=""
                      />
                    </div>
                    <p className="text-center">{item?.name}</p>
                    <p className="font-medium text-center text-red-600">
                      ${item?.salePrice?.toFixed(2)}៛
                    </p>
                  </div>
                ))}
              </div>
            )}

            {isProductLoading == false && products?.length <= 0 && (
              <div className="flex justify-center items-center h-[200px]">
                <p>No Data!</p>
              </div>
            )}
          </div>

          <div className="col-span-12 bg-white p-3 rounded-lg lg:col-span-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Cart</h4>
              <button
                onClick={handleClearCart}
                className="btn btn-xs btn-error"
              >
                Clear
              </button>
            </div>

            <table className="table-auto w-full border-collapse my-4">
              <thead>
                <tr className="bg-gray-200 text-sm">
                  <th className="p-2">Name</th>
                  <th>Quantity</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>

              {carts?.map((item) => (
                <tbody>
                  <tr className="text-center even:bg-gray-50">
                    <td className="p-2">{item?.name}</td>
                    <td className="p-2">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleDecrement(item?.product)}
                          disabled={item?.quantity === 1}
                          className="btn btn-xs"
                        >
                          -
                        </button>
                        <span>{item?.quantity}</span>
                        <button
                          onClick={() => handleIncrement(item?.product)}
                          className="btn btn-xs"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className=" text-red-600">{item?.totalPrice}៛</td>
                    <td className="">
                      <button
                        onClick={() => handleRemoveItem(item?.product)}
                        className="btn btn-xs text-red-600"
                      >
                        x
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>

            <hr className="h-[2px] bg-gray-200 shadow-sm mb-2" />

            <div className="flex justify-between items-center text-xl mt-2 font-bold text-gray-800">
              <p>TOTAL</p>
              <p>{totalCost?.toFixed(2)}៛</p>
            </div>

            {carts.length >= 1 && (
              <button
                onClick={() => {
                  setIsOpenModal(true);
                }}
                className="btn btn-sm btn-neutral py-2 text-white w-full mt-4"
              >
                Add payment
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default POS;
