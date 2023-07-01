import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserData } from "@/redux/slices/userSlice";
import { axiosClient } from "../../../libs/axiosClient";

/**
 * @method LoginPage
 * @returns Jsx - Login page jsx
 */
function LoginPage() {
  // State to handle onchange events of input fields
  const [state, setState] = useState({});
  // Request loading state
  const [loading, setLoading] = useState(false);

  // Initialize dispatch hook
  const dispatch = useDispatch();
  // Initialize navigate hook
  const router = useRouter();

  /**
   * @description - Handle participants clicks
   * @param {e} React.ChangeEvent<HTMLInputElement> - Onchange event
   * @returns void - Returns nothing
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * @description - Handle form submits
   * @param {e} React.FormEvent<HTMLFormElement> - OnSubmit event
   * @returns Void Promise - Returns nothing
   */
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    // Prevent default button submit action
    e.preventDefault();
    // Set loading in progress
    setLoading(true);

    try {
      // Make Login request with entered credentials
      const login = await axiosClient.post("/auth/seeker/login", state);
      // Turn loading to off after login
      setLoading(false);
      // Set response status message
      const respStatus: number = login.data.status;

      if (respStatus) {
        // Set User data into the redux
        dispatch(setUserData(login.data.data));
        // Toast success message
        toast.success("Login successful");
        // Proceed to the home page
        router.push("/home");
      }
    } catch (error: any) {
      setLoading(false);
      // Toast error message
      toast.error(error.response.data.message);
      console.error(error);
    }
  };

  return (
    <div className="h-[100vh] flex flex-col justify-center items-center">
      <h1 className="mb-3 font-bold text-[22px]">Login Page</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          className="border-[1px] mb-3 p-2"
          title="username"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />
        <input
          type="password"
          className="border-[1px] mb-3 p-2"
          title="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button type="submit" className="bg-blue-600 py-3 text-[#fff]">
          {loading ? "Loading..." : "Login"}
        </button>
        <Link
          className="mt-3 underline text-blue-600 text-[13px]"
          href="/auth/signup"
          passHref
        >
          Don&apos;t have an account? Register now!
        </Link>
      </form>
    </div>
  );
}

export default LoginPage;
