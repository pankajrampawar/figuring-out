'use client'

import React, { useEffect, useState } from 'react'
import { happyMonkey } from '../fonts'
import Link from 'next/link'
import { addResponse, likeADrop, removeLikeFromDrop } from '../actions'
import Image from 'next/image'
import { getRandomNumber } from '../lib/getRandomNumber'
import { useRouter } from 'next/navigation'

export default function MessageCard(props) {

    const router = useRouter();

    const getOrdinalYear = (year) => {
        const suffixes = ['th', 'st', 'nd', 'rd'];
        const v = year % 100;
        return year + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
    };

    const [active, setActive] = useState(false);
    const [response, setResponse] = useState('');

    const [reply, setReply] = useState(props.replies);

    const [likes, setLikes] = useState({
        isLiked: false,
        number: 0,
    });

    const [trigger1, setTrigger1] = useState(false)
    const [trigger2, setTrigger2] = useState(false)

    const number = getRandomNumber();
    const faceSrc = ['../face1.svg', '../face2.svg', '../eyeGlass.svg']
    const color = ['bg-bg1', 'bg-bg2', 'bg-bg3'];

    useEffect(() => {
        if (props.likes) {
            props.likes.forEach(likeId => {
                if (likeId === props.currentUserId) {
                    setLikes((prev) => ({
                        ...prev,
                        isLiked: true,
                        number: props.likes.length
                    }))
                }
            })
        }
    }, [])

    const handleChange = (e) => {
        const { value } = e.target;

        setResponse(value);

        if(response) setActive(true);

        if(!response) setActive(false);
    }

    const handleClick = async () => {

        if (!response) {
            alert("type something to reply, dumbass!");
            return;
        }

        const result = await addResponse(props.id, response);
        
        if (result) {
            setReply(prev => prev+1);
            alert("response sent");
            return;
        }

        if (!result) {
            alert("unable to spend reply, it's your net..");
            return;
        }
    }

    const pushToProfile = () => {
        if (!props.userId) {
            return;
        }

        router.push(`/profile/${props.userId}`);
    }

    const handleLikeClick  = async () => {
        if (!likes.isLiked) {
            const response = likeADrop(props.id)
        }

        if (likes.isLiked) {
            const response = removeLikeFromDrop(props.id)
        }

        setLikes((prev) => {
            if (!prev.isLiked) {
                setTrigger1(true);

                setTimeout(()=>{
                    setTrigger1(false);
                    setTrigger2(true);
                }, 400)
        
                setTimeout(()=>{
                    setTrigger2(false)
                }, 800)
            }
            return{
                ...prev,
                isLiked: !prev.isLiked,
                number: prev.isLiked ? prev.number - 1 : prev.number + 1
            }
        })

    }

    return (
        <div className='flex flex-col text-lg bg-surface py-3 gap-3 px-4 my-2'>
                <section className='flex gap-3 items-center' onClick={pushToProfile}>
                    <div className={`flex justify-center items-center ${color[number-1]} rounded-[15px] min-h-[38px] max-h-[38px] min-w-[40px] max-w-[40px]`}>
                        <Image
                            src={faceSrc[number-1]}
                            alt='mask'
                            height={30}
                            width={30}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <div className='flex justify-between'>
                            <div className={`${happyMonkey.className} text-xl`}>
                                {props.userName}
                            </div>
                            <div>

                            </div>
                        </div>
                        <div className='text-gray-400 text-xs flex gap-1'>
                            <span>{props.branch}</span>
                            <span>{
                                props.year ? getOrdinalYear(props.year) + ' year' : ''
                            }</span>
                        </div>
                    </div>
                </section>

            <Link href={`/home/${props.id}`}>
                <section className={`text-[18px] pb-4 pt-3 border-b-[0.1px] border-primary ${happyMonkey.className} tracking-wider`}>
                    <p className='ml-4'>
                        {props.content}
                    </p>
                </section>
            </Link>
            
            <section className='flex justify-between items-center pt-2'>
                <div className='flex gap-2 items-center'>
                    <div>
                        <input
                            placeholder='Your Response'
                            className='bg-secondary px-2 py-2 text-sm rounded-xl max-w-[120px] placeholder:text-white focus:outline-none'
                            onChange={handleChange}
                            value={response}
                            id='response'
                        />
                    </div>

                    <button 
                        className={`text-black py-1 px-2 rounded-lg text-sm  ${active ? 'bg-white font-bold' : 'bg-gray-200 font-medium'}`}
                        onClick={handleClick}
                    >
                        send
                    </button>
                </div>

                <div className='flex gap-3 items-center '>
                    <div 
                        className='flex transition-all duration-200 ease-in-out'
                        onClick={handleLikeClick}
                    >
                        {likes.isLiked ? '🔥' :<Image
                            src={'../fire.svg'}
                            width={23}
                            height={23}
                            alt={'like'} 
                            className='invert' 
                        />}
                        <span>
                            {likes.number}
                        </span>
                    </div>

                    <Link href={`/home/${props.id}`}>
                        <div className='flex gap-1 justify-center items-center text-gray-300 text-base'>
                            <Image
                                src={'../reply.svg'}
                                width={23}
                                height={23}
                                alt='reply'
                                className='invert'
                            />
                            <p className=''>
                                {reply}
                            </p>
                        </div>
                    </Link>
                </div>
            </section>

            <div className={`fixed max-h-screen z-50 bottom-20  left-1/2 -translate-x-1/2 ${trigger1 ? 'opacity-100 w-[100px] -translate-y-16' : 'opacity-0 w-[100px]'} ${trigger2 ? '-translate-y-20' : ' '}  aspect-square transition-all duration-300 ease-in`}>
                <img
                    src={'../512.gif'}
                    alt='🔥'
                />
            </div>
        </div>
    )
}