import { Link } from "react-router-dom";
import { useState } from "react";
import useLogin from "../../hooks/useLogin.js";

export const Login = () => {
  const [loginCred, setLoginCred] = useState({
    username: "",
    password: "",
  });

  const { loading, login } = useLogin();

  const handleChange = (evt) => {
    setLoginCred({
      ...loginCred,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await login(loginCred.username, loginCred.password);
  };

  return (
    <div className={"flex flex-col items-center justify-center min-w-96 mx-auto"}>
      <div className={"w-full p-6 rounded-2xl shadow-md bg-gray-400 bg-clip-padding backdrop-blur-lg bg-opacity-0"}>
        <h1 className={"text-3xl font-semibold text-center text-gray-50"}>
          Login
          <span className={"text-green-300"}> Chat App</span>
        </h1>

        <form action="" className={"mt-5"} onSubmit={handleSubmit}>
          <div>
            <label className="input input-bordered flex items-center gap-2">
              Username
              <input
                type="text"
                name={"username"}
                className="grow"
                placeholder="Enter Username"
                value={loginCred.username}
                onChange={handleChange}
              />
            </label>
          </div>

          <div>
            <label className="input input-bordered flex items-center gap-2 mt-4 mb-4">
              Password
              <input
                type="password"
                className="grow"
                placeholder="Enter Password"
                name={"password"}
                value={loginCred.password}
                onChange={handleChange}
              />
            </label>
          </div>

          <button className="btn btn-outline mt-2 btn-sm btn-block mb-4" disabled={loading}>
            {loading ? <span className={"loading loading-spinner"}></span> : "Login"}
          </button>
          <Link to={"/signup"} className="link text-green-500 link-hover">
            Don't Have An Account?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;