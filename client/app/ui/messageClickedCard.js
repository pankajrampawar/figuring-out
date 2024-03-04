
import Link from "next/link"
import { happyMonkey } from "../fonts"

export default function MessageClickedCard(props) {
    return (
        <main className='flex flex-col text-lg bg-surface py-3 gap-3 px-4 mt-2'>
            <section className='flex flex-col'>
                    <div className='flex justify-between'>
                        <div className={`${happyMonkey.className} text-xl`}>
                            Anonymous
                        </div>
                        <div>

                        </div>
                    </div>
                    <div className='text-gray-400 text-xs'>

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