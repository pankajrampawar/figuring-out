'use client'
import { useRouter } from "next/navigation"

export default function Card() {

    const router = useRouter();

    return (
        <div className="absolute right-10 text-base bg-black p-2 rounded shadow-3xl shadow z-40 cursor-pointer"
            onClick={() => {router.push('/EditProfile')}}
        >
            Edit profile
        </div>
    )
}