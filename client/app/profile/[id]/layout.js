import Navbar from "@/app/ui/navBar";

export default function Layout({ children }) {
    return (
        <div>
            <div>
                <Navbar/>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}