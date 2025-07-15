'use client'

import { Menu, X } from "lucide-react";
import  Link  from "next/link";
import { useState } from "react";

export default  function Navbar(){
    const [isOpen, setIsOpen] =useState(false);
    return(
        <div className=" h-16 w-screen border-b border-black/10 sticky top-0 backdrop-blur-xl md:flex justify-around p-4 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-400 to-pink-400">
            <div className="flex justify-between">
                <Link href={'/'} className="text-xl font-bold truncate flex">
                Transcode.it
                </Link>
                <span className="md:hidden " onClick={() => setIsOpen((prev) => !prev)}>{!isOpen &&  <Menu className="size-6 text-black"/>}</span>
                {isOpen &&  (
                    <div className={`md:hidden h-screen w-[80vw] bg-[#fefefe] border-l border-neutral-900/10 flex flex-col gap-7 p-4 transition-all ease-in-out duration-300 ${isOpen ? 'max-h-full opacity-100' : 'max-h-0 opacity-0'}`} onClick={() => setIsOpen((prev) => !prev)}>
                        <X onClick={() => setIsOpen((prev) => !prev)} className=" text-black ml-auto"/>
                        <Link href='/' className="text-lg font-medium text-neutral-800 pt-6">About</Link>
                        <Link href='/transcode' className="text-lg font-medium text-neutral-800 pt-6">Transcode</Link>
                        <Link href='/pricing' className="text-lg font-medium text-neutral-800 pt-6">Pricing</Link>
                        <Link href='https://github.com/hrushikesh44/mp4-transcoder' className="text-lg font-medium text-neutral-800 pt-6">Support us</Link>
                    </div>
                )}
            </div>
            <div className="hidden md:block ">
                <Link href='/' className="text-lg font-medium text-neutral-800 pl-6">About</Link>
                <Link href='/transcode' className="text-lg font-medium text-neutral-800 pl-6">Transcode</Link>
                <Link href='/pricing' className="text-lg font-medium text-neutral-800 pl-6">Pricing</Link>
                <Link href='https://github.com/hrushikesh44/mp4-transcoder' className="text-lg font-medium text-neutral-800 pl-6">Support us</Link>
                
            </div>
        </div>
    )
}