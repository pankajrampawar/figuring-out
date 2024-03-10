import BottomBar from "@/app/ui/bottomBar";
import Navbar from "@/app/ui/navBar";

export default function Layout({ children }) {
    return (
        <div>
            <div className="fixed top-0 transparentBlack w-full">
                <Navbar/>
            </div>
            <div className="mt-[52px]">
                {children}
            </div>
            <div className="fixed bottom-0 w-full">
                <BottomBar/>
            </div>
        </div>
    )
}