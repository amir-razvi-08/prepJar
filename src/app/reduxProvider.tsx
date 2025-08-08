"use client";

import { Provider } from "react-redux";
import { useEffect } from "react";
import { store } from "@/redux/store";
import { setUser } from "@/redux/features/userSlice";

export function ReduxProvider({ children, user }: { children: React.ReactNode; user: object | null }) {
    useEffect(() => {
        if (user) {
            store.dispatch(setUser(user));
        }
    }, [user]);

    return <Provider store={store}>{children}</Provider>;
}
