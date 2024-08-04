import {Icon} from "@/components";
import React from "react";

export type PromoItemProps = {
    iconName: string;
    iconGroup?: string;
    children: React.ReactNode;
}

export default function PromoItem({iconName, iconGroup, children}: PromoItemProps) {
    return (
        <div className="flex flex-row gap-2 items-center text-text-alt">
            <p className="text-2xl"><Icon name={iconName} group={iconGroup}/></p>
            <p className="font-extralight text-base">{children}</p>
        </div>
    )
}