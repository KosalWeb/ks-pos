import { HiCurrencyDollar } from "react-icons/hi2";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { HiDocumentCurrencyDollar } from "react-icons/hi2";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";
import { FaFileInvoice } from "react-icons/fa6";
import { useGeneralReport } from "../hooks/useGeneralReport";
import RevenueChart from "../components/RevenueChart";
function Dashboard() {
  const { data, isLoading } = useGeneralReport()
  console.log(data)
  return (
    <>
      <div className="p-4">

        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold capitalize">របាយការណ៍</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-4">
          <div className="bg-white flex justify-between items-start p-3 shadow-sm rounded-lg py-5">
            <div className="space-y-1">
              <p className="text-sm text-slate-600">ចំណូលថ្ងៃនេះ</p>
              <h2 className="text-3xl  font-semibold">
                {isLoading ? (<span className="loading loading-spinner loading-xs"></span>) : data?.totalSaleToday}៛
              </h2>
            </div>
            <div className="p-2 bg-slate-200/30 rounded-full">
              <span className="text-3xl text-slate-700">
                <HiCurrencyDollar />
              </span>
            </div>
          </div>
          <div className="bg-white flex justify-between items-start p-3 shadow-sm rounded-lg py-5">
            <div className="space-y-1">
              <p className="text-sm text-slate-600">អតិថិជនជំពាក់ថ្ងៃនេះ</p>
              <h2 className="text-3xl font-semibold">{isLoading ? ((<span className="loading loading-spinner loading-xs"></span>)) : data?.totalDueAmountSale}៛</h2>
            </div>
            <div className="p-2 bg-slate-200/30 rounded-full">
              <span className="text-3xl text-slate-700">
                <FaFileInvoiceDollar />
              </span>
            </div>
          </div>
          <div className="bg-white flex justify-between items-start p-3 shadow-sm rounded-lg py-5">
            <div className="space-y-1">
              <p className="text-sm text-slate-600">ទិញជំពាក់ថ្ងៃនេះ</p>
              <h2 className="text-3xl font-semibold">{isLoading ? ((<span className="loading loading-spinner loading-xs"></span>)) : data?.totalDueAmountPurchase}៛</h2>
            </div>
            <div className="p-2 bg-slate-200/30 rounded-full">
              <span className="text-3xl text-slate-700">
                <HiDocumentCurrencyDollar />
              </span>
            </div>
          </div>
          <div className="bg-white flex justify-between items-start p-3 shadow-sm rounded-lg py-5">
            <div className="space-y-1">
              <p className="text-sm text-slate-600">ចំណូលប្រចាំខែ</p>
              <h2 className="text-3xl font-semibold">{isLoading ? ((<span className="loading loading-spinner loading-xs"></span>)) : data?.totalMonthlySale}៛</h2>
            </div>
            <div className="p-2 bg-slate-200/30 rounded-full">
              <span className="text-3xl text-slate-700">
                <FaCircleDollarToSlot />
              </span>
            </div>
          </div>


          <div className="bg-orange-400 text-white flex justify-between items-start p-3 shadow-sm rounded-lg py-5">
            <div className="space-y-1">
              <p className="text-sm font-semibold">ចំនួនអតិថិជន</p>
              <h2 className="text-3xl font-semibold">{isLoading ? ((<span className="loading loading-spinner loading-xs"></span>)) : data?.totalCustomers} នាក់</h2>
            </div>
            <div className="p-2">
              <span className="text-3xl">
                <FaUser />
              </span>
            </div>
          </div>
          <div className="bg-blue-400 text-white flex justify-between items-start p-3 shadow-sm rounded-lg py-5">
            <div className="space-y-1">
              <p className="text-sm font-semibold">ចំនួនអ្នកផ្គត់ផ្គង់</p>
              <h2 className="text-3xl font-semibold">{isLoading ? ((<span className="loading loading-spinner loading-xs"></span>)) : data?.totalSuppliers} នាក់</h2>
            </div>
            <div className="p-2">
              <span className="text-3xl">
                <FaHandshake />
              </span>
            </div>
          </div>
          <div className="bg-green-400 text-white flex justify-between items-start p-3 shadow-sm rounded-lg py-5">
            <div className="space-y-1">
              <p className="text-sm font-semibold">ចំនួនអ្នកអតិថិជនជំពាក់</p>
              <h2 className="text-3xl font-semibold">{isLoading ? ((<span className="loading loading-spinner loading-xs"></span>)) : data?.totalSaleDue} នាក់</h2>
            </div>
            <div className="p-2">
              <span className="text-3xl">
                <FaFileInvoice />
              </span>
            </div>
          </div>
          <div className="bg-slate-700 text-white flex justify-between items-start p-3 shadow-sm rounded-lg py-5">
            <div className="space-y-1">
              <p className="text-sm font-semibold">ចំនួនអ្នកទិញជំពាក់</p>
              <h2 className="text-3xl font-semibold">{isLoading ? ((<span className="loading loading-spinner loading-xs"></span>)) : data?.totalPurchaseDue} នាក់</h2>
            </div>
            <div className="p-2">
              <span className="text-3xl">
                <FaFileInvoice />
              </span>
            </div>
          </div>


        </div>

        <div className="bg-white border border-gray-100 px-4 py-8 rounded-lg shadow-sm mt-4">
          <RevenueChart />
        </div>

      </div>
    </>
  )
}

export default Dashboard
