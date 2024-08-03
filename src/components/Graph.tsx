import {Progress} from "@/components";

export type GraphProps = {
    vertical?: boolean;
    graph?: {
        name?: string;
        value?: number;
    }[]
}

export default function Graph({vertical = false, graph = []}: GraphProps) {
    graph = [
        {name: "1", value: 23},
        {name: "2", value: 45},
        {name: "3", value: 67},
        {name: "4", value: 12},
        {name: "5", value: 34},
        {name: "6", value: 56},
        {name: "7", value: 78},
        {name: "8", value: 89},
        {name: "9", value: 90},
        {name: "10", value: 21},
        {name: "11", value: 43},
        {name: "12", value: 65},
        {name: "13", value: 87},
        {name: "14", value: 54},
        {name: "15", value: 32},
    ]

    const max = Math.max(...graph.map((item: any) => item.value));

    return (
        <div className="flex flex-col gap-5">
            <div className={`flex ${vertical ? "flex-row" : "flex-col"} gap-2`}>
                {graph.map((item: { name?: string, value?: number }) => (
                    <Progress key={item.name} name={item.name} max={max} value={item.value} vertical={vertical}/>
                ))}
            </div>
        </div>
    )
}