import {NextRouter, useRouter} from "next/router";
import {axiosClient} from "@/libs/axiosClient";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {AnyAction} from "redux";
import {Dispatch} from "react";
import {setResetPasswordData} from "@/redux/slices/resetPasswordSlice";

/**
 * @method ResetPasswordRedirect
 * @returns Jsx - Reset password page redirect jsx
 */
function ResetPasswordRedirect(): JSX.Element {
    const router: NextRouter = useRouter();
    const {token} = router.query;
    const dispatch: Dispatch<AnyAction> = useDispatch()

    if (token) {
        axiosClient.post("/auth/seeker/decode-reset-password-token", {token}).then(async (resp) => {
            const respStatus: number = resp.data.status;

            if (respStatus) {
                console.log(resp.data.data);
                dispatch(setResetPasswordData(resp.data.data));
                await router.push("/auth/change-password");
            }
        }).catch((error) => {
            toast.error(error.response.data.message);
            console.error(error);
        });
    }

    return (
        <div className="h-[100vh] flex flex-col justify-center items-center">
            <p>Redirecting...</p>
        </div>
    )
}

export default ResetPasswordRedirect;