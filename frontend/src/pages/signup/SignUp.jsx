import GenderBox from "./GenderBox.jsx";

export const SignUp = () => {
    return (
        <div className={"flex flex-col items-center justify-center min-w-96 mx-auto"}>
            <div
                className={"w-full p-6 rounded-2xl shadow-md bg-gray-400 bg-clip-padding backdrop-blur-lg bg-opacity-0"}>
                <h1 className={"text-3xl font-semibold text-center text-gray-50"}>
                    Sign Up
                    <span className={"text-green-300"}> Chat App</span>
                </h1>

                <form action="" className={"mt-5"}>
                    <div>
                        <label className="input input-bordered flex items-center gap-2 mt-4 mb-4">
                            Full Name
                            <input type="text" className="grow" placeholder="Enter Full Name"/>
                        </label>
                    </div>

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

                    <div>
                        <label className="input input-bordered flex items-center gap-2 mt-4 mb-4">
                            Confirm Password
                            <input type="password" className="grow" placeholder="Confirm Password"/>
                        </label>
                    </div>

                    <GenderBox/>

                    <button className="btn btn-outline mt-4 btn-sm btn-block mb-4">Sign Up</button>
                    <a className="link text-green-500 link-hover">Already Have An Account?</a>
                </form>
            </div>
        </div>
    )
}

export default SignUp