import { useState } from "react"
import { api } from "../../configs/api"
import toast from "react-hot-toast"

export const useSignout = () => {

    const [isLoading, setIsLoading] = useState(false)

    const signout = async () => {
        try{
            setIsLoading(true)
            const res = await api.get('/auth/signout')
            return res.data
        }catch(error){
            toast.error(error.response.data.error || "Server Error")
        }finally{
            setIsLoading(false)
        }
    }

    return {
        isLoading,
        signout
    }

}