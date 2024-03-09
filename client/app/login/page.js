'use client'

import React, { useState, useEffect } from 'react';
import { keaniaOne, happyMonkey } from '../fonts';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { login } from '../actions';
import { checkAndGetUser } from '../actions';

export default function Login() {

    const router = useRouter();

  useEffect(() => {
    const checkAndGetUserAction = async () => {
      const response = await checkAndGetUser();

      if (response) {
        router.push('/home')
        localStorage.setItem('user', JSON.stringify(response))
        return;
      }
      
      return
    };

    checkAndGetUserAction();

  }, [])

    const [userData, setUserData] = useState({
        username: '',
        password: '',
    })

    const handleChange = (e)=> {
        const { id, value } = e.target
        setUserData((prev) => ({
            ...prev,
            [id] : value
        }))
    }

    const handleClick = async () => {
        console.log("button clicked")
        if (!userData.username || !userData.password) {
            alert('username and password are required');
            return;
        } 

        const { status, user } = await handleLogin();
        
        if (status) {
            localStorage.setItem('user', JSON.stringify(user));
            router.push('/home');
        }
        
        if (!status) {
            alert("icorrect credentials")
        }

        return;
    }

    const handleLogin = async () => {
        try {
            console.log("handling login")
            const response = await login(userData.username, userData.password);
            
            if (response.status) {
                return { status: response.status, user: response.status}
            }
            return { status: response.status  };
        } catch (error) {
            console.log(error)
            return { status: false }
        }
    }


    return (
        <div className='h-full px-10 pb-20 flex flex-col py-20 text-center items-center justify-center gap-40'>
           <header className={`text-[33px] ${keaniaOne.className} tracking-wider`}>
              WhisEve
            </header>

            <div className='flex flex-col gap-5'>
                <section className='flex justify-center border-b border-gray-400 pb-1'>
                    <Image
                        src="./user.svg"
                        alt='user'
                        width={29}
                        height={29}
                        className='invert'
                    />
                    <input
                        placeholder='username'
                        type='text'
                        id='username'
                        value={userData.username}
                        onChange={handleChange}
                        className={`bg-black ${happyMonkey.className} text-xl pl-5 focus:outline-none`}
                    />
                </section>

                <section className='flex justify-center border-b border-gray-400 pb-1'>
                    <Image 
                        src="./password.svg"
                        alt='lock icon'
                        width={26}
                        height={29}
                        className='invert'
                    />
                    <input
                        placeholder='password'
                        id='password'
                        type="password"
                        value={userData.password}
                        onChange={handleChange}
                        className={`bg-black ${happyMonkey.className} text-xl pl-5 focus:outline-none`}
                    />
                </section>
            </div>


            <section className='flex justify-center'>
                    <button
                        onClick={handleClick}
                         className={`${happyMonkey.className} bg-white text-black text-3xl flex flex-col justify-center items-center h-[90px] w-[120px] rounded-[50px]`}
                    >
                        <Image 
                            src="./next.svg"
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