'use client'

import { useState } from 'react';
import { addResponse } from '../actions';
import { happyMonkey } from '../fonts';

export default function ReplyComponent({ dropId, handleReplySent }) {

    const [reply, setReply] = useState({
        response:  '',
    });

    const [direct, setDirect] = useState(false)

    const handleChange = (e) => {
        const response = e.target.value;

        setReply({
            response
        });
    }

    const handleClick = async () => {
        const sent = await addResponse(dropId, reply.response)

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

            <div className='flex justify-start pr-10 items-center gap-4'>
                <div>
                    send: 
                </div>

                <div className='flex gap-2 text-black'>
                    <button className={`flex justify-center items-center p-1 bg-white rounded-xl ${happyMonkey.className}`}>
                        Direct
                    </button>
                    <button className={`flex justify-center items-center p-1 bg-white rounded-xl ${happyMonkey.className}`}>
                        Anonymously
                    </button>
                </div>
            </div>
        </div>
    )
}