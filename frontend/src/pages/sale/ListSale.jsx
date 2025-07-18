
import { Link } from 'react-router'
import { useQuery } from '../../hooks/useQuery'
import { useState } from 'react'
import { FaCreditCard } from 'react-icons/fa6'
import { TbTruckDelivery } from 'react-icons/tb'
import { formatDate } from '../../utils/formatDate'
import { FaEye } from 'react-icons/fa'
import SalePaymentModal from './SalePaymentModal'

function ListSale() {
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [refetch, setRefetch] = useState(false)
    const [editId, setEditId] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const { data: sales, totalPage, isLoading } = useQuery("sale", search, page, limit, refetch)
    return (
        <>
            <SalePaymentModal
                open={isOpen}
                editId={editId}
                onClose={() => {
                    setIsOpen(false)
                    setEditId("")
                    setRefetch(!refetch)
                }}
            />
            <div className='flex items-center justify-between'>
                <h1 className='text-xl font-semibold'>List Sale</h1>
                <Link to="/sale/pos" className='btn btn-sm btn-neutral'>+ New</Link>
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
                            <tr>
                                <th>N.o</th>
                                <th>Invoice</th>
                                <th>Sale By</th>
                                <th>Customer</th>
                                <th>Total Cost</th>
                                <th>Due Amount</th>
                                <th>Paid Amount</th>
                                <th>Change Amount</th>
                                <th>Payment Status</th>
                                <th>Created At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        {
                            (sales?.length == 0 && isLoading == false) && (
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
                                        sales?.map((item, idx) => (
                                            <tr className="hover:bg-base-300" key={idx}>
                                                <th>{idx + 1}</th>
                                                <td>{item?.invoiceNumber}</td>
                                                <td>{item?.user?.username}</td>
                                                <td>{item?.customer?.name}</td>
                                                <td className='text-red-600 font-semibold'>{item?.totalCost?.toFixed(0)}៛</td>
                                                <td className='text-red-600 font-semibold'>{item?.dueAmount?.toFixed(0)}៛</td>
                                                <td className='text-red-600 font-semibold'>{item?.paidAmount?.toFixed(0)}៛</td>
                                                <td className='text-red-600 font-semibold'>{item?.changeAmount?.toFixed(0)}៛</td>
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

                                                <td>{formatDate(item?.createdAt)}</td>
                                                <td className='flex items-center gap-2'>
                                                    <button
                                                        disabled={item?.paymentStatus === "paid"}
                                                        type='button'
                                                        onClick={() => {
                                                            setIsOpen(true)
                                                            setEditId(item._id)
                                                        }}
                                                        className={`text-lg ${item?.paymentStatus === "paid" ? "text-gray-500 cursor-not-allowed" : "text-green-500 cursor-pointer"}`}
                                                    >
                                                        <FaCreditCard />
                                                    </button>

                                                    <Link
                                                        to={`/sale/invoice/${item._id}`}
                                                        target='_blank'
                                                        className={`text-lg text-gray-600 cursor-pointer`}
                                                    >
                                                        <FaEye />
                                                    </Link>

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

export default ListSale