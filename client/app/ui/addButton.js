'use client'

import Image from "next/image"
import React, { useState, useEffect } from 'react';

export default function AddButton(){

    const [isAddDropVisible, setIsAddDropVisible] = useState(false) 

    const showAddDrop  = () => {
        setIsAddDropVisible(prev => !prev);
    }
    return (
        <div className="min-w-[60px] max-w-[60px] aspect-square rounded-full flex justify-center items-center bg-primary"
            onClick={showAddDrop}
        >
            <div>
                <Image
                    src='../add.svg'
                    alt="add button"
                    width={29}
                    height={29}
                />
            </div>
        </div>
    )
}