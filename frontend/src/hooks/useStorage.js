import toast from "react-hot-toast"
import { api } from "../configs/api"
import { useState } from "react"

export const useStorage = () => {
    const [isLoading, setIsLoading] = useState(false)

     const uploadFile = async (file) => {
         try {
            setIsLoading(true)
            const formData = new FormData()
            formData.append("imageUrl", file)
            const res = await api.post("/upload", formData)
            if(res.data?.success){
                return res.data
            }
         } catch (error) {
            toast.error(error?.response?.data?.error || "Upload failed")
         }finally{
            setIsLoading(false)
         }
     }

     const removeFile = async (imageUrl) => {
         try {
            setIsLoading(true)
            const res = await api.delete(`/upload/${imageUrl}`)
            if(res.data?.success){
                return res.data
            }
         } catch (error) {
            toast.error(error?.response?.data?.error || "Delete Failed")
         }finally{
            setIsLoading(false)
         }
     }

     return {
        uploadFile,
        removeFile,
        isLoading
     }

}