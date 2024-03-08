
import Link from "next/link"
import { happyMonkey } from "../fonts"
import { getRandomNumber } from "../lib/getRandomNumber";
import Image from "next/image";

export default function MessageClickedCard(props) {
    
    const getOrdinalYear = (year) => {
        const suffixes = ['th', 'st', 'nd', 'rd'];
        const v = year % 100;
        return year + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
    };

    const number = getRandomNumber();
    const faceSrc = ['../face1.svg', '../face2.svg', '../eyeGlass.svg']
    const color = ['bg-bg1', 'bg-bg2', 'bg-bg3'];

    return (
        <main className='flex flex-col text-lg bg-surface py-3 gap-3 px-4 mt-2'>
             <section className='flex gap-3 items-center'>
                    <div className={`flex justify-center items-center ${color[number-1]} rounded-[15px] min-h-[38px] max-h-[38px] min-w-[40px] max-w-[40px]`}>
                        <Image
                            src={faceSrc[number-1]}
                            alt='mask'
                            height={30}
                            width={30}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <div className='flex justify-between'>
                            <div className={`${happyMonkey.className} text-xl`}>
                                {props.userName}
                            </div>
                            <div>

                            </div>
                        </div>
                        <div className='text-gray-400 text-xs flex gap-1'>
                            <span>{props.branch}</span>
                            <span>{
                                props.year ? getOrdinalYear(props.year) + ' year' : ''
                            }</span>
                        </div>
                    </div>
                </section>

            <section className='text-[18px] pb-4 pt-3 border-b border-gray-500'>
                <p className='ml-4'>
                    {props.content}
                </p>
            </section>
        
        <section className='flex justify-center items-center pt-2'>
            <div className='flex gap-4 text-xl'>

            </div>
        </section>
    </main>
    )
}