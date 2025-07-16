import { useState } from "react"
import toast from "react-hot-toast"
import { api } from "../../configs/api"

export const useSignup = () => {
    const [isLoading, setIsLoading] = useState(false)

    const signup = async (data) => {
         try {
            setIsLoading(true)
            const res = await api.post('/auth/signup', data)
            if(res.data?.success){
                return res.data
            }
         } catch (error) {
            toast.error(error?.response?.data?.error || "Server Error!")
         }finally{
            setIsLoading(false)
         }
    }

    return{
        signup,
        isLoading
    }

}