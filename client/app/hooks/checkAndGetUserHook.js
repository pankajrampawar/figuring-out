'use client'

import { useEffect } from "react"
import { checkAndGetUser } from "../actions"
import { useRouter } from "next/navigation"

const checkAndGetUserHook = () => {

    const router = useRouter();

    useEffect(()=>{
        const checkAndGetUserAction = async () => {
            const response = await checkAndGetUser();

            if (!response) return;

            if (response) {
                router.push('/home');
            }
        }

        checkAndGetUserAction();
    }, [])
}
