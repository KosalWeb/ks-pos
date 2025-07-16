import { useEffect, useState } from "react"
import { api } from "../../configs/api"

export const useCurrent = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await api.get('/auth/me')
                if(res.data?.success){
                    setData(res.data?.result)
                }
            }catch(error){
                console.log(error.message)
                //toast.error(error.response.data.error || "Server Error")
                return null
            }finally{
                setIsLoading(false)
            }
        }
        fetchData()
    },[])

    return {
        isLoading,
        data
    }

}