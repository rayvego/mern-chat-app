export const Login = () => {
    return (
        <div className={"flex flex-col items-center justify-center min-w-96 mx-auto"}>
            <div className={"w-full p-6 rounded-2xl shadow-md bg-gray-400 bg-clip-padding backdrop-blur-lg bg-opacity-0"}>
                <h1 className={"text-3xl font-semibold text-center text-gray-50"}>
                    Login
                    <span className={"text-green-300"}> Chat App</span>
                </h1>

                <form action="" class={"mt-5"}>
                    <div>
                        <label className="input input-bordered flex items-center gap-2">
                            Username
                            <input type="text" className="grow" placeholder="Enter Username"/>
                        </label>
                    </div>

                    <div>
                        <label className="input input-bordered flex items-center gap-2 mt-4 mb-4">
                            Password
                            <input type="password" className="grow" placeholder="Enter Password"/>
                        </label>
                    </div>

                    <button className="btn btn-outline mt-2 btn-sm btn-block mb-4">Login</button>
                    <a className="link text-green-500 link-hover">Don't Have An Account?</a>
                </form>

            </div>
        </div>
    )
}

export default Login