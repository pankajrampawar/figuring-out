'use client'

import React from 'react';
import Image from 'next/image';
import { keaniaOne } from '../fonts';

export default function Navbar() {
    return (
        <div className='flex justify-start items-center px-3 py-2 gap-2 border-b border-gray-500'>
            <div className='hidden'>
                <Image
                    src="../menu.svg"
                    alt='menu icon'
                    height={30}
                    width={30}
                    className='invert'
                />
            </div>
            <div className={`text-2xl ${keaniaOne.className} tracking-wider`}>  
                WhisEve
            </div>
        </div>
    )
}