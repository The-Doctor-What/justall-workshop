import {meta} from "@/utils/client/metaData";

export default function LogoCompact() {
    return (
        <div className="flex flex-row gap-2 items-center select-none mb-2">
            <img src="/logo-compact.png" alt="logo" className="w-6 h-6"/>
            <p className="text-white font-bold text-lg">{meta.title}</p>
        </div>
    )
}