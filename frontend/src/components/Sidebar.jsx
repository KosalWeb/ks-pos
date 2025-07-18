import React, { useState } from 'react'
import { AiFillHome, AiOutlineAreaChart } from 'react-icons/ai'
import { BiSolidCartAdd, BiSolidCategory } from 'react-icons/bi'
import { FaListAlt, FaUserFriends } from 'react-icons/fa'
import { FaChartLine, FaHandshakeSimple, FaUser } from 'react-icons/fa6'
import { GoChevronDown } from 'react-icons/go'
import { IoBagHandle } from 'react-icons/io5'
import { MdOutlineProductionQuantityLimits } from 'react-icons/md'
import { TbActivityHeartbeat } from 'react-icons/tb'
import { LuComputer } from "react-icons/lu";
import { NavLink } from 'react-router'

function Sidebar(props) {
  const { isShowSidebar } = props
  const [isToggleSale, setIsToggleSale] = useState(false)
  const [isToggleReport, setIsToggleReport] = useState(false)
  return (
    <div className={`${isShowSidebar ? 'w-[260px]' : 'w-0'} min-h-screen border-l border bg-white overflow-hidden transition-all duration-300 fixed top-0 left-0`}>
      <h1 className='h-[64px] flex items-center justify-center text-xl font-bold text-nowrap'>ប្រព័ន្ធគ្រប់គ្រងការលក់</h1>
      <ul className='p-2 space-y-2'>
        <li>
          <NavLink
            to="/"
            className="flex items-center gap-2 hover:bg-base-200 transition-all duration-300 p-2 w-full rounded-md aria-[current=page]:bg-neutral aria-[current=page]:text-white"
          >
            <span> <AiFillHome /> </span>
            <span>ទំព័រដើម</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/customer"
            className="flex items-center gap-2 hover:bg-base-200 transition-all duration-300 p-2 w-full rounded-md aria-[current=page]:bg-neutral aria-[current=page]:text-white"
          >
            <span> <FaUserFriends /> </span>
            <span>អតិថិជន</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/supplier"
            className="flex items-center gap-2 hover:bg-base-200 transition-all duration-300 p-2 w-full rounded-md aria-[current=page]:bg-neutral aria-[current=page]:text-white"
          >
            <span> <FaHandshakeSimple /> </span>
            <span>អ្នកផ្គត់ផ្គង់</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/category"
            className="flex items-center gap-2 hover:bg-base-200 transition-all duration-300 p-2 w-full rounded-md aria-[current=page]:bg-neutral aria-[current=page]:text-white"
          >
            <span> <BiSolidCategory /> </span>
            <span>ប្រភេទទំនិញ</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/product"
            className="flex items-center gap-2 hover:bg-base-200 transition-all duration-300 p-2 w-full rounded-md aria-[current=page]:bg-neutral aria-[current=page]:text-white"
          >
            <span> <MdOutlineProductionQuantityLimits /> </span>
            <span>ផលិតផល</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/purchase"
            className="flex items-center gap-2 hover:bg-base-200 transition-all duration-300 p-2 w-full rounded-md aria-[current=page]:bg-neutral aria-[current=page]:text-white"
          >
            <span> <IoBagHandle /> </span>
            <span>ការទិញ</span>
          </NavLink>
        </li>

        <li>
          <button onClick={() => setIsToggleSale(!isToggleSale)} className='flex items-center justify-between gap-2 hover:bg-base-200 transition-all duration-300 p-2 w-full rounded-md aria-[current=page]:bg-neutral aria-[current=page]:text-white'>
            <div className='flex items-center gap-2'>
              <LuComputer />
              <span>ការលក់</span>
            </div>
            <span className={`${isToggleSale ? 'rotate-180' : ''} transition-all duration-300`}>
              <GoChevronDown />
            </span>
          </button>

          <ul className={`p-2 bg-base-200 mt-1 rounded-md ${isToggleSale ? 'block' : 'hidden'}`}>
            <li>
              <NavLink to="/sale/list" className="flex items-center gap-2 text-sm  transition-all duration-300 p-2 w-full aria-[current=page]:font-semibold">
                <FaListAlt />
                <span>បញ្ជីលក់</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/sale/pos" className="flex items-center gap-2 text-sm  transition-all duration-300 p-2 w-full aria-[current=page]:font-semibold">
                <BiSolidCartAdd />
                <span>ប្រតិបត្តិការលក់</span>
              </NavLink>
            </li>
          </ul>
        </li>

        <li>
          <NavLink
            to="/user"
            className="flex items-center gap-2 hover:bg-base-200 transition-all duration-300 p-2 w-full rounded-md aria-[current=page]:bg-neutral aria-[current=page]:text-white"
          >
            <span> <FaUser /> </span>
            <span>អ្នកប្រើប្រាស់</span>
          </NavLink>
        </li>

        <li>
          <button onClick={() => setIsToggleReport(!isToggleReport)} className='flex items-center justify-between gap-2 hover:bg-base-200 transition-all duration-300 p-2 w-full rounded-md aria-[current=page]:bg-neutral aria-[current=page]:text-white'>
            <div className='flex items-center gap-2'>
              <FaChartLine />
              <span>របាយការណ៍</span>
            </div>
            <span className={`${isToggleReport ? 'rotate-180' : ''} transition-all duration-300`}>
              <GoChevronDown />
            </span>
          </button>

          <ul className={`p-2 bg-base-200 mt-1 rounded-md ${isToggleReport ? 'block' : 'hidden'}`}>
            <li>
              <NavLink to="/report/sale" className="flex items-center gap-2 text-sm  transition-all duration-300 p-2 w-full aria-[current=page]:font-semibold">
                <AiOutlineAreaChart />
                <span>របាយការណ៍លក់</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/report/stock" className="flex items-center gap-2 text-sm  transition-all duration-300 p-2 w-full aria-[current=page]:font-semibold">
                <TbActivityHeartbeat />
                <span>របាយការណ៍ ស្តុក</span>
              </NavLink>
            </li>
          </ul>
        </li>


      </ul>
    </div>
  )
}

export default Sidebar