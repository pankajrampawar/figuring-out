'use client'

import React from 'react'
import Image from 'next/image'

export default function BottomBar() {
    return (
        <div className='flex items-center p-2 bg-black border-t border-gray-600 text-xs'>
            <div className='flex justify-between items-center w-full px-3'>
                <div className='flex flex-col items-center'>
                    <span>
                        <Image
                            src='../group.svg'
                            alt='junto icon'
                            height={24}
                            width={30}
                            className='invert'
                        />
                    </span>
                    
                    <span className='-mt-1'>
                        Junto
                    </span>
                </div>

                <div className='flex flex-col items-center'>
                    <span>
                        <Image
                            src='../chat.svg'
                            alt='private message icon'
                            height={20}
                            width={20}
                            className='invert'
                        />
                    </span>
                    <span>
                        PM
                    </span>
                </div>

                <div className='flex flex-col items-center'>
                    <span>
                        <Image
                            src='../notifications.svg'
                            alt='notifications'
                            width={22}
                            height={22}
                            className='invert'
                        />
                    </span>
                    <span>
                        Tings
                    </span>
                </div>

                <div className='flex flex-col items-center'>
                    <span>
                        <Image
                            src='../user.svg'
                            alt='profle icon'
                            width={24}
                            height={24}
                            className='invert'
                        />
                    </span>
                    <span>
                        Profile
                    </span>
                </div>
            </div>
        </div>
    )
}