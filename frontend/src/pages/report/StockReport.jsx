import { useState } from "react";
import { useStockReport } from "../../hooks/useStockReport";
import { apiUrl } from "../../configs/env";
function StockReport() {
    const [stockQty, setStockQty] = useState("")

    const {fetchReport} = useStockReport()
    const [data, setData] = useState([])
    const handleFiltering = async (e) => {
        e.preventDefault()
        const res = await fetchReport(stockQty)
        if(res){
            setData(res?.result)
        }
    }

    return (
      <>
        <div className="p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">Stock Report</h1>
          </div>
  
          <div className="p-5 bg-white rounded-lg flex justify-center items-center">
            <form onSubmit={handleFiltering} className="flex space-x-4 items-center">
              <div>
                <label htmlFor="" className="block">
                  Stock Quantity
                </label>
                <select
                  required
                  onChange={(e) => setStockQty(e.target.value)}
                  value={stockQty}
                  className="select"
                >
                  <option value="">Select Stock Quantity</option>
                  <option value="5">Quantity less than 5</option>
                  <option value="10">Quantity less than 10</option>
                  <option value="20">Quantity less than 20</option>
                  <option value="40">Quantity less than 40</option>
                  <option value="60">Quantity less than 60</option>
                  <option value="80">Quantity less than 80</option>
                  <option value="100">Quantity less than 100</option>
                  <option value="500">Quantity less than 500</option>
                  <option value="1000">Quantity less than 1000</option>
                </select>
              </div>
              <div className="mt-5 space-x-2">
                <button type="submit" className="btn w-20 btn-neutral text-white">
                  Filter
                </button>
                <button onClick={() => {
                    setStockQty("")
                    setData([])
                }}  type="button" className="btn w-20 btn-error text-white">
                  Clear
                </button>
              </div>
            </form>
          </div>
  
          <div className="overflow-x-auto grid grid-cols-12 bg-white p-5 rounded-lg mt-4">
            <table className="table border col-span-12 border-gray-200">
              {/* head */}
              <thead className="md:text-sm text-slate-600 bg-black/5">
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Code</th>
                  <th>Category</th>
                  <th>Cost Price</th>
                  <th>Sale Price</th>
                  <th>Current Stock</th>
                </tr>
              </thead>
  
              {data?.length > 0 && (
                  <tbody>
                  {data?.map((item, index) => (
                      <tr key={index} className="hover">
                          <th>
                          <img
                              className="w-8"
                              src={`${apiUrl}/upload/${item?.imageUrl}`}
                              alt=""
                          />
                          </th>
                          <td>{item.name}</td>
                          <td>{item.code}</td>
                          <td>{item.category?.name}</td>
                          <td>{item.costPrice}</td>
                          <td>{item.salePrice}</td>
                          <td>{item.currentStock}</td>
                      </tr>
                      ))}
                  </tbody>
              )}
  
              {data?.length <= 0 && (
                  <tbody>
                      <tr>
                          <td colSpan={7} className="text-center">No Data!</td>
                      </tr>
                  </tbody>
              )}
  
            </table>
          </div>
        </div>
      </>
    );
  }
  
  export default StockReport;
  