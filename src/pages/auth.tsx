import {Button, Layout, Error, LogoCompact, PromoItem} from "@/components";
import {useRouter} from "next/router";
import {useSessionContext, useSupabaseClient} from "@supabase/auth-helpers-react";
import React, {useContext} from "react";
import {NotificationsContext} from "@/pages/_app";

export default function AuthPage() {
    const router = useRouter();
    const {sendNotification} = useContext(NotificationsContext)

    const {session} = useSessionContext();
    const supabase = useSupabaseClient()

    async function authSocial(e: any, provider: any) {
        e.preventDefault()

        const {data, error} = await supabase.auth.signInWithOAuth({
            provider: provider
        })

        if (error) sendNotification("Авторизация", "error", error.message)
    }

    const error = {
        title: "Вы уже авторизованы",
        description: "Вы не можете войти в аккаунт, так как вы уже авторизованы.",
        recommendations: "Попробуйте выйти из аккаунта и попробовать снова."
    }

    if (session) return (
        <Layout title={"Выход"}>
            <Error title={error.title} description={error.description} recommendations={error.recommendations}/>
        </Layout>
    )

    return (
        <Layout title={"Авторизация"}>
            <section className="bg-stone-950 rounded-xl p-7 flex flex-col justify-between gap-5">
                <div className="flex flex-col gap-2">
                    <LogoCompact/>
                    <h3 className="font-light text-lg">Вход в аккаунт</h3>
                    <PromoItem iconName="arrow-right-to-bracket">Быстрый вход в одно нажатие</PromoItem>
                    <PromoItem iconName="lock">Безопасность и конфиденциальность</PromoItem>
                </div>
                <Button execute={(e: any) => authSocial(e, "github")} iconName="github" iconGroup="brands" type="button" className="text-xl">
                    Войти через GitHub</Button>
            </section>
        </Layout>
    )
}
