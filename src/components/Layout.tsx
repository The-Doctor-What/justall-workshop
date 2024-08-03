import Head from 'next/head'
import React from "react";
import {Inter} from "next/font/google";
import {meta} from "@/utils/client/metaData";

export type LayoutProps = {
    title?: string;
    children?: React.ReactNode;
    className?: string;
}

const inter = Inter({subsets: ['latin']})

export default function Layout({children, title, className}: LayoutProps) {
    return (
        <>
            <Head>
                <title>{`${meta.title}  ${title ? `| ${title}` : ""}`}</title>
                <meta name="description" content={meta.description}/>
                <link rel="icon" href="/favicon.ico"/>

                <meta property="og:type" content="website"/>
                <meta property="og:url" content={meta.url}/>
                <meta property="og:title" content={meta.title}/>
                <meta property="og:description" content={meta.description}/>
            </Head>
            <main className={`${inter.className} ${className || "flex flex-col w-full h-screen items-center justify-center"}`}>
                {children}
            </main>
        </>
    )
}