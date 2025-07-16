import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import toast from 'react-hot-toast'
import { useCurrent } from '../../hooks/auth/useCurrent'
import { useFindById } from '../../hooks/useFindById'
import { useCollection } from '../../hooks/useCollection'

function EditUser() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
    
   const navigate = useNavigate()
   const route = useParams()
   const {update, isLoading} = useCollection("users")
   const {data: user, isLoading:isFetchingUser} = useCurrent()
   const {data, isLoading: isFetching} = useFindById("users", route.id)

   const handleSubmit = async (e) => {
       e.preventDefault()
       const data = {
         username, 
         email,
         role
       }
       if(password){
         data['password'] = password
       }
       const res = await update(data, route.id)
       if(res){
            toast.success("Update user successffully!")
            setUsername("")
            setPassword("")
            setEmail("")
            setRole("")
            navigate("/user")
       }
   }

   useEffect(() => {
        if(data && isFetching == false){
            setUsername(data?.username || "")
            setEmail(data?.email || "")
            setRole(data?.role || "")
        }
   },[data, isFetching])

  return (
    <>
        <h1 className='text-xl font-semibold'>Edit User</h1>

        <div className='max-w-lg bg-white p-3 rounded-md mt-4'>
            <form onSubmit={handleSubmit}>
                 <div className='mb-3'>
                    <label htmlFor="" className='block'>Username*</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className='input w-full' placeholder='Enter name' required />
                 </div>
                 <div className='mb-3'>
                    <label htmlFor="" className='block'>Email*</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='input w-full' placeholder='Enter name' required />
                 </div>
                 <div className='mb-3'>
                    <label htmlFor="" className='block'>Password*</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='input w-full' placeholder='Enter name' />
                 </div>
                 <div className='mb-3'>
                    <label htmlFor="" className='block'>Role*</label>
                    <select className='select w-full' onChange={(e) => setRole(e.target.value)} value={role}>
                        <option value="" disabled>--Select-Role--</option>
                        <option value="cashier">Cashier</option>
                        {
                            (user?.role === "super" && isFetchingUser == false) && (  <option value="admin">Admin</option> )
                        }
                    </select>
                 </div>
                
                 <div className='mb-3 flex items-center justify-end gap-4'>
                    <Link to="/user" className='btn'>Back</Link>
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

export default EditUser