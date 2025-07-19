import { useParams } from "react-router";
import { useFindById } from "../../hooks/useFindById";
import { formatDate } from "../../utils/formatDate";
function Invoice() {
  const route = useParams()
  const { data, isLoading } = useFindById("sale/find", route.id)
  console.log(isLoading)
  if (isLoading) {
    return (
      <div className="h-screen grid place-items-center">
        <span className="loading loading-ring loading-xl"></span>
      </div>
    )
  }
  return (
    <div className="w-[80mm] mx-auto font-bold mt-4">

      <h1 className="text-center text-2xl">MCS POS</h1>
      <div className="text-center">វិក្កយបត្រ</div>
      <div className="border-b border-dashed border-black my-2"></div>

      <div className="text-left text-sm mb-1">
        <div className="flex justify-between">
          <span>អតិថិជន:</span>
          <span className="capitalize">{data?.customer?.name}</span>
        </div>
        <div className="flex justify-between">
          <span>អ្នកលក់:</span>
          <span className="capitalize">{data?.user?.username}</span>
        </div>
        <div className="flex justify-between">
          <span>កាលបរិច្ឆេទ:</span>
          <span>{formatDate(data?.createdAt)}</span>
        </div>
        <div className="flex justify-between">
          <span>លេខវិក្កយបត្រ:</span>
          <span className="uppercase">{data?.invoiceNumber}</span>
        </div>
      </div>

      <div className="border-b border-dashed border-black my-2"></div>

      <table className="w-full text-sm">
        <thead>
          <tr className="bg-black text-white">
            <th className="center">ឈ្មោះទំនិញ</th>
            <th className="center">ចំនួន</th>
            <th className="center">តម្លៃរាយ</th>
            <th className="center">សរុប</th>
          </tr>
        </thead>
        <tbody>
          {data?.items?.map((item) => (
            <tr key={item?.product?._id}>
              <td className="text-center">{item?.product?.name}</td>
              <td className="text-center">{item?.quantity}</td>
              <td className="text-center">{item?.unitPrice?.toFixed(2)} $</td>
              <td className="text-center">{item?.totalPrice?.toFixed(2)} $</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="border-b border-dashed border-black my-2"></div>

      <div className="flex justify-between font-bold text-sm bg-black text-white">
        <span>សរុប</span>
        <span>{data?.totalCost?.toFixed(2)} $</span>
      </div>

      <div className="border-b border-dashed border-black my-2"></div>

      <div className=" text-center">សូមអរគុណ!</div>

    </div>
  );
}

export default Invoice;
