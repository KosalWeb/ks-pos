import React, { useState } from 'react'
import { AiFillHome } from 'react-icons/ai'
import { BiUser } from 'react-icons/bi'
import { FaCashRegister, FaUserFriends } from 'react-icons/fa'
import { FaHandshakeSimple, FaUser } from 'react-icons/fa6'
import { GoChevronDown } from 'react-icons/go'
import { IoBagHandle } from 'react-icons/io5'
import { MdCategory } from 'react-icons/md'
import { PiPackageFill } from 'react-icons/pi'
import { TbActivityHeartbeat } from 'react-icons/tb'
import { NavLink } from 'react-router'

function Sidebar(props) {
  const { isShowSidebar } = props
  const [isToggleSale, setIsToggleSale] = useState(false)
  const [isToggleReport, setIsToggleReport] = useState(false)
  return (
    <div className={`${isShowSidebar ? 'w-[260px]' : 'w-0'} min-h-screen border-l border bg-white overflow-hidden transition-all duration-300 fixed top-0 left-0`}>
      <h1 className='h-[64px] flex items-center justify-center text-xl font-bold text-nowrap'>Master POS</h1>
      <ul className='p-2 space-y-2'>
        <li>
          <NavLink
            to="/"
            className="flex items-center gap-2 hover:bg-base-200 transition-all duration-300 p-2 w-full rounded-md aria-[current=page]:bg-neutral aria-[current=page]:text-white"
          >
            <span> <AiFillHome /> </span>
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/customer"
            className="flex items-center gap-2 hover:bg-base-200 transition-all duration-300 p-2 w-full rounded-md aria-[current=page]:bg-neutral aria-[current=page]:text-white"
          >
            <span> <FaUserFriends /> </span>
            <span>Customer</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/supplier"
            className="flex items-center gap-2 hover:bg-base-200 transition-all duration-300 p-2 w-full rounded-md aria-[current=page]:bg-neutral aria-[current=page]:text-white"
          >
            <span> <FaHandshakeSimple /> </span>
            <span>Supplier</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/category"
            className="flex items-center gap-2 hover:bg-base-200 transition-all duration-300 p-2 w-full rounded-md aria-[current=page]:bg-neutral aria-[current=page]:text-white"
          >
            <span> <MdCategory /> </span>
            <span>Category</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/product"
            className="flex items-center gap-2 hover:bg-base-200 transition-all duration-300 p-2 w-full rounded-md aria-[current=page]:bg-neutral aria-[current=page]:text-white"
          >
            <span> <PiPackageFill /> </span>
            <span>Product</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/purchase"
            className="flex items-center gap-2 hover:bg-base-200 transition-all duration-300 p-2 w-full rounded-md aria-[current=page]:bg-neutral aria-[current=page]:text-white"
          >
            <span> <IoBagHandle /> </span>
            <span>Purchase</span>
          </NavLink>
        </li>

        <li>
              <button onClick={() => setIsToggleSale(!isToggleSale)} className='flex items-center justify-between gap-2 hover:bg-base-200 transition-all duration-300 p-2 w-full rounded-md aria-[current=page]:bg-neutral aria-[current=page]:text-white'>
                      <div className='flex items-center gap-2'>
                            <FaCashRegister />
                            <span>Sale</span>
                      </div>
                      <span className={`${isToggleSale ? 'rotate-180' : ''} transition-all duration-300`}>
                            <GoChevronDown />
                      </span>
              </button>

              <ul className={`p-2 bg-base-200 mt-1 rounded-md ${isToggleSale ? 'block' : 'hidden'}`}>
                   <li>
                        <NavLink to="/sale/list" className="flex items-center gap-2 text-sm  transition-all duration-300 p-2 w-full aria-[current=page]:font-semibold">
                              <TbActivityHeartbeat />
                              <span>List Sale</span>
                        </NavLink>
                   </li>
                   <li>
                        <NavLink to="/sale/pos" className="flex items-center gap-2 text-sm  transition-all duration-300 p-2 w-full aria-[current=page]:font-semibold">
                              <TbActivityHeartbeat />
                              <span>POS</span>
                        </NavLink>
                   </li>
              </ul>
        </li>

        <li>
          <NavLink
            to="/user"
            className="flex items-center gap-2 hover:bg-base-200 transition-all duration-300 p-2 w-full rounded-md aria-[current=page]:bg-neutral aria-[current=page]:text-white"
          >
            <span> <FaUser/> </span>
            <span>User</span>
          </NavLink>
        </li>

        <li>
              <button onClick={() => setIsToggleReport(!isToggleReport)} className='flex items-center justify-between gap-2 hover:bg-base-200 transition-all duration-300 p-2 w-full rounded-md aria-[current=page]:bg-neutral aria-[current=page]:text-white'>
                      <div className='flex items-center gap-2'>
                            <FaCashRegister />
                            <span>Report</span>
                      </div>
                      <span className={`${isToggleReport ? 'rotate-180' : ''} transition-all duration-300`}>
                            <GoChevronDown />
                      </span>
              </button>

              <ul className={`p-2 bg-base-200 mt-1 rounded-md ${isToggleReport ? 'block' : 'hidden'}`}>
                   <li>
                        <NavLink to="/report/sale" className="flex items-center gap-2 text-sm  transition-all duration-300 p-2 w-full aria-[current=page]:font-semibold">
                              <TbActivityHeartbeat />
                              <span>Sale Report</span>
                        </NavLink>
                   </li>
                   <li>
                        <NavLink to="/report/stock" className="flex items-center gap-2 text-sm  transition-all duration-300 p-2 w-full aria-[current=page]:font-semibold">
                              <TbActivityHeartbeat />
                              <span>Stock Report</span>
                        </NavLink>
                   </li>
              </ul>
        </li>

      
      </ul>
    </div>
  )
}

export default Sidebar