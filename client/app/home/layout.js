'use client'

import Navbar from "../ui/navBar"
import BottomBar from "../ui/bottomBar";
import { useState, useEffect } from 'react'
import AddButton from "../ui/addButton";
import { useRouter, useParams, usePathname } from "next/navigation";
import PostDrop from "../ui/postAMessage";
import Link from "next/link";
import { checkAndGetUser } from "../actions";
import Loading from "./(overview)/loading";


export default function RootLayout({children}) {

    const pathname = usePathname();

    const params = useParams();

    const router = useRouter();

    const [prevScrollPosition, setPrevScrollPosition] = useState(0);
    const [visible , setVisible] = useState(true);
    const [user, setUser] = useState('');

    useEffect(()=>{
        const getUserDataFromBackend = async () => {
            const userDataFromBackend = await checkAndGetUser();

            if (!userDataFromBackend) {
                router.push('/');
                return;
            }

            localStorage.setItem('user', JSON.stringify(userDataFromBackend))
            setUser(userDataFromBackend);
        }

        getUserDataFromBackend();
    }, [])


    useEffect(()=>{

        if(pathname === `/home/${params.id}`) setVisible(false);

        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            
            setVisible(prevScrollPosition > currentScrollPos || currentScrollPos < 14);
            setPrevScrollPosition(currentScrollPos)
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [prevScrollPosition, visible]);

    return (
        <div>
            {
                !user ? '' 
                :
                <div>
                    <nav className={`fixed bg-black w-full transition-all duration-500 top-0 left-0 ${visible ? 'opacity-100' : 'opacity-0 -translate-y-12'} z-50`}>
                        <Navbar/>
                    </nav>
                    
                    <div className="pt-12">
                        {children}
                    </div>
                    
                    <div className={`fixed bg-black w-full transition-all duration-500 bottom-0 left-0 ${ visible ? 'opacity-100' : 'opacity-0 translate-y-8' }`}>
                        <BottomBar/>
                    </div>
                    
                    <Link href="/drop">
                    <div className={`fixed bottom-20 right-2 transition-all duration-500 ${visible ? 'opacity-100' : 'opacity-0 translate-x-14'}`}>
                        <AddButton/>
                    </div>
                    </Link>
                </div>
            }
        </div>
    )
}