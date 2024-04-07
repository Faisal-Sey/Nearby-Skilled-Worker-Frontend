

import React from 'react';
import Link from 'next/link';

/**
 * @method CustomLink
 * @returns Jsx - Custom link component
 */
function CustomLink({ route, text }: {route: string, text: string}): JSX.Element {
    return (
        <Link href={route} passHref>
            <p className="mt-3 underline text-blue-600 text-[13px]">
                {text}
            </p>
        </Link>
    );
}

export default CustomLink;
