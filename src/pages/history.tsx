import {GetServerSideProps} from "next";
import {Button, Layout, Input, Error, Profile} from "@/components";
import React, {useContext, useState} from "react";
import {NotificationsContext} from "@/pages/_app";
import {useRouter} from "next/router";
import {useSessionContext, useSupabaseClient} from "@supabase/auth-helpers-react";
import {getUserData} from "@/utils/client/getAuthUser";
import {getUserVacationsData} from "@/utils/client/getVacationsUser";
import moment from "moment";
import {getUserDaysData} from "@/utils/client/getDaysUser";

type History = {
    null: null;
}

export default function HistoryPage({}: History) {
    const router = useRouter();

    const {session} = useSessionContext();
    const supabase = useSupabaseClient()

    if (!session) {
        return (
            <Layout title={"Редактирование"}>
                <Error title={"Вы не авторизованы"}
                       description={"Вы не можете просматривать эту страницу, так как вы не авторизованы."}
                       recommendations={"Попробуйте авторизоваться и попробовать снова."}
                       link={{href: "/auth", text: "Авторизоваться", icon: {name: "sign-in", group: "solid"}}}/>
            </Layout>
        )
    }

    const user: any = getUserData()
    const userVacations: any = getUserVacationsData()
    const userDays: any = getUserDaysData()

    const [historySection, setHistorySection] = useState(1)
    const {sendNotification} = useContext(NotificationsContext)

    if (!user) {
        return (<Layout>
            <Error title="Загрузка" description="Загрузка данных пользователя..."
                   recommendations="Пожалуйста, подождите."/>
        </Layout>)
    }

    return (
        <Layout className="flex flex-row w-full h-screen items-center justify-center gap-6 flex-wrap"
                title="История">
            <section className="flex flex-row gap-5">
                <Profile user={user}/>
                <section className="flex flex-row bg-lite-black min-w-min min-h-min rounded-xl p-6 gap-10">
                    <div className="flex flex-col gap-3">
                        <p className="text-xl">История</p>
                        <Button iconName="address-card" iconGroup="regular"
                                execute={() => setHistorySection(1)}>Успешки</Button>
                        <Button iconName="money-bill-trend-up" execute={() => setHistorySection(2)}>Отпуски</Button>
                        <Button iconName="money-bill-trend-up" execute={() => setHistorySection(3)}>Выработка</Button>
                        <Button iconName="money-bill-trend-up" execute={() => setHistorySection(4)}>Штрафы</Button>
                        <Button iconName="money-bill-trend-up" execute={() => setHistorySection(5)}>WoW Продажи</Button>
                        <Button iconName="money-bill-trend-up" execute={() => setHistorySection(6)}>Премии</Button>
                        <p>Период</p>
                        <select className="bg-neutral-800 hover:bg-zinc-800 px-3 py-2 rounded-md transition-colors">
                            <option value="8.2024">Август 2024</option>
                            <option value="7.2024">Июль 2024</option>
                            <option value="6.2024">Июнь 2024</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-5">
                        {historySection === 2 && (
                            <div className="flex flex-col min-w-min min-h-min gap-5">
                                <p className="text-xl">История отпусков</p>
                                <div className="flex flex-col gap-5">
                                    {(!userVacations || userVacations.length === 0) ? (
                                        <p>Данных по отпускам нет</p>
                                    ) : (
                                    userVacations.map((vacation: any) =>
                                        <div key={vacation.id}
                                             className="flex flex-row gap-5 bg-neutral-800 p-5 rounded-xl">
                                            <div className="flex flex-col gap-2">
                                                <p>{moment(vacation.start).format("DD MMMM YYYY")} — {moment(vacation.end).format("DD MMMM YYYY")}</p>
                                                <p>Дней в
                                                    отпуске: {moment(vacation.end).diff(moment(vacation.start), "days") + 1}</p>
                                                <p>Следующий
                                                    отпуск: {moment(vacation.end).add(3, "months").format("MMMM YYYY")}</p>
                                                <Button iconName="trash" execute={() => {}} type="button">Удалить</Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-5">
                        {historySection === 3 && (
                            <div className="flex flex-col min-w-min min-h-min gap-5">
                                <p className="text-xl">История выработки</p>
                                <div className="flex flex-col gap-5">
                                    {!userDays || userDays.length === 0 && (
                                        <p>Данных по выработке нет</p>
                                    )}
                                    {userDays.map((day: any) =>
                                        <div key={day.id}
                                             className="flex flex-row gap-5 bg-neutral-800 p-5 rounded-xl">
                                            <div className="flex flex-col gap-2">
                                                <p>{moment(day.date).format("DD MMMM YYYY")}</p>
                                                <p>Времени на линии: {Math.floor(day.minutes / 60).toString().padStart(2, '0')}:{(day.minutes % 60).toString().padStart(2, '0')}</p>
                                                <p>Тип дня: {day.type}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </section>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps<History> = async (ctx) => {
    const empty = {
        props: {
            null: null,
        },
    };

    try {
        return empty;
    } catch (e) {
        return empty;
    }
};