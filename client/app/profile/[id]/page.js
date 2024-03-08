'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getUser } from '@/app/actions';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { happyMonkey } from '@/app/fonts';
import moreVert from '@/public/morevert.svg'

export default function UserProfile() {

    const router = useRouter();
    const params = useParams();

    const [userSeen, setUserSeen] = useState('');

    const [user, setUser] = useState({
        slayScore: '',
        drops: '',
        replies: '',
        wordsOfConcern: '',
        friends: '',
        _id: '',
        userName: '',
        college: '',
        year: '',
        branch: ''
    });

    useEffect(()=>{
        const userDetails = localStorage.getItem('user');

        if (!userDetails) {
            router.push('/')
            return;
        }

        setUser(JSON.parse(userDetails))

        const getUserDetails = async () => {
            const userSeenDetails = await getUser(params.id)

            if (!userSeenDetails) {
                alert('some error, unable to load profile!');
                router.push('/home');
                return;
            }
            setUserSeen(userSeenDetails);
        }

        getUserDetails();
    }, [])

    return (
        <div>
            <div>
                <div className='flex gap-3 items-start px-3 pt-2'>
                    <div className='min-w-[62px] bg-surface h-[62px] rounded-xl'>
                        
                    </div>

                    <div className={`text-[24px] ${happyMonkey.className} flex flex-col w-full`}>
                        <div className='flex justify-between w-full items-center'>
                            <div>
                                {userSeen.userName}
                            </div>

                            <div>
                                <div className='flex items-start'> {/* 3 dots */}
                                    <Image
                                        src={moreVert}
                                        height={24} 
                                        width={24}
                                        alt='menu'
                                        className='invert'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={`text-[20px] -mt-2 text-gray-500`}>
                            single
                        </div>
                    </div>
                </div>

                <div className={`flex justify-evenly mt-8 ${happyMonkey.className}`}>
                    <div className='bg-primary2 w-[84px] h-[60px] rounded-[20px] flex flex-col justify-center items-center text-2xl text-primary'>
                        <div>
                            {userSeen.slayScore}
                        </div>
                        
                        <div className='text-sm'>
                            Slay Score
                        </div>
                    </div>
                    <div className='bg-primary2 w-[84px] h-[60px] rounded-[20px] flex flex-col justify-center items-center text-2xl'>
                        <div>
                            {Array.isArray(userSeen.friends) ? userSeen.friends.length : ' '}
                        </div>
                        <div className='text-sm'>
                            friends
                        </div>
                    </div>
                    <div className='bg-primary2 w-[84px] h-[60px] rounded-[20px] flex flex-col justify-center items-center text-2xl'>
                        <div>
                            {Array.isArray(userSeen.drops) ? userSeen.drops.length : ' '}
                        </div>
                        <div className='text-sm'>
                            drops
                        </div>
                    </div>
                </div>

                <div>
                    {userSeen.bio}
                </div>

                <div>
                    <div>
                        {/* section beFriend */}
                    </div>

                    <div>
                        {/* section message */}
                    </div>
                </div>
            </div>

            <div>
                <div>
                    <div>
                        posts
                    </div>
                    <div>
                        Replies
                    </div>
                </div>

                <div>
                    here come the drop
                </div>
            </div>
        </div>
    )
}

