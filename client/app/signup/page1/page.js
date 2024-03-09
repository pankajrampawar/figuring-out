'use client'

import React, { useState, useEffect } from 'react'
import { keaniaOne, happyMonkey } from '@/app/fonts'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { checkAndGetUser } from '@/app/actions'

export default function PageOne() {

    const router = useRouter();

    useEffect(() => {
        const performCheckAndGetUser = async () => {
            const userDetails = await checkAndGetUser();
            if (userDetails) {
                router.push('/home');
                localStorage.setItem('user', JSON.stringify(userDetails));
                return;
            }

            return;
        }

        performCheckAndGetUser();
    }, [])

    const [userData, setUserData] = useState({
        college: '',
        year: null,
        branch: ''
    })

    const handleChange = (e) => {
        const { id, value } = e.target

        setUserData((prev) => ({
            ...prev, 
            [id]: value
        }));
    }


    const handleCLick = () => {
        if (!userData.college && !userData.year && !userData.branch) {
            alert("Fill the details lazy ass")
            return;
        }

        localStorage.setItem('userData', JSON.stringify(userData));

        router.push('/signup/page2')
    }

    return (
        <div className='flex flex-col justify-center items-center gap-28 mt-20 px-10'>
            <header className={`text-[36px] ${keaniaOne.className} tracking-wider`}>
              WhisEve
            </header>

            <section className='flex flex-col gap-14'>
                
                <div className='flex gap-2 border-b border-gray-400 pb-2 min-w-[280px]'>
                    <Image
                        src="../college.svg"
                        alt='college'
                        height={29}
                        width={29}
                        className='invert'
                    />
                    <select
                        className={`bg-black w-full focus:outline-none ${happyMonkey.className} tracking-widest text-xl `}
                        id='college'
                        value={userData.college}
                        onChange={handleChange}
                    >
                        <option value="" style={{color: '#718096'}} disabled selected>College</option>
                        <option value="VESIT">VESIT</option>
                        <option value="SPIT">SPIT</option>
                        <option value="NMIMS">NMIMS</option>
                    </select>
                </div>

                <div className='flex gap-2 border-b border-gray-400 pb-2'>
                    <Image
                        src="../year.svg"
                        alt='user'
                        height={29}
                        width={29}
                        className='invert' 
                    />
                    <select
                        className={`bg-black w-full focus:outline-none ${happyMonkey.className} tracking-widest text-xl `}
                        id='year'
                        value={userData.year}
                        onChange={handleChange}
                    >
                        <option value="" style={{color: '#718096'}} disabled selected>Year</option>
                        <option value={1}>1st</option>
                        <option value={2}>2nd</option>
                        <option value={3}>3rd</option>
                        <option value={4}>4th</option>
                    </select>
                </div>

                <div className='flex gap-2 border-b border-gray-400 pb-2'>
                    <Image
                        src="../branch.svg"
                        alt='college'
                        height={29}
                        width={29}
                        className='invert'
                    />
                    <select
                        className={`bg-black w-full focus:outline-none ${happyMonkey.className} tracking-widest text-xl `}
                        id='branch'
                        value={userData.branch}
                        onChange={handleChange}
                    >
                        <option value="" style={{color: '#718096'}} disabled selected>Branch</option>
                        <option value="CMPN">CMPN</option>
                        <option value="EXTC">EXTC</option>
                        <option value="AIDS">AIDS</option>
                        <option value="ECS">ECS</option>
                    </select>
                </div>
            </section>

            <section className='flex justify-center'>
                    <button
                         className={`${happyMonkey.className} bg-white text-black text-3xl flex flex-col justify-center items-center h-[90px] w-[120px] rounded-[50px]`}
                         onClick={handleCLick}
                    >
                        <Image 
                            src="../next.svg"
                            alt='next'
                            height={40}
                            width={40}
                            className='-mb-2'
                        />
                        <p>Next</p>
                    </button>
            </section>
        </div>
    )
}