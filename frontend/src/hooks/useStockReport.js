import { useState } from "react"
import { api } from "../configs/api"
export const useStockReport = () => {
    const [isLoading, setIsLoading] = useState(false)
    
        const fetchReport = async (stockQty) => {
            try {
                setIsLoading(true)
                const res = await api.get(`/report/stock?stockQty=${stockQty}`)
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