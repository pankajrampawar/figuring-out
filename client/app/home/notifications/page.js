'use client'

import { checkAndGetUser } from "@/app/actions"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import FriendRequestCard from "@/app/ui/profile/friendRequestCard"

export default function () {

    const router = useRouter();

    const [user, setUser] = useState('')
    const [trigger, setTrigger] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const getUser = async () => {
            const userGot = await checkAndGetUser();
            if (!userGot) {
                router.push('/');
                return;
            }

            setUser(userGot);
            setLoading(false)
            localStorage.setItem('user', JSON.stringify(userGot));
        }

        getUser();
    }, []);

    useEffect(()=>{
        const getUser = async () => {
            const userGot = await checkAndGetUser();
            if (!userGot) {
                router.push('/');
                return;
            }

            setUser(userGot);
            localStorage.setItem('user', JSON.stringify(userGot));
        }

        getUser();
    }, [trigger])

    const toggleTrigger = () => {
        setTrigger(prev => prev+1)
    }


    return (
        <div className="w-full">
            {
                loading ? 
                    <div className="text-xl w-full textt-center pt-10">
                        Loading...
                    </div>
                : 

                <div className="text-white w-full">
                    {  user.friendsRequest && Array.isArray(user.friendsRequest) && user.friendsRequest.length > 0  ? 
                       <FriendRequestCard friendsRequest={user.friendsRequest} userId={user._d} toggleTrigger={() => {toggleTrigger()}}/>    : 
                       <div className="text-center pt-10 text-xl">
                           <span>No new notifications</span>
                       </div>
                    }
                </div>
            }
        </div>
    )
}