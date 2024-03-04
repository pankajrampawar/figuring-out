'use client'

import { useState } from 'react';
import { addResponse } from '../actions';

export default function ReplyComponent({ craftId, handleReplySent }) {

    const [reply, setReply] = useState({
        response:  '',
    });

    const handleChange = (e) => {
        const response = e.target.value;

        setReply({
            response
        });
    }

    const handleClick = async () => {
        const sent = await addResponse(craftId, reply.response)

        if (sent) {
            handleReplySent((prev) => !prev);
            setReply({response: ''})
            alert('reply sent');
        } else {
            alert('reply not sent')
        }
    }


    return (
        <div className='bg-surface p-4 pb-2 flex-col gap-4 flex '>
            <input
                placeholder='your reply'
                value={reply.response}
                onChange={handleChange}
                id='reply'
                className=' bg-surface text-white pb-2 border-b border-b-gray-400 focus:outline-none'
            />

            <div className='flex justify-end pr-10'>
                <button
                    className={`text-black rounded-xl p-1.5 w-16 ${reply.response ? 'bg-white font-bold' : 'bg-gray-300'}`}
                    onClick={handleClick}
                >
                    send
                </button>
            </div>
        </div>
    )
}