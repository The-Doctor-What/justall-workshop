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

    return (

        <Link href={href} className="bg-neutral-800 hover:bg-zinc-800 px-3 py-2 rounded-md transition-colors flex flex-row gap-2 items-center border-none">
            {iconName && (<Icon name={iconName} group={iconGroup}/>)} {children}
        </Link>
    )
}