import React, {Dispatch, useState} from "react";
import {NextRouter, useRouter} from "next/router";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserData } from "@/redux/slices/userSlice";
import { axiosClient } from "@/libs/axiosClient";
import PasswordInput from "@/components/passwordInput";
import useForm from "@/hooks";
import {AnyAction} from "redux";
import CustomLink from "@/components/links";
import SubmitButton from "@/components/button";

/**
 * @method LoginPage
 * @returns Jsx - Login page jsx
 */
function LoginPage() {
  const {state, handleChange} = useForm({});
  const [loading, setLoading] = useState(false);

  const dispatch: Dispatch<AnyAction> = useDispatch();
  const router: NextRouter = useRouter();

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
      const login = await axiosClient.post("/auth/seeker/login", state);
      setLoading(false);
      const respStatus: number = login.data.status;

      if (respStatus) {
        dispatch(setUserData(login.data.data));
        toast.success("Login successful");
        await router.push("/home");
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response.data.message);
      console.error(error);
    }
  };

  return (
    <div className="h-[100vh] flex flex-col justify-center items-center">
      <h1 className="mb-3 font-bold text-[22px]">Login Page</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="email"
          className="border border-gray-300 rounded-md mb-3 p-2 w-full"
          title="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <PasswordInput
            onChange={handleChange}
            name={"password"}
            title={"password"}
            placeholder={"Password"}
            className=""
        />
        <SubmitButton loading={loading} text={"Login"} />
        <CustomLink route={"/auth/signup"} text={"Don't have an account? Register now!"} />
        <CustomLink route={"/auth/reset-password"} text={"Forgotten your password? Reset Password"} />
      </form>
    </div>
  );
}

export default LoginPage;
