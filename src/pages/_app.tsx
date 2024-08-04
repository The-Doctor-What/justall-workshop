import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import Script from "next/script";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import React, {createContext, useState} from "react";
import {SessionContextProvider} from "@supabase/auth-helpers-react";
import {NotificationsBar} from "@/components";

export type NotificationsContextType = {
    notifications: { title: string, type: string, text: string, id: string }[],
    sendNotification: (title: string, type: string, text: string) => void,
    deleteNotification: (id: string) => void,
}

export const NotificationsContext = createContext<NotificationsContextType>({
    notifications: [],
    sendNotification: () => {
    },
    deleteNotification: () => {
    },
})

export default function App({Component, pageProps}: AppProps) {
    const [supabaseClient] = useState(() => createClientComponentClient());
    const [notifications, setNotifications] = useState<{ title: string, type: string, text: string, id: string }[]>([])

    function sendNotification(title: string, type: string, text: string) {
        setNotifications([...notifications, {title, type, text, id: Math.random().toString()}])
    }

    function deleteNotification(id: string) {
        setNotifications(notifications.filter(notification => notification.id !== id))
    }

    return <>
        <SessionContextProvider supabaseClient={supabaseClient}>
            <NotificationsContext.Provider value={{
                notifications,
                sendNotification,
                deleteNotification
            }}>
                <Component {...pageProps} />
                <Script src="https://kit.fontawesome.com/4217917e45.js" crossOrigin="anonymous"/>
                <NotificationsBar/>
            </NotificationsContext.Provider>
        </SessionContextProvider>
    </>
}
