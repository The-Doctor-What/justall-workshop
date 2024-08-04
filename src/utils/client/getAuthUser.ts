import {useSessionContext, useSupabaseClient, useUser} from "@supabase/auth-helpers-react";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

export const getUserData = () => {
    const user = useUser();
    const { isLoading, session, error } = useSessionContext();
    const supabase = useSupabaseClient();
    const [data, setData] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user || !supabase) return;

            const { data, error } = await supabase
                .from('users')
                .select()
                .eq('id', user.id)
                .limit(1)
                .maybeSingle();

            if (error) {
                console.error(error);
                return;
            }

            if (!data) {
                const { data: newData, error: insertError } = await supabase
                    .from('users')
                    .insert([{ id: user.id, name: user.user_metadata.user_name }])
                    .single();

                if (insertError) {
                    console.error(insertError);
                    return;
                }

                setData(newData);
            } else {
                setData(data);
            }
        };

        fetchUserData();
    }, [user, supabase]);

    return data;
};