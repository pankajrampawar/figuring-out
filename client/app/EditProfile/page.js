'use client'

import { useState } from "react";
import useImageHook from "../imagehook";
import { useRouter } from "next/navigation";
import EditorCard from "../ui/editorCard";
import { happyMonkey } from "../fonts";
import Image from "next/image";
import back from '@/public/back.svg'


export default function HandleProfileChange() {

    const router = useRouter();

    const { handleImageChange, imgUrl, error, clearImage } = useImageHook();
    const [editorOpen, setEditorOpen] = useState(false)

    const setBack = () => {
        router.push('/home')
    }

    const submitImageChange= () => {
        console.log('handling submit')
    }

    const submitProfileChage = () => {
        console.log('handling profile change')
    }

    return(
        <div>
            <div onClick={setBack} className="cursor-pointer pt-3 pl-5">
                <Image
                    src={back}
                    alt="go back icon"
                    width={24}
                    height={24}
                    className="invert"
                />
            </div>
            <div className="flex flex-col items-center gap-10">
                <div className="w-52 h-52 bg-primary2 rounded-[70px]"
                    onClick={() => {setEditorOpen(prev => !prev)}}
                >
                    {/*profile Image*/}
                    <div>

                    </div>
                </div>

                <div className={`w-full text-2xl ${happyMonkey.className} flex flex-col gap-8 px-4 max-w-[400px]`}>
                    <div className="flex flex-col gap-2">
                        <div>
                            Bio
                        </div>
                        <div className="px-4">
                            <textarea className="bg-black border border-gray-600 text-xl focus:outline-none w-full h-20" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 bg-red-300">
                            <select
                                className={`bg-black w-full focus:outline-none ${happyMonkey.className} tracking-widest text-xl`}
                            >
                                <option value="" style={{color: '#718096'}} disabled selected>Relationship status</option>
                                <option value="Single">Single</option>
                                <option value="Boring">Boring</option>
                                <option value="Chessy">Cheesy</option>
                            </select>
                    </div>
                </div> 
            </div>

            {
                editorOpen && 
                <div className="fixed top-0 left-0 w-screen h-screen flex justify-center z-20">
                    <EditorCard
                        closeEditor={() => {setEditorOpen(false)}}
                        handleImageChange={handleImageChange}
                        handleSubmit={submitImageChange}
                    />
                    <div className="w-full h-full absolute backdrop:blur-3xl bg-black">
                    </div>
                </div>
            }
        </div>
    )
}