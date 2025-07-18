import { useState } from "react";
import { useNavigate } from "react-router";
import { useSignin } from "../../hooks/auth/useSignin";
import toast from "react-hot-toast";
function Signin() {
    const navigate = useNavigate()
    const { isLoading, signin } = useSignin()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await signin(email, password)
        if (res?.success) {
            if (res?.result?.role === "admin" || res?.result?.role === "super") {
                navigate('/')
            } else if (res?.result?.role === "cashier") {
                navigate('/cashier/pos')
            } else {
                navigate('/aunthorization')
            }
            toast.success("Sign in successfully!")
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <div className="flex items-center justify-center">
                    <img src="logo mcs.png" alt="" width={100} />
                </div>

                {/* Email Input */}
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-600">
                        Email
                    </label>
                    <label className="input input-bordered flex items-center gap-2 w-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70"
                        >
                            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                        </svg>
                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className="grow w-full"
                            placeholder="Enter your email"
                            required
                        />
                    </label>
                </div>

                {/* Password Input */}
                <div className="mb-4">
                    <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-600">
                        Password
                    </label>
                    <label className="input input-bordered flex items-center gap-2 w-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70"
                        >
                            <path
                                fillRule="evenodd"
                                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            className="grow w-full"
                            id="password"
                            required
                            placeholder="Enter your password"
                        />
                    </label>
                </div>

                {/* Signin Button */}
                <button type="submit" disabled={isLoading} className="w-full btn btn-neutral flex items-center justify-center">
                    {
                        isLoading ? (
                            <span className="loading loading-spinner loading-md"></span>
                        ) : (
                            <span>Sign in</span>
                        )
                    }


                </button>
            </form>
        </div>
    )
}

export default Signin;
