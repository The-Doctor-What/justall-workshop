export type ProgressProps = {
    name?: string;
    max?: number;
    value?: number;
    vertical?: boolean;
}

export default function Progress({name = "", max = 100, value = 0, vertical = false}: ProgressProps) {
    if (value > max) value = max;
    return (
        <div className={`flex gap-1 ${vertical ? "flex-col items-center" : "flex-row-reverse items-center"}`}>
            <div className={`flex items-end ${vertical ? "h-32 w-3" : "h-3 w-32"} bg-neutral-800 rounded-md`}>
                {vertical ? <div className="w-3 h-32 bg-accent rounded-md" style={{height: `${(value / max) * 100}%`}}/> : <div className="h-3 w-32 bg-accent rounded-md" style={{width: `${(value / max) * 100}%`}}/>}
            </div>
            <p>{name}</p>
        </div>
    )
}