import React, { useState } from 'react'
import { Link } from 'react-router'
import toast from 'react-hot-toast'
import { useCurrent } from '../../hooks/auth/useCurrent'
import { useSignup } from '../../hooks/auth/useSignup'

function CreateUser() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")

   const {isLoading, signup} = useSignup()
   const {data: user, isLoading:isFetchingUser} = useCurrent()

   const handleSubmit = async (e) => {
       e.preventDefault()
       const data = {
         username, 
         password,
         email,
         role
       }
       const res = await signup(data)
       if(res){
            toast.success("Signup user successffully!")
            setUsername("")
            setPassword("")
            setEmail("")
            setRole("")
       }
   }

  return (
    <>
        <h1 className='text-xl font-semibold'>Create New User</h1>

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
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='input w-full' placeholder='Enter name' required />
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

export default CreateUser