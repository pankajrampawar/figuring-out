'use client'


import React, { useState, useEffect} from 'react';
import { happyMonkey } from '../fonts';
import { postADrop } from '../actions';

export default function PostDrop(props) {

    const [drop, setDrop] = useState({
        craftToAdd: '',
    });


    const handleChange = (e) => {
        const { id, value } = e.target;

        setDrop((prev) => ({
            ...prev,
            [id] : value
        }))
    }

    const handleAddDrop = async () => {
        if (!drop.craftToAdd) {
            alert('type something to drop');
            
            return;
        }

        const response = await postADrop(drop, props.year, props.branch);

        if (response) {
            alert('drop sent');
            drop.craftToAdd = "";
            props.togglePostCardVisible();
        }
    }

    return (
        <div className='bg-surface p-4 rounded-lg flex items-end flex-col gap-4 min-w-[270px] relative'>
                <div className='w-full'>
                        <textarea
                            className='bg-surface focus:outline-none pb-2 border-b border-gray-400 w-full h-20'
                            placeholder='type a drop..'
                            id='craftToAdd'
                            value={drop.craftToAdd}
                            onChange={handleChange}
                        />
                </div>
                <div className=''>
                    <button 
                        className={`bg-white text-black font-bold ${happyMonkey.className} p-2 rounded-md h-fit`}
                        onClick={handleAddDrop}    
                    >
                        Drop
                    </button>
                </div>

                <p className={`absolute text-base -bottom-20 left-2 ${happyMonkey.className}`}>
                    your drops are completely anonymous, even GODS cant trace them..
                </p>
        </div>
    )
}