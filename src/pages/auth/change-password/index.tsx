import useForm from "@/hooks";
import React, {useState} from "react";
import {axiosClient} from "@/libs/axiosClient";
import {toast} from "react-toastify";
import {NextRouter, useRouter} from "next/router";
import SubmitButton from "@/components/button";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import CustomLink from "@/components/links";
import PasswordInput from "@/components/passwordInput";

/**
 * @method ChangePasswordPage
 * @returns Jsx - Change password page jsx
 */
function ChangePasswordPage(): JSX.Element {
    const {state, handleChange} = useForm({});
    const [loading, setLoading] = useState<boolean>(false);
    const router: NextRouter = useRouter();
    const resetPasswordData = useSelector((store: RootState) => store.resetPasswordData);

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

        if (!resetPasswordData.userId) {
            toast.success("Request password reset");
            await router.push("/auth/reset-password");
        }

        try {
            state["userId"] = resetPasswordData.userId;
            const resp = await axiosClient.post("/auth/seeker/change-password", state);
            setLoading(false);
            const respStatus: number = resp.data.status;

            if (respStatus) {
                await router.push("/auth/change-password/success");
            }
        } catch (error: any) {
            setLoading(false);
            toast.error(error.response.data.message);
            console.error(error);
        }
    };

    return (
        <div className="h-[100vh] flex flex-col justify-center items-center">
            <h2>Change Password</h2>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <PasswordInput
                    className={"mt-3"}
                    onChange={handleChange}
                    name={"password"}
                    title={"password"}
                    placeholder={"New Password"}
                />
                <PasswordInput
                    onChange={handleChange}
                    name={"confirmPassword"}
                    title={"Confirm Password"}
                    placeholder={"Confirm Password"}
                    className=""
                />
                <SubmitButton loading={loading} text={"Change Password"} />
                <CustomLink route={"/auth/signup"} text={"Don't have an account? Register now!"} />
            </form>
        </div>
    )
}

export default ChangePasswordPage;