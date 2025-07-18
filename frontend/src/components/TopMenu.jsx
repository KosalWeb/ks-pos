import React from 'react'
import { FaListUl, FaUserCheck, FaUserCog } from 'react-icons/fa'
import { GiTwoCoins } from 'react-icons/gi'
import { MdEmail } from 'react-icons/md'
import { TbLogout2 } from 'react-icons/tb'
import { useSignout } from '../hooks/auth/useSignout'
import { useNavigate } from 'react-router'
import { useCurrent } from '../hooks/auth/useCurrent'
function TopMenu(props) {
    const { onShowSidebar } = props
    const { isLoading, signout } = useSignout()
    const {data: user} = useCurrent()
    const navigate = useNavigate()

    const handleSignout = async () => {
        const res = await signout()
        if (res?.success) {
            navigate("/signin")
        }
    }

    return (
        <div className='h-[64px] border-b flex items-center justify-between w-full p-4'>
            
            {
                user?.role === "cashier" && (
                    <h1 className='text-lg md:text-xl lg:text-2xl font-bold'>KOSAL POS</h1> 
                ) 
            }

            {
                user?.role != "cashier" && (
                    <button onClick={onShowSidebar} type='button' className='text-lg text-gray-800'>
                        <FaListUl />
                    </button>
                )
            }

            <div className='flex items-center gap-2'>
                <button className='flex items-center gap-2 btn btn-neutral btn-sm btn-outline'>
                    <span>
                        <GiTwoCoins />
                    </span>
                    <span>POS</span>
                </button>

                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-sm m-1 flex items-center gap-2">
                        <FaUserCog />
                        <span className='capitalize'>{user?.username}</span>
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                        <li className='border-b border-gray-200'>
                            <a href="" className='flex items-center gap-2 p-2'>
                                <span> <FaUserCheck /> </span>
                                <span>{user?.role}</span>
                            </a>

                        </li>

                        <li className='border-b border-gray-200'>
                            <a href="" className='flex items-center gap-2 p-2'>
                                <span> <MdEmail /> </span>
                                <span>{user?.email}</span>
                            </a>
                        </li>

                        <li>
                            <button onClick={handleSignout} type="button" className='flex items-center gap-2 text-red-600'>

                                {
                                    isLoading ? (
                                        <span className="loading loading-spinner loading-md"></span>
                                    ) : (
                                        <>
                                            <span>
                                                <TbLogout2 />
                                            </span>
                                            <span>ចាកចេញ</span>
                                        </>
                                    )
                                }
                            </button>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TopMenu