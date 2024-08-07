import {GetServerSideProps} from "next";
import {Button, Graph, Layout, Input, Error, Profile} from "@/components";
import React, {useContext, useState} from "react";
import {NotificationsContext} from "@/pages/_app";
import moment from "moment";
import {useRouter} from "next/router";
import {useSessionContext, useSupabaseClient} from "@supabase/auth-helpers-react";
import {getUserData} from "@/utils/client/getAuthUser";
import {getUserDaysData} from "@/utils/client/getDaysUser";

type Home = {
    null: null;
}

export default function HomePage({}: Home) {
    const router = useRouter();

    const {session} = useSessionContext();
    const supabase = useSupabaseClient()

    if (!session) {
        return (
            <Layout title={"Главная"}>
                <Error title={"Вы не авторизованы"}
                       description={"Вы не можете просматривать эту страницу, так как вы не авторизованы."}
                       recommendations={"Попробуйте авторизоваться и попробовать снова."}
                       link={{href: "/auth", text: "Авторизоваться", icon: {name: "sign-in", group: "solid"}}}/>
            </Layout>
        )
    }

    function getNextSalaryDate(day: number) {
        let currentDate = moment();
        currentDate.date(day);

        if (moment().date() >= day) currentDate.add(1, 'months');
        if (currentDate.isoWeekday() === 6 || currentDate.isoWeekday() === 7) currentDate.isoWeekday(5);

        const daysUntilSalary = currentDate.diff(moment(), 'days');

        return {
            date: currentDate.format('DD MMMM YYYY'),
            daysUntil: daysUntilSalary
        };
    }


    const user: any = getUserData()
    const userDays: any = getUserDaysData()

    function getWorkedHours(){
        const worked = {
            timer: 0,
            target: user.target * 60,
            remaining: user.target * 60,
            weekends: 0,
            today: 0,
            most: {
                date: "В этом месяце никогда",
                minutes: 0
            },
            workdays: 0,
            vacation: 0,
            sick: 0,
            compensation: 0,
            surcharge: 0,
            weekendsSurcharge: 0,
        }

        for (const day of userDays) {
            const date = moment(`${day.day}.${day.month}.${day.year}`, "DD.MM.YYYY")
            if (day.month != moment().month() + 1) continue
            worked.timer += day.minutes
            worked.remaining -= day.minutes
            worked.remaining = worked.remaining < 0 ? 0 : worked.remaining
            worked.weekends += day.type == "weekend" ? 1 : 0
            worked.today += day.day == moment().date() ? day.minutes : 0
            worked.most = day.minutes > worked.most.minutes ? {date: `${day.day}.${day.month}.${day.year}`, minutes: day.minutes} : worked.most
            worked.workdays += day.type == "work" ? 1 : 0
            if (day.type == "vacation") worked.vacation++
            if (day.type == "sick") worked.sick++
            if (date.isoWeekday() === 6 || date.isoWeekday() === 7) worked.weekendsSurcharge += day.minutes / 60 * 4
        }

        const numberOfDaysInMonths = moment().daysInMonth()

        worked.surcharge = worked.timer / 60 * 0.625

        const minutesInDay = worked.target / numberOfDaysInMonths
        worked.compensation = (worked.vacation + worked.sick) * minutesInDay
        worked.remaining -= worked.compensation
        worked.remaining = worked.remaining < 0 ? 0 : worked.remaining
        worked.target -= worked.compensation
        worked.target = worked.target < 0 ? 0 : worked.target

        return worked
    }

    function workedFormatted() {
        const works = getWorkedHours()

        return {
            timer: `${Math.floor(works.timer / 60)}:${works.timer % 60 < 10 ? '0' : ''}${works.timer % 60}`,
            remaining: `${Math.floor(works.remaining / 60)}:${works.remaining % 60 < 10 ? '0' : ''}${Math.floor(works.remaining % 60)}`,
            today: `${Math.floor(works.today / 60)}:${works.today % 60 < 10 ? '0' : ''}${Math.floor(works.today % 60)}`,
            target: `${Math.floor(works.target / 60)}:${Math.floor(works.target % 60) < 10 ? '0' : ''}${Math.floor(works.target % 60)}`,
            most: {
                date: moment(works.most.date, "DD.MM.YYYY").format("LL"),
                minutes: `${Math.floor(works.most.minutes / 60)}:${works.most.minutes % 60 < 10 ? '0' : ''}${works.most.minutes % 60}`
            },
            workdays: works.workdays,
            weekends: works.weekends,
            vacation: works.vacation,
            compensation: `${Math.floor(works.compensation / 60)}:${works.compensation % 60 < 10 ? '0' : ''}${Math.floor(works.compensation % 60)}`,
            sick: works.sick,
            average: `${Math.floor(works.timer / works.workdays / 60)}:${Math.floor(works.timer / works.workdays % 60) < 10 ? '0' : ''}${Math.floor(works.timer / works.workdays % 60)}`,
            surcharge: works.surcharge,
            weekendsSurcharge: works.weekendsSurcharge,
            realRemaining: works.remaining
        }
    }

    const [statsSection, setStatsSection] = useState(1)
    const [addSection, setAddSection] = useState(1)
    const {sendNotification} = useContext(NotificationsContext)

    const [vacationStart, setVacationStart] = useState("")
    const [vacationEnd, setVacationEnd] = useState("")

    const [penaltySum, setPenaltySum] = useState(0)
    const [penaltyID, setPenaltyID] = useState(0)
    const [penaltyReason, setPenaltyReason] = useState("")

    const [workTimeMinutes, setWorkTimeMinutes] = useState(0)
    const [workTimeHours, setWorkTimeHours] = useState(0)

    const [wowSegment, setWowSegment] = useState(0)

    const [premiumSum, setPremiumSum] = useState(0)
    const [premiumReason, setPremiumReason] = useState("")

    const [soldQueue, setSoldQueue] = useState(0)
    const [soldSegment, setSoldSegment] = useState(0)
    const [soldSum, setSoldSum] = useState(0)

    const [date, setDate] = useState(moment().format("YYYY-MM-DD"))

    async function addWorkingData() {
        if (!workTimeMinutes && !workTimeHours && !date) return sendNotification("Ошибка", "error", "Поле не может быть пустым.")

        const {data, error} = await supabase
            .from('days')
            .select('*')
            .eq('user_id', user.id)
            .eq('day', moment(date).date())
            .eq('month', moment(date).month() + 1)
            .eq('year', moment(date).year())
            .maybeSingle();

        if (!data) {
            const {data, error} = await supabase
                .from('days')
                .insert([{user_id: user.id, day: moment(date).date(), month: moment(date).month() + 1, year: moment(date).year(), minutes: workTimeMinutes + workTimeHours * 60}])

            if (error) {
                console.error(error)
                return sendNotification("Ошибка", "error", `Произошла ошибка при добавлении данных: ${error.message}`)
            }

            sendNotification("Добавление данных", "success", `Данные успешно добавлены.`)
        }
        else {
            const {data, error} = await supabase
                .from('days')
                .update({minutes: workTimeMinutes + workTimeHours * 60})
                .eq('user_id', user.id)
                .eq('day', moment(date).date())
                .eq('month', moment(date).month() + 1)
                .eq('year', moment(date).year())

            if (error) {
                console.error(error)
                return sendNotification("Ошибка", "error", `Произошла ошибка при изменении данных: ${error.message}`)
            }

            sendNotification("Изменение данных", "success", `Данные успешно изменены.`)
        }
    }

    const worked = workedFormatted()

    if (!user) {
        return (<Layout>
            <Error title="Загрузка" description="Загрузка данных пользователя..."
                   recommendations="Пожалуйста, подождите."/>
        </Layout>)
    }

    return (
        <Layout className="flex flex-row w-full h-screen items-center justify-center gap-6 flex-wrap">
            <Profile user={user}/>
            <section className="flex flex-row bg-lite-black min-w-min min-h-min rounded-xl p-6 gap-10">
                <div className="flex flex-col gap-3">
                    <p className="text-xl">Статистика</p>
                    <Button iconName="briefcase" execute={() => setStatsSection(1)}>Выработка</Button>
                    <Button iconName="money-bill-trend-up" execute={() => setStatsSection(2)}>Успешки</Button>
                    <Button iconName="dollar-sign" execute={() => setStatsSection(3)}>Зарплата</Button>
                    <Button iconName="calendar-days" execute={() => setStatsSection(4)}>Расписание</Button>
                    <p>Период</p>
                    <select className="bg-neutral-800 hover:bg-zinc-800 px-3 py-2 rounded-md transition-colors">
                        <option value="8.2024">Август 2024</option>
                        <option value="7.2024">Июль 2024</option>
                        <option value="6.2024">Июнь 2024</option>
                    </select>
                </div>
                <div className="flex flex-col gap-5">
                    {statsSection === 1 && (
                        <div className="flex flex-col min-w-min min-h-min gap-5">
                            <p>График по выполнению выработки</p>
                            <div className="flex flex-col gap-5">
                                <Graph vertical={true}/>
                                <div className="flex flex-row gap-5">
                                    <div className="flex flex-col gap-2">
                                        <p>Времени на линии</p>
                                        <p>Компесации</p>
                                        <p>Осталось</p>
                                        <p>Баллов за Диалог + Ожидание</p>
                                        <p>Доплата за работу по выходным</p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <p>{worked.timer}</p>
                                        <p>{worked.compensation}</p>
                                        <p>{worked.remaining}</p>
                                        <p>{worked.surcharge} баллов</p>
                                        <p>{worked.weekendsSurcharge} баллов</p>
                                    </div>
                                </div>
                                {worked.realRemaining <= 0 && (
                                <p>🎉 Поздравляю! Вы уже выполнили план по выработке! 🎉</p>
                                )}
                            </div>
                        </div>
                    )}
                    {statsSection === 2 && (
                        <div className="flex flex-col min-w-min min-h-min gap-5">
                            <p>Статистика обзвонов</p>
                            <div className="flex flex-col gap-5">
                                <Graph vertical={true}/>
                                <div className="flex flex-row gap-5">
                                    <div className="flex flex-col gap-2">
                                        <p>Успешных звонков</p>
                                        <p>Неуспешных звонков</p>
                                        <p>Баллов за первую половину месяца</p>
                                        <p>Баллов за вторую половину месяца</p>
                                        <p>Конверсия</p>
                                        <p>Штрафов</p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <p>278</p>
                                        <p>2 354</p>
                                        <p>1 456 баллов</p>
                                        <p>1 422 баллов</p>
                                        <p>11.8%</p>
                                        <p>0 [0 баллов]</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {statsSection === 3 && (
                        <div className="flex flex-col min-w-min min-h-min gap-5">
                            <p>Заработок</p>
                            <div className="flex flex-col gap-5">
                                <Graph vertical={true}/>
                                <div className="flex flex-row gap-5">
                                    <div className="flex flex-col gap-2">
                                        <p>Предварительная выплата</p>
                                        <p>Зарплата</p>
                                        <p>Доплата за Диалог + Ожидание</p>
                                        <p>Доплата за выходные</p>
                                        <p>Штрафы</p>
                                        <p>Премия за месяц</p>
                                        <p>Компенсация за отпуск</p>
                                        <p>Зарплата учитывая все доплаты</p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <p>14 000 рублей</p>
                                        <p>2 0000 рублей</p>
                                        <p>1 000 рублей</p>
                                        <p>5 000 рублей</p>
                                        <p>0 рублей</p>
                                        <p>5 000 рублей</p>
                                        <p>0 рублей</p>
                                        <p>31 000 рублей</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {statsSection === 4 && (
                        <div className="flex flex-col min-w-min min-h-min gap-5">
                            <p>Расписание</p>
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-row gap-5">
                                    <div className="flex flex-col gap-2">
                                        <p>Ближайший выходной</p>
                                        <p>Ближайшая предварительная выплата</p>
                                        <p>Ближайшая заплата</p>
                                        <p>Выходных дней в месяце</p>
                                        <p>Рабочих дней в месяце</p>
                                        <p>Больничных дней в месяце</p>
                                        <p>Дней в отпуске</p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <p>10.08.2024</p>
                                        <p>{getNextSalaryDate(22).date}</p>
                                        <p>{getNextSalaryDate(9).date}</p>
                                        <p>{worked.weekends} дней</p>
                                        <p>{worked.workdays} дней</p>
                                        <p>{worked.sick} дней</p>
                                        <p>{worked.vacation} дней</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
            <section className="flex flex-row bg-lite-black min-w-min min-h-min rounded-xl p-6 gap-10">
                <div className="flex flex-col gap-3">
                    <p className="text-xl">Назначить</p>
                    <Button iconName="thumbs-up" iconGroup="regular" execute={() => setAddSection(1)}>Успешка</Button>
                    <Button iconName="thumbs-up" iconGroup="regular" execute={() => setAddSection(2)}>Выработку</Button>
                    <Button iconName="handcuffs" execute={() => setAddSection(3)}>Штраф</Button>
                    <Button iconName="plane-departure" execute={() => setAddSection(4)}>Отпуск</Button>
                    <Button iconName="hand-holding-dollar" execute={() => setAddSection(5)}>Премия</Button>
                    <Button iconName="medal" execute={() => setAddSection(6)}>WOW звонок</Button>
                </div>
                <div className="flex flex-col gap-5">
                    {addSection === 1 && (
                        <div className="flex flex-col gap-5">
                            <p>Добавить успешку</p>
                            <div className="flex flex-col gap-5">
                                <Input type="text" label="Очередь"
                                       onChange={(e) => setSoldQueue(Number(e.target.value))}/>
                                <Input type="text" label="ID сегмента"
                                       onChange={(e) => setSoldSegment(Number(e.target.value))}/>
                                <Input type="text" label="Сумма утиля"
                                       onChange={(e) => setSoldSum(Number(e.target.value))}/>
                                <Input type="date" label="Дата" onChange={(e) => setDate(e.target.value)}/>
                                <Button iconName="plus">Добавить</Button>
                            </div>
                        </div>
                    )}
                    {addSection === 2 && (
                        <div className="flex flex-col gap-5">
                            <p>Добавить выработку</p>
                            <div className="flex flex-col gap-5">
                                <Input type="text" label="Часов на линии"
                                       onChange={(e) => setWorkTimeHours(Number(e.target.value))}/>
                                <Input type="text" label="Минут на линии"
                                        onChange={(e) => setWorkTimeMinutes(Number(e.target.value))}/>
                                <Input type="date" label="Дата" onChange={(e) => setDate(e.target.value)}/>
                                <Button iconName="plus" execute={addWorkingData}>Добавить</Button>
                            </div>
                        </div>
                    )}
                    {addSection === 3 && (
                        <div className="flex flex-col gap-5">
                            <p>Добавить штраф</p>
                            <div className="flex flex-col gap-5">
                                <Input type="text" label="Сумма штрафа в баллах"
                                       onChange={(e) => setPenaltySum(Number(e.target.value))}/>
                                <Input type="text" label="ID оценки"
                                       onChange={(e) => setPenaltyID(Number(e.target.value))}/>
                                <Input type="text" label="Причина"
                                       onChange={(e) => setPenaltyReason(e.target.value)}/>
                                <Input type="date" label="Дата" onChange={(e) => setDate(e.target.value)}/>
                                <Button iconName="plus">Добавить</Button>
                            </div>
                        </div>
                    )}
                    {addSection === 4 && (
                        <div className="flex flex-col gap-5">
                            <p>Добавить отпуск</p>
                            <div className="flex flex-col gap-5">
                                <Input type="date" label="Дата начала"
                                       onChange={(e) => setVacationStart(e.target.value)}/>
                                <Input type="date" label="Дата окончания"
                                       onChange={(e) => setVacationEnd(e.target.value)}/>
                                <Button iconName="plus">Добавить</Button>
                            </div>
                        </div>
                    )}
                    {addSection === 5 && (
                        <div className="flex flex-col gap-5">
                            <p>Добавить премию</p>
                            <div className="flex flex-col gap-5">
                                <Input type="text" label="Сумма премии"
                                       onChange={(e) => setPremiumSum(Number(e.target.value))}/>
                                <Input type="text" label="Причина"
                                       onChange={(e) => setPremiumReason(e.target.value)}/>
                                <Input type="date" label="Дата" onChange={(e) => setDate(e.target.value)}/>
                                <Button iconName="plus">Добавить</Button>
                            </div>
                        </div>
                    )}
                    {addSection === 6 && (
                        <div className="flex flex-col gap-5">
                            <p>Добавить WOW звонок</p>
                            <div className="flex flex-col gap-5">
                                <Input type="text" label="ID сегмента"
                                       onChange={(e) => setWowSegment(Number(e.target.value))}/>
                                <Input type="date" label="Дата" onChange={(e) => setDate(e.target.value)}/>
                                <Button iconName="plus">Добавить</Button>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps<Home> = async (ctx) => {
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