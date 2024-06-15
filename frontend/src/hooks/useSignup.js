import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext.jsx";

// this function will return loading state and signup function
export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  // using the authUser and setAuthUser from the AuthContext
  const { authUser, setAuthUser } = useAuthContext();

  const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
    // check if the fields are valid
    const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // sending the data in json format to the signup auth controller
        body: JSON.stringify({ fullName, username, password, confirmPassword, gender }),
      });

      // data contains full user data - _id, username, fullName, profilePicture
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      // storing user data in local storage
      localStorage.setItem("chat-user", JSON.stringify(data));

      // update user context
      setAuthUser(data);
      toast.success("Signed up successfully");
    } catch (error) {
      toast.error("An error occurred. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;

const handleInputErrors = ({ fullName, username, password, confirmPassword, gender }) => {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all fields");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters long");
    return false;
  }
  return true;
};