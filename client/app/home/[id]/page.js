'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ReplyCard from '@/app/ui/replyCard';
import MessageClickedCard from '@/app/ui/messageClickedCard';
import { useParams } from 'next/navigation';
import { getReplyForDrop } from '@/app/actions';
import { getDrop } from '@/app/actions';
import ReplyComponent from '@/app/ui/postReplyCard';

export default function ReplySection() {

    const router = useRouter();

    const [replies, setReplies] = useState(['']);
    const [drop, setDrop] = useState('')
    const [replySent, setReplySent] = useState(false)

    const [user, setUser] = useState('');
    const params = useParams();
    const dropId = params.id;


    useEffect(()=>{

        const userDataString = localStorage.getItem('user');

        if (!userDataString) {
            router.push('/home');
            return;
        }

        setUser[userDataString];

        const getAllReplies = async () => {
            const repliesGot = await getReplyForDrop(dropId)
            setReplies(repliesGot);  
            return;  
        }

        const getDropById = async () => {
            const message = await getDrop(dropId)
            setDrop(message)
            return;
        }

        getDropById();

        getAllReplies();
    }, [])

    useEffect(() => {
        const getAllReplies = async () => {
            const repliesGot = await getReplyForDrop(dropId);
            setReplies(repliesGot);
        }

        getAllReplies();
    }, [replySent])

    return (
        <div className='flex flex-col gap-2'>
            {  drop && drop.content && drop.content &&
                <div>
                <MessageClickedCard
                    content = {drop.content}
                />
                </div>
            }

            <div>
                <ReplyComponent dropId={params.id} handleReplySent={setReplySent} userId={user._id} /> 
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