import { useState } from "react"
import { api } from "../configs/api"

export const useSaleReport = () => {
    const [isLoading, setIsLoading] = useState(false)

    const fetchReport = async (startDate, endDate) => {
        try {
            setIsLoading(true)
            const res = await api.get(`/report/sale?startDate=${startDate}&endDate=${endDate}`)
            if(res.data?.success){
                return res.data
            }    
        } catch (error) {
            console.log('Fetch sale report failed : ', error)
        }finally{
            setIsLoading(false)
        }
    }

    return{
        isLoading,
        fetchReport
    }
}