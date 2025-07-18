import React, { useState } from 'react'
import { Link } from 'react-router'
import { useCollection } from '../../hooks/useCollection'
import toast from 'react-hot-toast'

function CreateSupplier() {
   const [name, setName] = useState("")
   const [phone, setPhone] = useState("")
   const [address, setAddress] = useState("")
   const [note, setNote] = useState("")
   const [businessName, setBusinessName] = useState("")

   const {create, isLoading} = useCollection("suppliers")

   const handleSubmit = async (e) => {
       e.preventDefault()
       const data = {
         name, 
         phone,
         address,
         note,
         businessName
       }
       const res = await create(data)
       if(res){
         console.log(res)
         toast.success("Insert successfully!!")
         setName("")
         setPhone("")
         setAddress("")
         setNote("")
         setBusinessName("")
       }
   }

  return (
    <>
        <h1 className='text-xl font-semibold'>បន្ថែមអ្នកផ្គត់ផ្គង់</h1>

        <div className='max-w-lg bg-white p-3 rounded-md mt-4'>
            <form onSubmit={handleSubmit}>
                 <div className='mb-3'>
                    <label htmlFor="" className='block'>ឈ្មោះក្រុមហ៊ុន*</label>
                    <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} className='input w-full' placeholder='Enter business name' required />
                 </div>

                 <div className='mb-3'>
                    <label htmlFor="" className='block'>ឈ្មោះ*</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='input w-full' placeholder='Enter name' required />
                 </div>

                 <div className='mb-3'>
                    <label htmlFor="" className='block'>លេខទូរស័ព្ទ*</label>
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className='input w-full' placeholder='Enter phone' />
                 </div>
                 <div className='mb-3'>
                    <label htmlFor="" className='block'>អាសយដ្ឋាន*</label>
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className='input w-full' placeholder='Enter address' />
                 </div>
                 <div className='mb-3'>
                    <label htmlFor="" className='block'>សំគាល់*</label>
                    <textarea value={note} onChange={(e) => setNote(e.target.value)} className='textarea w-full' placeholder='Enter note'></textarea>
                 </div>
                 <div className='mb-3 flex items-center justify-end gap-4'>
                    <Link to="/supplier" className='btn'>ចាកចេញ</Link>
                    <button className='btn btn-neutral' disabled={isLoading}>
                     {
                           isLoading ? (
                              <span className="loading loading-spinner loading-md"></span>
                           ) : (
                              <span>រក្សាទុក</span>
                           )
                     }
                    </button>
                 </div>
            </form>
        </div>
    </>
  )
}

export default CreateSupplier