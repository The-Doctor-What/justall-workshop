import {Button, Layout, Error} from "@/components";
import {useRouter} from "next/router";
import {useSessionContext, useSupabaseClient} from "@supabase/auth-helpers-react";
import React from "react";

export default function LogoutPage() {
    const router = useRouter();

    const {session} = useSessionContext();
    const supabase = useSupabaseClient()

    async function logout(e: any) {
        e.preventDefault();
        await supabase.auth.signOut()
        await router.push("/")
    }

    const error = {
        title: "Вы не авторизованы",
        description: "Вы не можете выйти из аккаунта, так как вы не авторизованы.",
        recommendations: "Попробуйте авторизоваться и попробовать снова."
    }

    if (!session) return (
        <Layout title={"Выход"}>
            <Error title={error.title} description={error.description} recommendations={error.recommendations}/>
        </Layout>
    )

    return (
        <Layout title={"Выход"}>
            <section className="flex flex-col gap-2 items-center bg-stone-950 rounded-md p-5 w-full max-w-sm">
                <h1 className="text-white text-3xl font-bold text-center">Выход из аккаунта</h1>
                <p className="text-stone-500 text-lg text-center font-normal">Вы уверены, что хотите выйти?</p>
                <Button execute={logout} iconName="sign-out" type="button">Выйти</Button>
            </section>
        </Layout>
    )
}
