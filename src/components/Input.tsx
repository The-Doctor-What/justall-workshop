import {ChangeEvent} from "react";

export type InputProps = {
    type: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    label?: string;
}

export default function Input({type, onChange, label}: InputProps) {
    return (
        <div className={`relative w-full`}>
            <input type={type} onChange={onChange} placeholder=""
                   className={`peer w-full p-2 rounded transition-colors focus:outline-none border border-stone-800 bg-lite-black focus:border-stone-500`}/>
            <label className={`peer-focus:bg-lite-black peer-focus:top-[-10px] peer-focus:left-2 peer-focus:text-sm peer-[:not(:placeholder-shown)]:bg-lite-black peer-[:not(:placeholder-shown)]:top-[-10px] peer-[:not(:placeholder-shown)]:left-2 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:rounded peer-focus:rounded peer-focus:px-1 peer-[:not(:placeholder-shown)]:px-1
             font-light text-stone-300 absolute top-2.5 left-2.5 pointer-events-none transition-all`}>
                {label}
            </label>
        </div>
    )
}