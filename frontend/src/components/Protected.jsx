import React from 'react'
import { useCurrent } from '../hooks/auth/useCurrent'
import { Navigate } from 'react-router'

function Protected( { allowedRole, children } ) {
    const {data, isLoading} = useCurrent()
    if(isLoading){
        return (
            <div className='flex min-h-screen h-full justify-center items-center'>
                <span className="loading loading-ring loading-xl"></span>
            </div>
        )
    }

    if(allowedRole.includes(data?.role)){
        return children
    }else{
        return <Navigate to="/signin" />
    }
}


export default Protected