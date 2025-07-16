import toast from "react-hot-toast"
import { api } from "../configs/api"
import { useState } from "react"

export const useAddPaymentPurchase = () => {
    const [isLoading, setIsLoading] = useState(false)
    const addPayment = async (id, data) => {
        try {
            setIsLoading(true)
            const res = await api.patch(`/purchase/addPayment/${id}`, data)
            if(res.data?.success){
                return res.data?.result
            }
        } catch (error) {
            toast.error(error?.response?.data?.error || "Server Error")
        }finally{
            setIsLoading(false)
        }
    }

    return {
        isLoading,
        addPayment
    }
}