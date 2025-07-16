import toast from "react-hot-toast"
import { api } from "../configs/api"
import { useState } from "react"

export const useCheckStock = () => {
    const [isLoading, setIsLoading] = useState(false)
    const checkStock = async (product, stock) => {
         try {
            setIsLoading(true)
            const res = await api.get(`/sale/checkStock?product=${product}&stock=${stock}`)
            if(res.data?.success){
                return res.data
            }
         } catch (error) {
            toast.error(error?.response?.data?.error || "Server Error")
         }finally{
            setIsLoading(false)
         }
    }

    return {
        isLoading,
        checkStock
    }
}