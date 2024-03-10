'use client'
import { useState, useEffect } from "react"
import { userDrops } from "../actions"
import { resolve } from "styled-jsx/css"
import { happyMonkey } from "../fonts"

export default function UserDrops(props) {
    const [drops, setDrops] = useState('')


    useEffect(() => {
        const getUserDropsActions = async () => {
            const response = await userDrops(props.userId);
            console.log(response)
            if (!response) return; 
            setDrops(response);
            return;
        }

        getUserDropsActions();
    }, [props.userId])

    const DropCard = ({ content }) => {
        return (
            <div className={`bg-surface p-2 ${happyMonkey.className}`}> 
                {content}
            </div>
        )
    }
    
    return (
        <div className="flex flex-col gap-2 text-lg">
            {
                drops && Array.isArray(drops) && drops.length > 0  ? 
                drops.map((drop) => <DropCard key={drop._id} content={drop.content}/>) :
                ''
            }
        </div>
    )
}
