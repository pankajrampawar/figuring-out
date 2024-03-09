'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getUser } from '@/app/actions';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { happyMonkey } from '@/app/fonts';
import moreVert from '@/public/morevert.svg'
import loadingSvg from '@/public/loader.svg'
import { sendFriendRequest } from '@/app/actions';
import ProfileSkeleton from '@/app/ui/profile/skeletonOfProfilePage';

export default function UserProfile() {

    const router = useRouter();
    const params = useParams();

    const [userSeen, setUserSeen] = useState('');
    const [posts, setPosts] = useState(true);
    const [replies, setReplies] = useState(false)
    const [bfLoading, setBfLoading] = useState(false);
    const [loading, setLoading] = useState(true)

    const [user, setUser] = useState('');

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
        setLoading(false)
    }, [])

    const sendRequest = async () => {
        setBfLoading(true)
        const response = await sendFriendRequest(params.id);
        if (!response) {
            setBfLoading(false);
            alert('please try again later')
            return;
        }
        setBfLoading(false);
        alert('request sent');
        return;
    }

    return (
        <div>
        {
            loading && <ProfileSkeleton/>
        }

        {!loading && <div>
            <div className='bg-surface'>
                <div className='flex gap-3 items-start px-5 pt-2'>
                    <div className='min-w-[58px] min-h-[58px] min-[375px]:min-w-[62px] bg-primary2 min-[375px]:h-[62px] rounded-xl'>
                        
                    </div>

                    <div className={`text-[20px] min-[375px]:text-[24px] ${happyMonkey.className} flex flex-col w-full`}>
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
                        <div className={`text-[16px] min-[375px]:text-[20px] -mt-2 text-gray-500`}>
                            single
                        </div>
                    </div>
                </div>

                <div className={`flex justify-evenly mt-8 ${happyMonkey.className} border-b-[0.1px] pb-6 border-primary `}>
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

                <div className='flex justify-center items-center py-4 text-center px-5 border-b-[0.1px] border-primary'>
                    {userSeen.bio ? userSeen.bio : "nothing to see here.."}
                </div>

                {   user._id === userSeen._id ? 
                    " " 
                    :
                    <div className={`flex justify-between px-8 text-black text-xl py-4 ${happyMonkey.className}`}>
                        <div>
                            <button className='bg-white p-1 rounded-xl min-h-[38px] min-w-[115px] hover:bg-primary border border-white '
                                onClick={sendRequest}
                            >
                                {
                                    bfLoading 
                                        ? 
                                    <Image
                                        src={loadingSvg}
                                        height={10}
                                        width={60}
                                        alt="loading"
                                        className="invert ml-3 mt-1"
                                    />
                                        :
                                    <div>Befriend</div>
                                }
                            </button>
                        </div>

                        <div>
                            <button className='bg-primary p-1 rounded-xl min-h-[38px] min-w-[115px] hover:bg-white border border-primary '>
                                Message
                            </button>
                        </div>
                    </div>
                }
            </div>

            <div className='flex flex-col py-4'>
                <div className='text-xl flex justify-between px-8'>
                    <div className={` ${posts ? 'clicked' : '' } afterEffect relative`} 
                        onClick={()=>{
                            setReplies(false);
                            setPosts(true);
                        }}
                    >
                        Posts
                    </div>
                    <div className={` ${replies ? 'clicked' : '' } afterEffect relative`} 
                        onClick={()=>{
                            setReplies(true);
                            setPosts(false)
                        }}
                    >
                        Replies
                    </div>
                </div>

                <div className='flex flex-col py-4'>
                    {
                        posts 
                            ? 
                        <div>
                            here are the posts
                        </div>
                            :
                        ""
                    }

                    {
                        replies
                            ?
                        <div>
                            here will be the replies
                        </div>
                            :
                        "" 
                    }
                </div>
            </div>
        </div>}
        </div>
    )
}

