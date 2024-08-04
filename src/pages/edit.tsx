import {GetServerSideProps} from "next";
import {Button, Layout, Input, Error, Profile} from "@/components";
import React, {useContext, useState} from "react";
import {NotificationsContext} from "@/pages/_app";
import {useRouter} from "next/router";
import {useSessionContext, useSupabaseClient} from "@supabase/auth-helpers-react";
import {getUserData} from "@/utils/client/getAuthUser";

type Home = {
    null: null;
}

export default function EditPage({}: Home) {
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

    const [statsSection, setStatsSection] = useState(1)
    const {sendNotification} = useContext(NotificationsContext)

    const [avatar, setAvatar] = useState("")
    const [name, setName] = useState("")
    const [position, setPosition] = useState("")
    const [loyalty, setLoyalty] = useState("")

    async function changeSetting(section: string, value: string) {
        if (!value) return sendNotification("Ошибка", "error", "Поле не может быть пустым.")

        const userData = JSON.parse(JSON.stringify(user));
        delete userData.id
        delete userData.access

        userData[section] = value

        const {data, error} = await supabase
            .from('users')
            .update(userData)
            .eq('id', user.id)

        if (error) {
            console.error(error)
            return sendNotification("Ошибка", "error", `Произошла ошибка при изменении данных: ${error.message}`)
        }

        sendNotification("Изменение данных", "success", `Данные успешно изменены.`)
    }

    async function changeSurcharge() {
        await changeSetting("surcharge", (!user.surcharge).toString())
        sendNotification("Доплата за Д+О", "success", `Доплата за Д+О успешно ${user.surcharge ? "отключена" : "включена"}.`)
    }


    if (!user) {
        return (<Layout>
            <Error title="Загрузка" description="Загрузка данных пользователя..."
                   recommendations="Пожалуйста, подождите."/>
        </Layout>)
    }

    return (
        <Layout className="flex flex-row w-full h-screen items-center justify-center gap-6 flex-wrap"
                title="Редактирование">
            <section className="flex flex-row gap-5">
                <Profile user={user}/>
                <section className="flex flex-row bg-lite-black min-w-min min-h-min rounded-xl p-6 gap-10">
                    <div className="flex flex-col gap-3">
                        <p className="text-xl">Настройки</p>
                        <Button iconName="image" execute={() => setStatsSection(1)}>Аватар</Button>
                        <Button iconName="address-card" iconGroup="regular" execute={() => setStatsSection(2)}>Основные
                            данные</Button>
                        <Button iconName="money-bill-trend-up" execute={() => setStatsSection(3)}>Заработок</Button>
                    </div>
                    <div className="flex flex-col gap-5">
                        {statsSection === 1 && (
                            <div className="flex flex-col min-w-min min-h-min gap-5">
                                <p>Сменить фото профиля</p>
                                <div className="flex flex-col gap-5">
                                    <img src={avatar || user.avatar} alt="avatar"
                                         className="w-48 rounded object-cover"/>
                                    <Input type="text" label="Ссылка на фото"
                                           onChange={(e) => setAvatar(e.target.value)}/>
                                    <Button iconName="save"
                                            execute={(e: any) => changeSetting("avatar", avatar)}>Сохранить</Button>
                                </div>
                            </div>
                        )}
                        {statsSection === 2 && (
                            <div className="flex flex-col min-w-min min-h-min gap-5">
                                <p className="text-lg">Основные данные</p>
                                <div className="flex flex-col gap-5">
                                    <p>Сменить имя профиля</p>
                                    <Input type="text" label="Имя профиля" onChange={(e) => setName(e.target.value)}/>
                                    <Button iconName="save"
                                            execute={(e: any) => changeSetting("name", name)}>Сохранить</Button>
                                </div>
                                <div className="flex flex-col gap-5">
                                    <p>Сменить должность</p>
                                    <Input type="text" label="Должность" onChange={(e) => setPosition(e.target.value)}/>
                                    <Button iconName="save"
                                            execute={(e: any) => changeSetting("role", position)}>Сохранить</Button>
                                </div>
                            </div>
                        )}
                        {statsSection === 3 && (
                            <div className="flex flex-col min-w-min min-h-min gap-5">
                                <p>Изменить дополнительные выплаты</p>
                                <div className="flex flex-col gap-5">
                                    <Input type="text" label="Лояльность" onChange={(e) => setLoyalty(e.target.value)}/>
                                    <Button iconName="save"
                                            execute={(e: any) => changeSetting("loyalty", loyalty)}>Сохранить</Button>
                                </div>
                                <Button iconName="money-bill-wave"
                                        execute={changeSurcharge}>{user.surcharge ? "Отключить" : "Включить"} доплату за
                                    Д+О</Button>
                            </div>
                        )}
                    </div>
                </section>
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