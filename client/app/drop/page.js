'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import { happyMonkey } from "../fonts"
import { useRouter } from "next/navigation"
import { postAnonymousDrop } from "../actions"
import { adjustWord } from "../lib/removeExtraSpace"
import loadingSvg from '@/public/loader.svg'

export default function DropPage() {

    const router = useRouter();

    const [drop, setDrop] = useState('')

    const [tags, setTags] = useState('');

    const [direct, setDirect] = useState('')

    const [anonymous, setAnonymous] = useState(false)

    const [loading, setLoading] = useState(false)

    const [user, setUser] = useState('')

    useEffect(()=>{
        const userDataString = localStorage.getItem('user');
        if (!userDataString) {
            router.push('/');
            return;
        }

        const userData = JSON.parse(userDataString);
        
        setUser(userData);
    }, [])

    const handleDropChange = (e) => {
        const unAdjustedWord = e.target.value;

        const adjustedWord = adjustWord(unAdjustedWord)

        setDrop(adjustedWord);
        return;
    }

    const handleTagChange = (e) => {
        const unAdjustedTags  = e.target.value;
        
        const adjustedTags = adjustWord(unAdjustedTags);
        setTags(adjustedTags);
        return;
    }

    const handleDirect = () => {
        setDirect(true);
        setAnonymous(false);
    }

    const handleAnonymous = () => {
        setDirect(false);
        setAnonymous(true);
    }

    // Add drop 
    const handleSubmit = async () => {
        if (!drop && !tags && (!direct || !anonymous)) {
            alert('drop sent!')
            return;
        }

        if (loading) {
            return;
        }

        if(anonymous) {
            setLoading(true);
            const response = await postAnonymousDrop({
                content: drop.trim(), 
                branch: user.branch, 
                year: user.year, 
                tags: tags
            })

            if (!response) {
                setLoading(false)
                alert('plz try again later');
                router.push('/home')
                return;
            }

            setLoading(false);
            alert('drop sent');  // create custom alert afterwards
            router.push('/home')
            return;
        }

        if (direct) {
            setLoading(true);
            const response = await postDirectDrop({
                content: drop.trim(),
                userName: user.userName,
                branch: user.branch,
                year: user.year,
                tags: tags
            })

            if (response) {
                setLoading(false);
                alert('drop sent');
                router.push('/home');
                return;
            }

            alert('plz try again later')
            router.push('/home')
        }

        return;
    }
    
    return (
        <main className="flex justify-center items-center xl:pt-10">
            <div className={`flex flex-col gap-12 p-3 max-w-[600px]  ${happyMonkey.className} text-xl`}>
            <div className="flex flex-col gap-10">
                <div>
                    <Image
                        src='/back.svg'
                        alt='back icon'
                        height={24}
                        width={24}
                        className="invert"
                        onClick={()=>{router.push('/home')}}
                    />
                </div>

                <div className="flex flex-col gap-6 px-2 self-center min-w-[300px] max-w-[400px]">
                    <input
                        placeholder="type a drop"
                        className="bg-black border-b-[0.1px] pb-1 pl-1 focus:outline-none"
                        value={drop}
                        onChange={handleDropChange}
                    />

                    <input
                        placeholder="#tags (#crush, #utsav, #..)"
                        className="bg-black pb-1 border-b-[0.1px] pl-1 focus:outline-none"
                        value={tags}
                        onChange={handleTagChange}
                    />
                </div>

                <div className="flex gap-4 px-2">
                    <button 
                        onClick={handleDirect}
                        className={`bg-slate-200 text-black p-1 rounded-xl ${direct ? 'bg-white border-primary' : ''} border-2 hover:bg-white  hover:border-primary`}>
                        Direct
                    </button>

                    <button
                        onClick={handleAnonymous} 
                        className={`bg-slate-200 text-black p-1 rounded-xl hover:bg-white border-2 hover:border-primary ${anonymous ? ' bg-white border-primary' : ' '}`}>
                        Anonymous
                    </button>
                </div>
            </div>
            
            { 
            <div className="flex justify-end px-10">
                <button 
                    onClick={handleSubmit}
                    className={`flex justify-center items-center min-w-24 min-h-10 rounded-xl text-2xl px-3 ${drop && tags && ( direct || anonymous ) ? 'text-black opacity-100' : 'text-black opacity-60'} bg-primary p-1`}
                >
                    {!loading ? 'drop' : 
                        <Image
                            src={loadingSvg}
                            height={10}
                            width={60}
                            alt="loading"
                            className="invert ml-3 mt-1"
                        />
                    }
                </button>
            </div>
            }
            </div>
        </main>
    )
}