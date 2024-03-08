'use client'

import { useState, useEffect } from 'react';
import { addResponse } from '../actions';
import Image from 'next/image'
import { happyMonkey } from '../fonts';
import { adjustWord } from '../lib/removeExtraSpace';
import loadingSvg from '@/public/loader.svg'

export default function ReplyComponent({ dropId, handleReplySent, userId }) {

    const [reply, setReply] = useState('');

    const [direct, setDirect] = useState(false)

    const [anonymous, setAnonymous] = useState(false)

    const [active, setActive] = useState(false)

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const responseWithSpace = e.target.value;

        const responseWithoutSpace = adjustWord(responseWithSpace);

        setReply(responseWithoutSpace);
        setActive(responseWithSpace.trim().length > 0)
    }

    const selectDirect = async () => {
        if (!active) {
            return;
        }

        if (loading) return;

        setLoading(true)
        setDirect(true)
        setAnonymous(false)

        const response = await addResponse(dropId, reply, userId)

        if (!response) {
            setLoading(false);
            alert('Try again later. Internet sucks 📶, not us!😒');
            setDirect(false)
            return;
        }

        setLoading(false);
        setDirect(false)
        alert("reply sent");
        handleReplySent(prev => !prev);
        setReply('')
        return;
    }

    const selectAnonymous = async () => {
        if (!active) {
            return;
        }

        if (loading) return;

        setAnonymous(true)
        setDirect(false)
        setLoading(true)

        const response = await addResponse(dropId, reply);

        if (!response) {
            setLoading(false);
            alert("Try again later, Internet sucks 📶, not us! 😒");
            setAnonymous(false);
            return;
        }

        setLoading(false)
        setAnonymous(false)
        alert('replied secretly! 🤫');
        handleReplySent(prev => !prev);
        setReply('')
        return;
    }

    useEffect(()=>{
        if (!active) {
            setDirect(false);
            setAnonymous(false);
        }
    }, [active]) 

    return (
        <div className='bg-surface p-4 pb-2 flex-col gap-4 flex'>
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
                        className={`flex justify-center items-center p-1 rounded-xl border-2 ${happyMonkey.className} min-w-[86px] min-h-[36px]
                        ${active ? 'bg-white  hover:bg-primary' : 'bg-gray-400 border-gray-400'} ${direct ? 'bg-primary border-primary ' : 'bg-gray-200'}`}

                        onClick={selectDirect}
                    >
                        { direct && loading ? 
                            <div>
                                <Image
                                    src={loadingSvg}
                                    height={10}
                                    width={60}
                                    alt="loading"
                                    className="invert ml-3 mt-1"
                                />
                            </div>
                        : 'Direct' }
                    </button>
                    <button 
                        className={`flex justify-center items-center p-1 rounded-xl border-2 ${happyMonkey.className} min-w-[110px] min-h-[36px]
                        ${active ? 'hover:bg-primary bg-white' : 'bg-gray-400 border-gray-400'} ${anonymous ? 'bg-primary border-primary' : 'bg-gray-200'}`}

                        onClick={selectAnonymous}
                    >
                        { anonymous && loading ?
                            <div>
                                <Image
                                    src={loadingSvg}
                                    height={10}
                                    width={60}
                                    alt="loading"
                                    className="invert ml-3 mt-1"
                                />
                            </div> 
                            : 
                            'Anonymous' 
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}