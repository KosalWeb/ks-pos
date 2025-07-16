import { useEffect, useState } from "react"
import { api } from "../configs/api"

export const useQuery = (collection,search="", page = 1, limit = 10, refetch = false, condition = "") => {
    const [data, setData] = useState([])
    const [totalPage, setTotalPage] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const fetchData = async () => {
            try {
                let url = ""
                if(condition){
                    url = `/${collection}?search=${search}&page=${page}&limit=${limit}&${condition}`
                }else{
                    url = `/${collection}?search=${search}&page=${page}&limit=${limit}`
                }
                const res = await api.get(url)
                if(res.data?.success){
                    setData(res.data?.result)
                    setTotalPage(res.data?.totalPage)
                }
            } catch (error) {
                console.error(error)
            }finally{
                setIsLoading(false)
            }
        }
        fetchData()
    },[search, limit, page, collection, refetch, condition])

    return {
        data,
        totalPage,
        isLoading
    }
}