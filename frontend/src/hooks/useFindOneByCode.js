import toast from "react-hot-toast"
import { api } from "../configs/api"

export const useFindOneByCode = () => {
    const findOneByCode = async (path, code) => {
        const url = `${path}/${code}`
        try {
            const res = await api.get(url)
            if(res.data?.success){
                return res.data?.result
            }
        } catch (error) {
            toast.error(error?.response?.data?.error || "Server Error")
        }
    }

    return {
        findOneByCode
    }
}