import {meta} from "@/utils/client/metaData";
import {Error, Link} from "@/components";

export type IconProps = {
    title: string;
    description: string;
    recommendations?: string;
    link?: {
        icon?: {
            name?: string;
            group?: string;
        }
        href: string;
        text?: string;
    }
}

export default function Icon({
                                 title,
                                 description,
                                 recommendations = "",
                                 link = {href: "/", text: "Вернутся на главную", icon: {name: "home", group: "solid"}}
                             }: IconProps) {
    return (
        <section className="flex flex-col bg-lite-black min-w-min min-h-min rounded-2xl">
            <div className="flex flex-row bg-accent w-min-full h-10 gap-20 rounded-t-2xl justify-between p-5">
                <div className="flex flex-row justify-center items-center gap-2">
                    <div className="flex flex-row w-4 h-4 bg-error rounded-full"></div>
                    <div className="flex flex-row w-4 h-4 bg-warning rounded-full"></div>
                    <div className="flex flex-row w-4 h-4 bg-success rounded-full"></div>
                </div>
                <div className="flex flex-row justify-center items-center">
                    <p className="text-stone-950 font-bold">{meta.title} | {title}</p>
                </div>
            </div>
            <div className="flex flex-col p-5 gap-5 items-center">
                <p className="text-white">{description}</p>
                <p className="text-white">{recommendations}</p>
                <img src="/otomir.png" alt="404" className="w-56"/>
                <Link href={link.href} iconName={link.icon?.name} iconGroup={link.icon?.group}>{link.text}</Link>
            </div>
        </section>
    )
}