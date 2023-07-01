import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserData } from "@/redux/slices/userSlice";
import { axiosClient } from "../../../libs/axiosClient";

/**
 * @method SignupPage
 * @returns Jsx - Signup page jsx
 */
function SignupPage() {
  // State to handle onchange events of input fields
  const [state, setState] = useState<SignupData>({});
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
      // Check if passwords match
      if (state.password === state.c_password) {
        const modState = { ...state };
        delete modState?.c_password
        // Make signup request with entered credentials
        const signup = await axiosClient.post("/auth/seeker/signup", modState);
        // Turn loading to off after signup
        setLoading(false);
        // Set response status message
        const respStatus: number = signup.data.status;

        if (respStatus) {
          // Set User data into the redux
          dispatch(setUserData(signup.data.data));
          // Toast success message
          toast.success("Signup successful");
          // Proceed to the verification page
          router.push("/verify-identity");
        }
      } else {
        toast.error("Passwords do not match");
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
      <h1 className="mb-3 font-bold text-[22px]">Register Page</h1>
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
          type="text"
          className="border-[1px] mb-3 p-2"
          title="name"
          name="name"
          placeholder="Name"
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
        <input
          type="password"
          className="border-[1px] mb-3 p-2"
          title="confirm password"
          name="c_password"
          placeholder="Confirm Password"
          onChange={handleChange}
        />
        <button type="submit" className="bg-blue-600 py-3 text-[#fff]">
          {loading ? "Loading..." : "Register"}
        </button>
        <Link
          className="mt-3 underline text-blue-600 text-[13px]"
          href="/auth/login"
          passHref
        >
          Already have an account? Login here
        </Link>
      </form>
    </div>
  );
}

export default SignupPage;
