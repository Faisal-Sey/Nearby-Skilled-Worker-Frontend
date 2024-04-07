import React, {Dispatch, useState} from "react";
import {NextRouter, useRouter} from "next/router";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserData } from "@/redux/slices/userSlice";
import { axiosClient } from "@/libs/axiosClient";
import PasswordInput from "@/components/passwordInput";
import CustomLink from "@/components/links";
import SubmitButton from "@/components/button";
import {AnyAction} from "redux";

/**
 * @method SignupPage
 * @returns Jsx - Signup page jsx
 */
function SignupPage() {
  const [state, setState] = useState<SignupData>({});
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch: Dispatch<AnyAction> = useDispatch();
  const router: NextRouter = useRouter();

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
    e.preventDefault();
    setLoading(true);

    try {
      if (state.password === state.c_password) {
        const modState = { ...state };
        delete modState?.c_password
        const signup = await axiosClient.post("/auth/seeker/signup", modState);
        setLoading(false);
        const respStatus: number = signup.data.status;

        if (respStatus) {
          dispatch(setUserData(signup.data.data));
          toast.success("Signup successful");
          await router.push("/verify-identity");
        }
      } else {
        toast.error("Passwords do not match");
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response.data.message);
      console.error(error);
    }
  };

  return (
    <div className="h-[100vh] flex flex-col justify-center items-center">
      <h1 className="mb-3 font-bold text-[22px]">Register Page</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="email"
          className={"border border-gray-300 rounded-md mb-3 p-2 w-full"}
          title="email"
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          className={"border border-gray-300 rounded-md mb-3 p-2 w-full"}
          title="name"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <PasswordInput
            className={""}
            onChange={handleChange}
            name={"password"}
            title={"password"}
            placeholder={"Password"}
        />
        <PasswordInput
            onChange={handleChange}
            name={"c_password"}
            title={"Confirm Password"}
            placeholder={"Confirm Password"}
            className=""
        />
        <SubmitButton loading={loading} text={"Register"} />
        <CustomLink route={'/auth/login'} text={'Already have an account? Login here'} />
      </form>
    </div>
  );
}

export default SignupPage;
