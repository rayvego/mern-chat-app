import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext.jsx";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);

  // get the setAuthUser function from the AuthContext
  const { setAuthUser } = useAuthContext();

  // creating a login function that we will return along with loading state
  const login = async (username, password) => {
    // checking if the username and password are not empty
    const success = handleInputErrors({ username, password });
    if (!success) return;

    setLoading(true);
    try {
      // getting all the user data from the server (login function in auth controller)
      // contains the user's _id, username, fullName, and profilePicture
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // sending username and password to the server which is being expected at the login controller
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // setting the user data in the local storage
      localStorage.setItem("chat-user", JSON.stringify(data));
      // setting the user data in the AuthContext
      setAuthUser(data);
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;

const handleInputErrors = ({ username, password }) => {
  if (!username || !password) {
    toast.error("Please fill in all fields");
    return false;
  }

  return true;
};