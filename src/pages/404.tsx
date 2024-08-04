import {Error, Layout, Link} from "@/components";
import {meta} from "@/utils/client/metaData";

export default function ErrorPage() {
    return (
        <Layout title={"Страница не найдена"}>
            <Error title="Страница не найдена" description="Кажется, что-то пошло не так. Страница, которую вы ищете, не существует." recommendations="Попробуйте вернуться на главную страницу и начать заново."/>
        </Layout>
    )
}
