import {Button, Link} from "@/components/index";
import React from "react";

export type ProfileProps = {
    user: any
}

export default function Icon({user}: ProfileProps) {
    return (
        <section className="flex flex-col bg-lite-black min-w-min min-h-min rounded-xl p-6 gap-5">
            <div className="flex flex-row gap-5">
                <img
                    src={user.avatar}
                    alt="avatar" className="w-20 h-20 rounded-full object-cover"/>
                <div className="flex flex-col gap-1">
                    <p>{user.name}</p>
                    <p className="text-zinc-500">{user.role} {user.access > 0 ? `[D: ${user.access}]` : ""}</p>
                </div>
            </div>
            <div className="flex flex-row gap-5">
                <div className="flex flex-col gap-2">
                    <p>Лояльность</p>
                    <p>Цель по выработке</p>
                    <p>Доплата за Д+О</p>
                </div>
                <div className="flex flex-col gap-2">
                    <p>{user.loyalty}</p>
                    <p>{user.target} часов</p>
                    <p>{user.surcharge ? `активна` : "не активна"}</p>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <Link iconName="user" href="/">Главная</Link>
                <Link iconName="edit" href="/edit">Редактировать</Link>
                <Button iconName="calendar-days">Расписание</Button>
                <Button iconName="clock-rotate-left">История</Button>
                {user.access >= 69 && (
                    <Button iconName="list-check">Очереди</Button>
                )}
                <Link href="/logout" iconName="right-to-bracket">Выход</Link>
            </div>
        </section>
    )
}