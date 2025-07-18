import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { useCollection } from '../../hooks/useCollection'
import toast from 'react-hot-toast'
import { useFindById } from '../../hooks/useFindById'

function EditCategory() {
   const [name, setName] = useState("")
   const [note, setNote] = useState("")
   const route = useParams()
   const navigate = useNavigate()

   const {update, isLoading} = useCollection("categories")
 
    const {data: category, isLoading: isFinding} = useFindById("categories",route.id)

   const handleSubmit = async (e) => {
       e.preventDefault()
       const data = {
         name, 
         note
       }
       const res = await update(data, route.id)
       if(res){
         toast.success("Update successfully!!")
         setName("")
         setNote("")
         navigate("/category")
       }
   }

   useEffect(() => {
           if(category && isFinding == false){
               setName(category?.name || "")
               setNote(category?.note || "")
           }
    },[category,isFinding])

  return (
    <>
        <h1 className='text-xl font-semibold'>កែតម្រូវ ប្រភេទទំនិញ</h1>

        <div className='max-w-lg bg-white p-3 rounded-md mt-4'>
            <form onSubmit={handleSubmit}>
                 <div className='mb-3'>
                    <label htmlFor="" className='block'>ឈ្មោះប្រភេទទំនិញ*</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='input w-full' placeholder='Enter name' required />
                 </div>
                 
                 <div className='mb-3'>
                    <label htmlFor="" className='block'>សំគាល់*</label>
                    <textarea value={note} onChange={(e) => setNote(e.target.value)} className='textarea w-full' placeholder='Enter note'></textarea>
                 </div>
                 <div className='mb-3 flex items-center justify-end gap-4'>
                    <Link to="/category" className='btn'>ចាកចេញ</Link>
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

export default EditCategory