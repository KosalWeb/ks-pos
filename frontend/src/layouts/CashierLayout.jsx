import React from 'react'
import TopMenu from '../components/TopMenu'
import { Outlet } from 'react-router'
function CashierLayout() {
  return (
    <>
        <TopMenu />
        <div className='bg-gray-100 h-full min-h-screen p-4'>
                <Outlet />
        </div>
    </>
  )
}

export default CashierLayout