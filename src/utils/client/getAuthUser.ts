import {useSupabaseClient, useUser} from "@supabase/auth-helpers-react";
import {useEffect, useState} from "react";

export const getUserData = () => {
    const user = useUser();
    const supabase = useSupabaseClient();
    const [data, setData] = useState(null);

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