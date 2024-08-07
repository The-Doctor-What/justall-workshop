import {useSupabaseClient, useUser} from "@supabase/auth-helpers-react";
import {useEffect, useState} from "react";

export const getUserDaysData = () => {
    const user = useUser();
    const supabase = useSupabaseClient();
    const [data, setData] = useState(null as any);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user || !supabase) return;

            const { data, error } = await supabase
                .from('days')
                .select()
                .eq('user_id', user.id)
                .order('day', {ascending: false})
                .order('month', {ascending: false})
                .order('year', {ascending: false})

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