import React, { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { axiosClient } from "@/libs/axiosClient";
import useForm from "@/hooks";
import SubmitButton from "@/components/button";
import CustomLink from "@/components/links";

/**
 * @method ResetPasswordPage
 * @returns Jsx - Reset password page jsx
 */
function ResetPasswordPage(): JSX.Element {
    const { state, handleChange } = useForm({});

    const [loading, setLoading] = useState(false);

    const router = useRouter();

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
            const resp = await axiosClient.post("/auth/seeker/reset-password", state);
            setLoading(false);
            const respStatus: number = resp.data.status;

            if (respStatus) {
                toast.success("Reset password email sent successful");
                await router.push("/auth/reset-password-success");
            }
        } catch (error: any) {
            setLoading(false);
            toast.error(error.response.data.message);
            console.error(error);
        }
    };

    return (
        <div className="h-[100vh] flex flex-col justify-center items-center">
            <h1 className="mb-3 font-bold text-[22px]">Reset Password Page</h1>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <input
                    type="email"
                    className={"border border-gray-300 rounded-md mb-3 p-2 w-full"}
                    title="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                />
                <SubmitButton loading={loading} text={"Send Reset Email"} />
                <CustomLink route={"/auth/signup"} text={"Don't have an account? Register now!"} />
            </form>
        </div>
    );
}

export default ResetPasswordPage;
