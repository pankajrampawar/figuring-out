'use client'

import React, { useState, useEffect } from 'react';
import ReplyCard from '@/app/ui/replyCard';
import MessageClickedCard from '@/app/ui/messageClickedCard';
import { useParams } from 'next/navigation';
import { getReplyForCraft } from '@/app/actions';
import { getCraft } from '@/app/actions';
import ReplyComponent from '@/app/ui/postReplyCard';

export default function ReplySection() {


    const [replies, setReplies] = useState([' ']);
    const [craft, setCraft] = useState(' ')
    const [replySent, setReplySent] = useState(false)
    const params = useParams();
    const craftId = params.id;


    useEffect(()=>{
        const getAllReplies = async () => {
            const repliesGot = await getReplyForCraft(craftId)
            setReplies(repliesGot);    
        }

        const getCraftById = async () => {
            const message = await getCraft(craftId)
            setCraft(message)
        }

        getCraftById();

        getAllReplies();
    }, [])

    useEffect(() => {
        const getAllReplies = async () => {
            const repliesGot = await getReplyForCraft(craftId);
            setReplies(repliesGot);
        }

        getAllReplies();
    }, [replySent])

    return (
        <div className='flex flex-col gap-2'>
            {   craft.content && craft.content &&
                <div>
                <MessageClickedCard
                    content = {craft.content}
                />
                </div>
            }

            <div>
                <ReplyComponent craftId={params.id} handleReplySent={setReplySent}/> 
            </div>

            <div className='flex flex-col gap-3 pl-4'>
                {
                    replies && 
                    replies.slice().reverse().map((reply) => (
                        <ReplyCard 
                            key= {reply._id}
                            id = {reply._id}
                            content = {reply.content}
                        />
                    ))
                }
            </div>
        </div>
    )
}