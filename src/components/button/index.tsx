import React from 'react';

function SubmitButton ({ loading, text }: { loading: boolean; text: string }): JSX.Element {
    return (
        <button type="submit" className="bg-blue-600 py-3 text-[#fff]">
            {loading ? 'Loading...' : text}
        </button>
    );
}

export default SubmitButton;
