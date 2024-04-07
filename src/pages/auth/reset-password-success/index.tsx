import React from "react";
import CustomLink from "@/components/links";

/**
 * @method ResetPasswordSentPage
 * @returns Jsx - Reset password sent page jsx
 */
function ResetPasswordSentPage(): JSX.Element {
    return (
        <div>
            <div className="h-[100vh] flex flex-col justify-center items-center">
                <h2 className="text-2xl font-bold mb-4">Password Reset Email Sent</h2>
                <p className="text-lg mb-4">
                    An email has been sent to your email address with instructions on how to reset your password.
                </p>
                <p className="text-lg">
                    If you don&apos;t receive an email within a few minutes, please check your spam folder.
                </p>
                <CustomLink route={'/home'} text={'Return to Home page'} />
            </div>
        </div>
    );
}

export default ResetPasswordSentPage;
