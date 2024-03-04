'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import { happyMonkey } from "../fonts"

export default function DropPage() {

    const [drop, setDrop] = useState('')

    const [tags, setTags] = useState('');

    const [direct, setDirect] = useState('')

    const handleDropChange = (e) => {
        const content = e.target.value;

        setDrop(content);
        return;
    }

    const handleTagChange = (e) => {
        const content  = e.target.value;

        setTags(content);
        return;
    }



    
    return (
        <main className={`flex flex-col p-3 ${happyMonkey.className} text-xl`}>
            <div className="flex flex-col gap-10">
                <div>
                    <Image
                        src='/back.svg'
                        alt='back icon'
                        height={24}
                        width={24}
                        className="invert"
                    />
                </div>

                <div className="flex flex-col gap-6 px-5 self-center w-[300px] max-w-[400px]">
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
                        onClick={()=>{handleClick('direct')}}
                        className="bg-slate-200 text-black p-1 rounded-xl hover:bg-white hover:border-2 border-primary">
                        Direct
                    </button>

                    <button className="bg-slate-200 text-black p-1 rounded-xl hover:bg-white hover:border-2 border-primary">
                        Anonymous
                    </button>
                </div>
            </div>
            
            { drop && tags && 

            <div className={`${drop && tags && direct ? 'hidden' : ' '}`}>
                <button>Drop</button>
            </div>
            }
        </main>
    )
}