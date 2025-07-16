import { useState } from "react"
import { api } from "../../configs/api"
import toast from "react-hot-toast"

export const useSignin = () => {

    const [isLoading, setIsLoading] = useState(false)

    const signin = async (email, password) => {
        try{
            setIsLoading(true)
            const res = await api.post('/auth/signin', {email, password})
            return res.data
        }catch(error){
            toast.error(error.response.data.error || "Server Error")
        }finally{
            setIsLoading(false)
        }
    }

    return {
        isLoading,
        signin
    }

}