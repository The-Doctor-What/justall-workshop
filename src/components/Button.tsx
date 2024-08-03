import {Icon} from "@/components/index";

export type ButtonsTypes = {
    iconName?: string;
    iconGroup?: string;
    execute?: any,
    children?: any,
    type?: any
    className?: string
}

export default function Button({iconName, iconGroup, execute, children, type, className}: ButtonsTypes) {
    return (
        <button onClick={execute} type={type || "button"}
                className={`bg-neutral-800 hover:bg-zinc-800 px-3 py-2 rounded-md transition-colors flex flex-row gap-2 items-center border-none ${className ? className : ""}`}>
            {iconName && (<Icon name={iconName} group={iconGroup}/>)} {children}
        </button>
    )
}