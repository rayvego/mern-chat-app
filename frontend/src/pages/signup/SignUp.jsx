import GenderBox from "./GenderBox.jsx";
import { Link } from "react-router-dom";
import { useState } from "react";
import useSignup from "../../hooks/useSignup.js";

export const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const handleChange = (evt) => {
    setInputs((currData) => {
      return {
        ...currData,
        [evt.target.name]: evt.target.value,
      };
    });
  };

  const { loading, signup } = useSignup();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await signup(inputs);
  };

  const handleBoxChange = (evt) => {
    setInputs((currData) => {
      return {
        ...currData,
        gender: evt.target.value,
      };
    });
  };

  return (
    <div className={"flex flex-col items-center justify-center min-w-96 mx-auto"}>
      <div className={"w-full p-6 rounded-2xl shadow-md bg-gray-400 bg-clip-padding backdrop-blur-lg bg-opacity-0"}>
        <h1 className={"text-3xl font-semibold text-center text-gray-50"}>
          Sign Up
          <span className={"text-green-300"}> Chat App</span>
        </h1>

        <form action="" className={"mt-5"} onSubmit={handleSubmit}>
          <div>
            <label className="input input-bordered flex items-center gap-2 mt-4 mb-4">
              Full Name
              <input
                type="text"
                className="grow"
                name={"fullName"}
                placeholder="Enter Full Name"
                value={inputs.fullName}
                onChange={handleChange}
              />
            </label>
          </div>

          <div>
            <label className="input input-bordered flex items-center gap-2">
              Username
              <input
                type="text"
                className="grow"
                name={"username"}
                placeholder="Enter Username"
                value={inputs.username}
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
                name={"password"}
                placeholder="Enter Password"
                value={inputs.password}
                onChange={handleChange}
              />
            </label>
          </div>

          <div>
            <label className="input input-bordered flex items-center gap-2 mt-4 mb-4">
              Confirm Password
              <input
                type="password"
                className="grow"
                name={"confirmPassword"}
                placeholder="Confirm Password"
                value={inputs.confirmPassword}
                onChange={handleChange}
              />
            </label>
          </div>

          <GenderBox handleChange={handleBoxChange} currValue={inputs.gender} />

          <button className="btn btn-outline mt-4 btn-sm btn-block mb-4" disabled={loading}>
            {loading ? <span className={"loading loading-spinner"}></span> : "Sign Up"}
          </button>

          <Link to={"/login"} className="link text-green-500 link-hover">
            Already Have An Account?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;