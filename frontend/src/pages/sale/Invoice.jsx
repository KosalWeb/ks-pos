import { useParams } from "react-router";
import { useFindById } from "../../hooks/useFindById";
import { formatDate } from "../../utils/formatDate";
function Invoice() {
    const route = useParams()
    const {data, isLoading} = useFindById("sale/find", route.id)
    if(isLoading){
        return (
            <div className="h-screen grid place-items-center">
                    <span className="loading loading-ring loading-xl"></span>
            </div>
        )
    }
    return (
      <div className="w-[80mm] mx-auto font-bold mt-4">

        <h1 className="text-center text-2xl">MASTER POS</h1>
        <div className="text-center">Receipt</div>
        <div className="border-b border-dashed border-black my-2"></div>
  
        <div className="text-left text-sm mb-1">
          <div className="flex justify-between">
            <span>Customer:</span>
            <span className="capitalize">{data?.customer?.name}</span>
          </div>
          <div className="flex justify-between">
            <span>Sale by:</span>
            <span className="capitalize">{data?.user?.username}</span>
          </div>
          <div className="flex justify-between">
            <span>Date:</span>
            <span>{formatDate(data?.createdAt)}</span>
          </div>
          <div className="flex justify-between">
            <span>Invoice:</span>
            <span className="uppercase">{data?.invoiceNumber}</span>
          </div>
        </div>
  
        <div className="border-b border-dashed border-black my-2"></div>
  
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-black text-white">
              <th className="left">Item</th>
              <th className="center">Qty</th>
              <th className="center">Unit</th>
              <th className="right">Price</th>
            </tr>
          </thead>
          <tbody>
            {data?.items?.map((item) => (
              <tr key={item?.product?._id}>
                <td className="text-left">{item?.product?.name}</td>
                <td className="text-center">{item?.quantity}</td>
                <td className="text-center">{item?.unitPrice}៛</td>
                <td className="text-right">{item?.totalPrice}៛</td>
              </tr>
            ))}
          </tbody>
        </table>
  
        <div className="border-b border-dashed border-black my-2"></div>
  
        <div className="flex justify-between font-bold text-sm bg-black text-white">
          <span>Total</span>
          <span>{data?.totalCost}៛</span>
        </div>
  
        <div className="border-b border-dashed border-black my-2"></div>
  
        <div className=" text-center">Thank you!</div>
    
      </div>
    );
  }
  
  export default Invoice;
  