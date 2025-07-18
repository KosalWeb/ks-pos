import { useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { useSaleReport } from "../../hooks/useSaleReport";

function SaleReport() {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [data, setData] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)

  const { fetchReport } = useSaleReport()

  const handleFiltering = async (e) => {
    e.preventDefault()
    const res = await fetchReport(startDate, endDate)
    if (res) {
      setData(res?.result)
      setTotalAmount(res?.totalAmount)
    }
  }

  return (
    <>
      <div className="p-4">
        <div className="flex justify-between items-center p-4">
          <h1 className="text-xl font-semibold">របាយការណ៍ លក់</h1>
        </div>

        <div className="p-4 bg-white rounded-lg flex justify-center items-center">
          <form onSubmit={handleFiltering} className="flex space-x-4 items-center">
            <div>
              <label htmlFor="" className="block">
                ចាប់ពី
              </label>
              <input
                type="date"
                onChange={(e) => setStartDate(e.target.value)}
                value={startDate}
                className="input"
                required
              />
            </div>
            <div>
              <label htmlFor="" className="block">
                រហូតដល់
              </label>
              <input
                type="date"
                onChange={(e) => setEndDate(e.target.value)}
                value={endDate}
                className="input"
                required
              />
            </div>
            <div className="mt-5 space-x-2">
              <button className="btn w-25 btn-neutral text-white">
                ទាញទិន្នន័យ
              </button>
              <button
                onClick={() => {
                  setStartDate("")
                  setEndDate("")
                  setData([])
                  setTotalAmount(0)
                }}
                type="button"
                className="btn w-20 btn-error text-white"
              >
                សម្អាត
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white p-5 rounded-lg mt-3">
          <div className="overflow-x-auto grid grid-cols-12">
            <table className="table border col-span-12 border-gray-200">
              {/* head */}
              <thead className="md:text-sm text-slate-600 bg-black/5">
                <tr>
                  <th>ល.រ</th>
                  <th>វិក្កបត្រ</th>
                  <th>អ្នកលក់</th>
                  <th>អតិថិជន</th>
                  <th>តម្លៃដើម</th>
                  <th>សរុប</th>
                  <th>ជំពាក់</th>
                  <th>ប្រាក់អាប់</th>
                  <th>ការបង់ប្រាក់</th>
                  <th>កាលបរិច្ឆេទ</th>
                </tr>
              </thead>

              {data?.length > 0 && (
                <tbody>
                  {data?.map((item, index) => (
                    <tr key={index} className="hover">
                      <td>{index + 1}</td>
                      <td>{item?.invoiceNumber}</td>
                      <td className="capitalize">{item?.user?.username}</td>
                      <td>{item.customer?.name}</td>
                      <td className="text-red-600 font-semibold">
                        {item?.totalCost?.toFixed(2)}៛
                      </td>
                      <td className="text-red-600 font-semibold">
                        {item?.paidAmount?.toFixed(2)}៛
                      </td>
                      <td className="text-red-600 font-semibold">
                        {item?.dueAmount?.toFixed(2)}៛
                      </td>
                      <td className="text-red-600 font-semibold">
                        {item?.changeAmount?.toFixed(2)}៛
                      </td>
                      <td>
                        <span
                          className={`
                                    text-xs font-medium me-2 px-2.5 py-0.5 rounded uppercase
                                    ${item?.paymentStatus == "paid" &&
                            "bg-green-100 text-green-800"
                            }
                                    ${item?.paymentStatus == "due" &&
                            "bg-red-100 text-red-800"
                            }
                                    ${item?.paymentStatus == "partial" &&
                            "bg-yellow-100 text-yellow-800"
                            }
                                    ${item?.paymentStatus == "overpaid" &&
                            "bg-blue-100 text-blue-800"
                            }
                                
                                `}
                        >
                          {item.paymentStatus}
                        </span>
                      </td>
                      <td>{formatDate(item.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              )}

              {data?.length <= 0 && (
                <tbody>
                  <tr>
                    <td colSpan={10} className="text-center">
                      <p className='text-red-400'>គ្មានទិន្នន័យ!</p>
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
          <div className="flex justify-end items-center mt-3">
            <h1>
              សរុបរួម:
              <span className="text-red-500 font-semibold">
                <span> </span>{totalAmount}៛
              </span>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default SaleReport;
