'use client'

import { useState, useEffect } from 'react';
import { addResponse } from '../actions';
import { happyMonkey } from '../fonts';
import { adjustWord } from '../lib/removeExtraSpace';

export default function ReplyComponent({ dropId, handleReplySent }) {

    const [reply, setReply] = useState('');

    const [direct, setDirect] = useState(false)

    const [anonymous, setAnonymous] = useState(false)

    const [active, setActive] = useState(false)

    const handleChange = (e) => {
        const responseWithSpace = e.target.value;

        const responseWithoutSpace = adjustWord(responseWithSpace);

        setReply(responseWithoutSpace);
        setActive(responseWithSpace.trim().length > 0)
    }

    const selectDirect = () => {
        if (!active) {
            return;
        }

        setDirect(true)
        setAnonymous(false)
        return;
    }

    const selectAnonymous = () => {
        if (!active) {
            return;
        }

        setAnonymous(true)
        setDirect(false)
        return;
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
                value={reply}
                onChange={handleChange}
                id='reply'
                className=' bg-surface text-white pb-2 border-b border-b-gray-400 focus:outline-none'
            />

            <div className='flex justify-start pr-10 items-center gap-4'>
                <div>
                    send: 
                </div>

                <div className='flex gap-2 text-black'>
                    <button 
                        className={`flex justify-center items-center p-1 bg-white rounded-xl border-2 ${happyMonkey.className} 
                        ${active ? 'bg-white' : 'bg-gray-400 border-gray-400'} ${active && direct ? 'border-primary' : 'bg-white'}`}

                        onClick={selectDirect}
                    >
                        Direct
                    </button>
                    <button 
                        className={`flex justify-center items-center p-1 bg-white rounded-xl border-2 ${happyMonkey.className}
                        ${active ? 'bg-white' : 'bg-gray-400 border-gray-400'} ${active && anonymous ? 'border-primary' : 'bg-white '}`}

                        onClick={selectAnonymous}
                    >
                        Anonymous
                    </button>
                </div>
            </div>
        </div>
    )
}