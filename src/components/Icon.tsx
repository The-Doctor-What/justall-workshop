export type IconProps = {
    name: any;
    group?: string;
    className?: string;
}

export default function Icon({name, group = "solid", className = ""}: IconProps) {
    return (<i className={`fa-${group} fa-${name} ${className}`}/>)
}