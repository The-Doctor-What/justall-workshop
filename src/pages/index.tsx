import {GetServerSideProps} from "next";
import {Button, Graph, Layout} from "@/components";
import {useState} from "react";

type Home = {
    null: null;
}

export default function HomePage({}: Home) {
    const [statsSection, setStatsSection] = useState(1)
    const [addSection, setAddSection] = useState(1)

    return (
        <Layout className="flex flex-row w-full h-screen items-center justify-center gap-6 max-md:flex-col">
            <section className="flex flex-col bg-lite-black min-w-min min-h-min rounded-xl p-6 gap-5">
                <div className="flex flex-row gap-5">
                    <img
                        src="https://sun151-1.userapi.com/impg/mNqloPyfxr0DdXetL5m8nGhBzM4B8P6hLXJt6A/iPE32lacZDA.jpg?size=800x1208&quality=95&sign=7774a4fb3a8d30e2438e4105c034ac92&type=album"
                        alt="avatar" className="w-20 h-20 rounded-full object-cover"/>
                    <div className="flex flex-col gap-1">
                        <p>The Doctor What</p>
                        <p className="text-zinc-500">Developer [D: 666]</p>
                        <p className="text-zinc-500">ID: 1</p>
                    </div>
                </div>
                <div className="flex flex-row gap-5">
                    <div className="flex flex-col gap-2">
                        <p>Лояльность</p>
                        <p>Цель по выработке</p>
                        <p>Доплата за Д+О</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p>1.07</p>
                        <p>105 часов</p>
                        <p>Активна</p>
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <Button iconName="edit">Редактировать</Button>
                    <Button iconName="calendar-days">Расписание</Button>
                    <Button iconName="clock-rotate-left">История</Button>
                    <Button iconName="right-to-bracket">Выход</Button>
                </div>
            </section>

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
                                        <p>Время в диалоге</p>
                                        <p>Время в ожидание</p>
                                        <p>Времени на линии</p>
                                        <p>Компесации</p>
                                        <p>Осталось</p>
                                        <p>Баллов за Диалог + Ожидание</p>
                                        <p>Доплата за работу по выходным</p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <p>37:12</p>
                                        <p>19:20</p>
                                        <p>56:32</p>
                                        <p>17:11</p>
                                        <p>32:29</p>
                                        <p>21 балл</p>
                                        <p>140 баллов</p>
                                    </div>
                                </div>
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
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <p>10.08.2024</p>
                                        <p>22.08.2024</p>
                                        <p>09.08.2024</p>
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
                    <Button iconName="handcuffs" execute={() => setAddSection(2)}>Штраф</Button>
                    <Button iconName="plane-departure" execute={() => setAddSection(3)}>Отпуск</Button>
                    <Button iconName="hand-holding-dollar" execute={() => setAddSection(4)}>Премия</Button>
                    <Button iconName="medal" execute={() => setAddSection(5)}>WOW звонок</Button>
                </div>
                <div className="flex flex-col gap-5">
                    {addSection === 1 && (
                    <div className="flex flex-col gap-5">
                        <p>Добавить успешку</p>
                        <div className="flex flex-col gap-5">
                            <input type="text" placeholder="Очередь" className=""/>
                            <input type="number" placeholder="ID сегмента" className=""/>
                            <input type="number" placeholder="Сумма утиля" className=""/>
                            <input type="date" placeholder="Дата" className=""/>
                            <Button iconName="plus">Добавить</Button>
                        </div>
                    </div>
                    )}
                    {addSection === 2 && (
                    <div className="flex flex-col gap-5">
                        <p>Добавить штраф</p>
                        <div className="flex flex-col gap-5">
                            <input type="number" placeholder="Сумма штрафа в баллах" className=""/>
                            <input type="number" placeholder="ID оценки" className=""/>
                            <input type="text" placeholder="Причина" className=""/>
                            <input type="date" placeholder="Дата" className=""/>
                            <Button iconName="plus">Добавить</Button>
                        </div>
                    </div>
                    )}
                    {addSection === 3 && (
                    <div className="flex flex-col gap-5">
                        <p>Добавить отпуск</p>
                        <div className="flex flex-col gap-5">
                            <input type="date" placeholder="Дата начала" className=""/>
                            <input type="date" placeholder="Дата окончания" className=""/>
                            <Button iconName="plus">Добавить</Button>
                        </div>
                    </div>
                    )}
                    {addSection === 4 && (
                    <div className="flex flex-col gap-5">
                        <p>Добавить премию</p>
                        <div className="flex flex-col gap-5">
                            <input type="number" placeholder="Сумма премии" className=""/>
                            <input type="text" placeholder="Причина" className=""/>
                            <input type="date" placeholder="Дата" className=""/>
                            <Button iconName="plus">Добавить</Button>
                        </div>
                    </div>
                    )}
                    {addSection === 5 && (
                    <div className="flex flex-col gap-5">
                        <p>Добавить WOW звонок</p>
                        <div className="flex flex-col gap-5">
                            <input type="number" placeholder="ID сегмента" className=""/>
                            <input type="date" placeholder="Дата" className=""/>
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