'use client'

import React, { useState, useEffect } from 'react'
import { keaniaOne, happyMonkey } from '@/app/fonts'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { signup } from '@/app/actions'
import { checkAndGetUser } from '@/app/actions'

export default function PageTwo() {

    const router = useRouter();

    useEffect(() => {
      const checkAndGetUserAction = async () => {
        const response = await checkAndGetUser();

        if (response.status) {
          const userCopy = response.user;  
          delete userCopy.password;

          router.push('/home')
          localStorage.setItem('user', JSON.stringify(userCopy));
        }
        
        return
      };
    
      checkAndGetUserAction();
    
    }, [])

    const [userData, setUserData] = useState({
        college: '',
        year: '', 
        branch: '',
        username: '',
        password: '',
    });



    useEffect(()=>{
        const stringData = localStorage.getItem('userData');
        
        const data = JSON.parse(stringData);

        setUserData((prev) => ({
            ...prev,
            college: data.college,
            year: data.year,
            branch: data.branch,
        }))

    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setUserData((prev)=>({
            ...prev,
            [id]: value
        }))
    }

    const handleSingup = async ()=>{
        if (!userData.username && !userData.password) {
            alert("username/password mei bharu? dumbass!");
            
            return;
        }

        const response = await signup(userData);

        if (response.status) {
            if (response.user) {
                const userCopy = response.user;
                delete userCopy.password;
                localStorage.setItem('user', JSON.stringify(userCopy))
            }
            router.push('/home');
            return;
        } 
        
        alert('not allowed for you :/ (jk, plz try again later), have a great day :)');
        
        return;
    }

    return (
        <div className='flex flex-col justify-center items-center gap-28 mt-20 px-10'>
            <header className={`text-[36px] ${keaniaOne.className} tracking-wider`}>
              WhisEve
            </header>

            <section className='flex flex-col gap-14 w-full max-w-[350px]'>
                <div className='flex gap-2 border-b border-gray-400 pb-2'>
                    <Image
                        src="../user.svg"
                        alt='user'
                        height={29}
                        width={29}
                        className='invert' 
                    />
                    <input 
                        placeholder='username'
                        type='text'
                        id='username'
                        value={userData.username}
                        onChange={handleChange}
                        className={`bg-black focus:outline-none ${happyMonkey.className} text-xl`}
                    />
                </div>
                
                <div className='flex gap-2 border-b border-gray-400 pb-2'>
                    <Image
                        src="../password.svg"
                        alt='user'
                        height={29}
                        width={29}
                        className='invert' 
                    />
                    <input 
                        placeholder='password'
                        id='password'
                        type='password'
                        value={userData.password}
                        onChange={handleChange}
                        className={`bg-black focus:outline-none ${happyMonkey.className} text-xl`}
                    />
                </div>
                
            </section>

            <section className='flex justify-center'>
                    <button
                    onClick={handleSingup}
                         className={`${happyMonkey.className} bg-white text-black text-3xl flex flex-col justify-center items-center h-[90px] w-[120px] rounded-[50px]`}
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