'use client'

import React, { useState, useEffect, Suspense } from 'react'
import MessageCard from "@/app/ui/messageCard"
import { getDrops } from '@/app/actions';
import { HomeSkeleton } from '@/app/ui/skeletons';
import { useRouter } from 'next/navigation';

export default function Home() {

    const router = useRouter();

    const [crafts, setCrafts] = useState(undefined);
    const [user, setUser] = useState('');

    useEffect(()=>{
        const userDataString = localStorage.getItem('user')

        if (!userDataString) {
            router.push('/')
            return;
        }

        setUser(JSON.parse(userDataString));

        const getAllDrops = async() => {
            console.log("getting craft")
            const messages = await getDrops();

            setCrafts(messages);
        }
        getAllDrops();
    }, []);

    return (
        <div className="text-white">
                <div>
                    { crafts ? 
                        crafts && crafts.slice().reverse().map((craft) => {
                            return(
                                <MessageCard
                                    key={ craft._id }
                                    content={ craft.content }
                                    id={ craft._id }
                                    userId= { craft.userId ? craft.userId : '' }
                                    year = { craft.year &&  craft.year }
                                    branch = { craft.branch && craft.branch }
                                    replies = { craft.responses ? craft.responses.length : 0 }
                                    userName= {craft.userName ? craft.userName : 'Anonymous'}
                                    currentUserId = {user._id}
                                    likes = {craft.likes? craft.likes : '' }
                                />
                            )
                        }) 
                        :
                        <HomeSkeleton/>
                    }
                </div> 
        </div>
    )
}