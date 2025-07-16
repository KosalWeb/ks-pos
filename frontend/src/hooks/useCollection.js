import { useState } from "react"
import toast from "react-hot-toast"
import { api } from "../configs/api"

export const useCollection = (collection) => {

    const [isLoading, setIsLoading] = useState(false)

    const create = async (data) => {
        try {
            setIsLoading(true)
            const res = await api.post(collection, data)
            if(res.data?.success){
                return res.data
            }
        } catch (error) {
            toast.error(error.response.data.error || "Server Error")
        }finally{
            setIsLoading(false)
        }
    }

    const update = async (data, id) => {
        try {
            setIsLoading(true)
            const res = await api.patch(`/${collection}/${id}`, data)
            if(res.data?.success){
                return res.data
            }
        } catch (error) {
            toast.error(error.response.data.error || "Server Error")
        }finally{
            setIsLoading(false)
        }
    }


    const remove = async (id) => {
        try {
            setIsLoading(true)
            const res = await api.delete(`/${collection}/${id}`)
            if(res.data?.success){
                return res.data
            }
        } catch (error) {
            toast.error(error.response.data.error || "Server Error")
        }finally{
            setIsLoading(false)
        }
    }



    return{
        isLoading,
        create,
        update,
        remove
    }

}