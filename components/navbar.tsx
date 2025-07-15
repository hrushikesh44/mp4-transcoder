import { Star } from "lucide-react";
import  Link  from "next/link";

export default function Navbar(){
    return (
        <div className=" h-full w-screen border-b border-neutral-900/10 flex justify-evenly sticky top-0 backdrop-blur-xl z-50">
            <div className="h-16 p-4">
                <Link href="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-400 to-pink-400">Transcode.it</Link >
            </div>
            <div className="p-5 gap-6 font-medium">
                <Link href={"/"} className="pl-5" >About</Link>
                <Link href={"/transcode"} className="pl-5" >Transcode</Link>                
                <Link href={"/pricing"} className="pl-5" >Pricing</Link>
                <Link href={"https://www.github.com/hrushikesh44/mp4-transcoder"} target="_blank" className="p-3 border border-black/30 ml-5 rounded-2xl hover:bg-neutral-800 hover:text-neutral-200 duration-300" >Support Us</Link>
            </div>
        </div>
    )
} 

