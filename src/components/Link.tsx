import React from "react";
import Link from 'next/link';
import {Icon} from "@/components/index";

export type LinkProps = {
    iconName?: string;
    iconGroup?: string;
    className?: string;
    href: string;
    children?: React.ReactNode;
    secondary?: boolean;
}

export default function LinkButton({iconName, iconGroup, className, href, children, secondary}: LinkProps) {

    const classPrimary = `p-2 rounded-md transition-colors focus:outline-none max-w-fit ${className ?? "bg-neutral-900 hover:bg-stone-900"}`
    const classSecondary = `${className ?? ""} p-2 rounded bg-blue-700 hover:bg-blue-600 text-bold max-w-fit transition-colors focus:outline-none`

    return (

        <Link href={href} className={secondary ? classSecondary : classPrimary}>
            {iconName && (<Icon name={iconName} group={iconGroup}/>)} {children}
        </Link>
    )
}