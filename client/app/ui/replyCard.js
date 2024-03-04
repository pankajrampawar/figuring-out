'use client'

import React, { useState, useEffect } from 'react';

export default function ReplyCard(props) {

    return (
        <div className='bg-surface flex flex-col rounded-l-2xl p-4 pb-2 pt-3'>
            <section className='pb-3 border-b border-gray-400'>
                <p>
                    {props.content}
                </p>
            </section>
            <section className='flex gap-3 justify-center pt-3'>
            </section>
        </div>
    )
}