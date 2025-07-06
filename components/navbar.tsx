import  Link  from "next/link";

export default function Navbar(){
    return (
        <div className=" h-full w-screen border-b border-neutral-900/10 flex justify-evenly sticky top-0 backdrop-blur-xl">
            <div className="h-16 p-4">
                <Link href="/" className="text-2xl font-bold text-purple-600">VD Editor</Link >
            </div>
            <div className="p-5 gap-6 font-medium">
                <Link href={"/pricing"} className="pl-5" >About</Link>
                <Link href={"/pricing"} className="pl-5" >Edit</Link>                
                <Link href={"/pricing"} className="pl-5" >Pricing</Link>
                <Link href={"/pricing"} className="pl-5" >Support Us</Link>
            </div>
        </div>
    )
}

