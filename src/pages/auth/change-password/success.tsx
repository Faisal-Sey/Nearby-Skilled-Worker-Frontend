import CustomLink from "@/components/links";
import React from "react";

/**
 * @method PasswordChangeSuccessPage
 * @returns Jsx - Password change success page jsx
 */
function PasswordChangeSuccessPage(): JSX.Element {
    return (
        <div className="h-[100vh] flex flex-col justify-center items-center">
            <h2><b>Password Changed Successfully</b></h2>
            <p>Your password has been successfully changed.</p>

            <CustomLink route={'/auth/login'} text={'Return to Login page'} />
        </div>
    )
}


export default PasswordChangeSuccessPage;