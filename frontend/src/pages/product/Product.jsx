
import { Link } from 'react-router'
import { useQuery } from '../../hooks/useQuery'
import { IoMdTrash } from 'react-icons/io'
import { useState } from 'react'
import { useCollection } from '../../hooks/useCollection'
import toast from 'react-hot-toast'
import { apiUrl } from '../../configs/env'
import { FaEdit } from 'react-icons/fa'
function Product() {
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [refetch, setRefetch] = useState(false)

    const { data: products, totalPage, isLoading } = useQuery("products", search, page, limit, refetch)
    console.log(products)
    const { remove, isLoading: isDeleting } = useCollection("products")
    const handleDelete = async (id) => {
        if (confirm("Are you sure! you want to delete?")) {
            const res = await remove(id)
            if (res && isDeleting == false) {
                setRefetch(!refetch)
                toast.success("deleted successfully!")
            }
        }

    }

    return (
        <>
            <div className='flex items-center justify-between'>
                <h1 className='text-xl font-semibold'>Product</h1>
                <Link to="/product/create" className='btn btn-sm btn-neutral'>+ ថ្មី</Link>
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
                                <th>រូបភាព</th>
                                <th>ឈ្មោះទំនិញ</th>
                                <th>ប្រភេទទំនិញ</th>
                                <th>កូដផលិតផល</th>
                                <th>តម្លៃដើម</th>
                                <th>តម្លៃលក់</th>
                                <th>ស្តុក</th>
                                <th>សំគាល់</th>
                                <th>ប្រតិបត្តិការ</th>
                            </tr>
                        </thead>

                        {
                            (products?.length == 0 && isLoading == false) && (
                                <tbody>
                                    <tr>
                                        <td colSpan={9} >
                                            <div className='flex justify-center'>
                                                <p>គ្មានទិន្នន័យ!</p>
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
                                        products?.map((item, idx) => (
                                            <tr className="hover:bg-base-300" key={idx}>
                                                <th>
                                                    <img src={`${apiUrl}/upload/${item.imageUrl}`} alt="" width={50} />
                                                </th>
                                                <td>{item?.name}</td>
                                                <td>{item?.category?.name}</td>
                                                <td>{item?.code}</td>
                                                <td className='text-red-600 font-bold'>{item?.costPrice} $</td>
                                                <td className='text-red-600 font-bold'>{item?.salePrice} $</td>
                                                <td>{item?.currentStock}</td>
                                                <td>{item?.note}</td>
                                                <td className='flex items-center gap-2'>
                                                    <Link to={`/product/edit/${item._id}`} className='text-lg text-blue-500 cursor-pointer'>
                                                        <FaEdit />
                                                    </Link>
                                                    <button onClick={() => handleDelete(item._id)} type='button' className='text-lg text-error cursor-pointer'>
                                                        <IoMdTrash />
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

export default Product