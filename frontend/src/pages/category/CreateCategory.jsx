import React, { useState } from 'react'
import { Link } from 'react-router'
import { useCollection } from '../../hooks/useCollection'
import toast from 'react-hot-toast'

function CreateCategory() {
   const [name, setName] = useState("")
   const [note, setNote] = useState("")

   const {create, isLoading} = useCollection("categories")

   const handleSubmit = async (e) => {
       e.preventDefault()
       const data = {
         name, 
         note
       }
       const res = await create(data)
       if(res){
         console.log(res)
         toast.success("Insert successfully!!")
         setName("")
         setNote("")
       }
   }

  return (
    <>
        <h1 className='text-xl font-semibold'>Create New Category</h1>

        <div className='max-w-lg bg-white p-3 rounded-md mt-4'>
            <form onSubmit={handleSubmit}>
                 <div className='mb-3'>
                    <label htmlFor="" className='block'>Name*</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='input w-full' placeholder='Enter name' required />
                 </div>
                 
                 <div className='mb-3'>
                    <label htmlFor="" className='block'>Note*</label>
                    <textarea value={note} onChange={(e) => setNote(e.target.value)} className='textarea w-full' placeholder='Enter note'></textarea>
                 </div>
                 <div className='mb-3 flex items-center justify-end gap-4'>
                    <Link to="/category" className='btn'>Back</Link>
                    <button className='btn btn-neutral' disabled={isLoading}>
                     {
                           isLoading ? (
                              <span className="loading loading-spinner loading-md"></span>
                           ) : (
                              <span>Save</span>
                           )
                     }
                    </button>
                 </div>
            </form>
        </div>
    </>
  )
}

export default CreateCategory