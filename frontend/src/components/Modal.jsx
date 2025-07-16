import React from 'react'
import { IoCloseCircle } from 'react-icons/io5'

function Modal({ open, onClose, title,children }) {
  return (
    <>
            <div className={` fixed inset-0 z-[999] flex justify-center items-center backdrop-blur-sm transition-all duration-300 ${open ? 'visible' : 'invisible'} `}>
                    <div className={`bg-white rounded-md border transition-all duration-300 border-gray-100 shadow-xl p-6 w-[460px] relative ${open ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}>
                            <div className='flex justify-between items-center relative'>
                                    <h1 className='text-xl font-semibold'>{title || ""}</h1>
                                    <button onClick={onClose} className='text-lg grid place-items-center cursor-pointer  text-red-600 '>
                                        <IoCloseCircle />
                                    </button>
                            </div>
                            <div className='my-2'>
                                    {children}
                            </div>
                    </div>
            </div>
    </>
  )
}

export default Modal