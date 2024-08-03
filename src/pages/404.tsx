import {Layout, Link} from "@/components";
import {meta} from "@/utils/client/metaData";

export default function ErrorPage() {
    return (
        <Layout title={"Страница не найдена"}>
            <section className="flex flex-col bg-lite-black min-w-min min-h-min rounded-2xl">
                <div className="flex flex-row bg-accent w-min-full h-10 rounded-t-2xl justify-between p-5">
                    <div className="flex flex-row justify-center items-center gap-2">
                        <div className="flex flex-row w-4 h-4 bg-error rounded-full"></div>
                        <div className="flex flex-row w-4 h-4 bg-warning rounded-full"></div>
                        <div className="flex flex-row w-4 h-4 bg-success rounded-full"></div>
                    </div>
                    <div className="flex flex-row justify-center items-center">
                        <p className="text-stone-950 font-bold">{meta.title} - Страница не найдена</p>
                    </div>
                </div>
                <div className="flex flex-col p-5 gap-5 items-center">
                    <p className="text-white">Кажется, что-то пошло не так. Страница, которую вы ищете, не существует.</p>
                    <p className="text-white">Попробуйте вернуться на главную страницу и начать заново.</p>
                    <img src="/otomir.png" alt="404" className="w-56"/>
                    <Link href="/" iconName="home">Вернутся на главную</Link>
                </div>
            </section>
        </Layout>
    )
}
