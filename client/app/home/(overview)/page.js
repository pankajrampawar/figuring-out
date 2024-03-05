'use client'

import React, { useState, useEffect, Suspense } from 'react'
import MessageCard from "@/app/ui/messageCard"
import { getDrops } from '@/app/actions';
import { useRouter } from 'next/navigation';
import { HomeSkeleton } from '@/app/ui/skeletons';

export default function Home() {

    const router = useRouter();

    const [crafts, setCrafts] = useState(undefined);
    const [user, setUser] = useState('');

    useEffect(()=>{
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
                                    year = { craft.year &&  craft.year }
                                    branch = { craft.branch && craft.branch }
                                    replies = { craft.responses ? craft.responses.length : 0 }
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