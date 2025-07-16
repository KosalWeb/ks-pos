import { useCurrent } from '../hooks/auth/useCurrent'
import { Navigate } from 'react-router'
function AuthRedirect({children}) {
    const {data, isLoading} = useCurrent()
    if(isLoading){
            return (
                <div className='flex min-h-screen h-full justify-center items-center'>
                    <span className="loading loading-ring loading-xl"></span>
                </div>
            )
    }

    if(data && isLoading == false){
            if(data?.role === 'admin' || data?.role === "super"){
                return <Navigate to="/" />
            }else if(data?.role === "cashier"){
                return <Navigate to="/cashier/pos" />
            }else{
                return <Navigate to="/aunthorization" />
            }
    }else{
        return children
    }
}

export default AuthRedirect