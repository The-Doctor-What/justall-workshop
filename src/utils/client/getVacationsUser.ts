import {useSupabaseClient, useUser} from "@supabase/auth-helpers-react";
import {useEffect, useState} from "react";

export const getUserVacationsData = () => {
    const user = useUser();
    const supabase = useSupabaseClient();
    const [data, setData] = useState(null as any);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user || !supabase) return;

            const { data, error } = await supabase
                .from('vacations')
                .select()
                .eq('user_id', user.id)

            if (error) {
                console.error(error);
                return;
            }

            if (!data) {
                setData(null);
            } else {
                setData(data);
            }
        };

        fetchUserData();
    }, [user, supabase]);

    return data;
};