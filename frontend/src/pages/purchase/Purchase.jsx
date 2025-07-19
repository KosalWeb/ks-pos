
import { Link } from 'react-router'
import { useQuery } from '../../hooks/useQuery'
import { useState } from 'react'
import { FaCreditCard } from 'react-icons/fa6'
import { TbTruckDelivery } from 'react-icons/tb'
import { formatDate } from '../../utils/formatDate'
import PurchaseStatusModal from './PurchaseStatusModal'
import PurchasePaymentStatusModal from './PurchasePaymentStatusModal'


function Purchase() {
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [refetch, setRefetch] = useState(false)
    const [editId, setEditId] = useState("")

    const [isOpenStatus, setIsOpenStatus] = useState(false)
    const [isOpenPaymentStatus, setIsOpenPaymentStatus] = useState(false)

    const { data: purchases, totalPage, isLoading } = useQuery("purchase", search, page, limit, refetch)

    return (
        <>
            <PurchaseStatusModal
                open={isOpenStatus}
                editId={editId}
                onClose={() => {
                    setIsOpenStatus(false)
                    setRefetch(!refetch)
                    setEditId("")
                }}
            />

            <PurchasePaymentStatusModal
                open={isOpenPaymentStatus}
                editId={editId}
                onClose={() => {
                    setIsOpenPaymentStatus(false)
                    setRefetch(!refetch)
                    setEditId("")
                }}
            />

            <div className='flex items-center justify-between'>
                <h1 className='text-xl font-semibold'>Purchase</h1>
                <Link to="/purchase/create" className='btn btn-sm btn-neutral'>+ ថ្មី</Link>
            </div>

            <div className='bg-white mt-4 p-4 rounded-md border border-gray-200'>

                <div className='flex items-center justify-between'>
                    <select onChange={(e) => setLimit(e.target.value)} value={limit} className='select select-sm w-fit select-bordered'>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>

                    <label className="input input-sm">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
                        <input type="search" onChange={(e) => setSearch(e.target.value)} placeholder="Search" />
                    </label>
                </div>


                <div className="overflow-x-auto mt-4">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr >
                                <th>ល.រ</th>
                                <th>អ្នកផ្គត់ផ្គង់</th>
                                <th>អ្នកលក់</th>
                                <th>តម្លៃដើម</th>
                                <th>ប្រាក់ជំពាក់</th>
                                <th>ទូទាត់រួច</th>
                                <th>ប្រាក់អាប់</th>
                                <th>ស្ថានភាពបង់ប្រាក់</th>
                                <th>ស្ថានភាពទិញ</th>
                                <th>កាលបរិច្ឆេទ</th>
                                <th>ប្រតិបត្តិការ</th>
                            </tr>
                        </thead>

                        {
                            (purchases?.length == 0 && isLoading == false) && (
                                <tbody>
                                    <tr>
                                        <td colSpan={11} >
                                            <div className='flex justify-center'>
                                                <p className='text-red-400'>គ្មានទិន្នន័យ!</p>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            )
                        }

                        {
                            isLoading ? (
                                <tbody>
                                    <tr>
                                        <td colSpan={6} >
                                            <div className='flex justify-center'>
                                                <span className="loading loading-spinner loading-sm"></span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            ) : (
                                <tbody>

                                    {
                                        purchases?.map((item, idx) => (
                                            <tr className="hover:bg-base-300" key={idx}>
                                                <th>{idx + 1}</th>
                                                <td>{item?.supplier?.businessName}</td>
                                                <td>{item?.user?.username}</td>

                                                <td className='text-red-600 font-semibold'>{item?.totalCost?.toFixed(2)} $</td>
                                                <td className='text-red-600 font-semibold'>{item?.dueAmount?.toFixed(2)} $</td>
                                                <td className='text-red-600 font-semibold'>{item?.paidAmount?.toFixed(2)} $</td>
                                                <td className='text-red-600 font-semibold'>{item?.changeAmount?.toFixed(2)} $</td>
                                                <td>
                                                    <span
                                                        className={`
                                                            text-xs font-medium me-2 px-2.5 py-0.5 rounded uppercase 
                                                            ${item?.paymentStatus === "paid" && "bg-green-100 text-green-800"}
                                                            ${item?.paymentStatus === "due" && "bg-red-100 text-red-800"}
                                                            ${item?.paymentStatus === "partial" && "bg-yellow-100 text-yellow-800"}
                                                        `}
                                                    >
                                                        {item?.paymentStatus}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span
                                                        className={`
                                                            text-xs font-medium me-2 px-2.5 py-0.5 rounded uppercase 
                                                            ${item?.purchaseStatus === "received" && "bg-green-100 text-green-800"}
                                                            ${item?.purchaseStatus === "pending" && "bg-yellow-100 text-yellow-800"}
                                                            ${item?.purchaseStatus === "ordered" && "bg-blue-100 text-blue-800"}
                                                            ${item?.purchaseStatus === "cancel" && "bg-red-100 text-red-800"}
                                                        `}
                                                    >
                                                        {item?.purchaseStatus}
                                                    </span>
                                                </td>
                                                <td>{formatDate(item?.purchaseDate)}</td>
                                                <td className='flex items-center gap-2'>
                                                    <button
                                                        disabled={item?.paymentStatus === "paid"}
                                                        onClick={() => {
                                                            setIsOpenPaymentStatus(true)
                                                            setEditId(item?._id)
                                                        }}
                                                        type='button'
                                                        className={`text-lg ${item?.paymentStatus === "paid" ? "text-gray-500 cursor-not-allowed" : "text-green-500 cursor-pointer"}`}
                                                    >
                                                        <FaCreditCard />
                                                    </button>
                                                    <button
                                                        type='button'
                                                        disabled={item?.purchaseStatus === "received"}
                                                        onClick={() => {
                                                            setIsOpenStatus(true)
                                                            setEditId(item?._id)
                                                        }}
                                                        className={`text-lg ${item?.purchaseStatus === "received" ? "text-gray-500 cursor-not-allowed" : "text-green-500 cursor-pointer"}`}>
                                                        <TbTruckDelivery />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            )
                        }



                    </table>
                </div>

                <div className='flex justify-end mt-4'>
                    <div className="join">
                        <button className="join-item btn btn-sm" onClick={() => setPage(page - 1)} disabled={page == 1}>«</button>
                        <button className="join-item btn btn-sm">Page {page}</button>
                        <button className="join-item btn btn-sm" onClick={() => setPage(page + 1)} disabled={page == totalPage}>»</button>
                    </div>

                </div>

            </div>

        </>
    )
}

export default Purchase