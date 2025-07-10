import { FileChartLine, LucideVideotape, Pen, Upload } from "lucide-react";
import Link from "next/link";
import SmallCard from "./card";
import Image from "next/image";

export default function Hero(){
    return (
        <div>
        <div className="h-full flex justify-center items-center pb-12 ">
            <div className="flex flex-col mx-auto pt-36"> 
            <span className="mx-auto text-6xl text-[#121212] font-bold tracking-tighter">Convert videos online, <span className=" text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-500 to-purple-400">
                Instantly</span></span>
            <span className="mx-auto text-2xl text-neutral-600 pt-3 ">
                Powerful browser-based converting tool for linux users and everyone.
            </span>
            <span className="mx-auto text-md text-neutral-500 w-2/5 text-center mt-6">Easily convert video from one format to any other format with ease and just one click. Helps mainly linux users for screen recordings conversion. No need to stress your cpu, just use our web based tool.</span>
                <Link href={"/transcode"} className="flex border border-neutral-600 rounded-full shadow-xl text-neutral-800 shadow-neutral-800/10 hover:shadow-purple-200 w-fit p-4 mt-5 mx-auto font-medium hover:bg-gradient-to-r from-purple-400/90 via-cyan-500/80 to-purple-400/90 text-black hover:border-purple-700 hover:scale-105 transition-transform ease-in-out duration-300">
            Convert videos{' '}
            <LucideVideotape className="size-6 ml-2 "/>
            </Link>
            </div>
      </div>
      <div className="h-fit w-full border-y flex justify-center border-neutral-900/10 bg-gradient-to-tr from-purple-500 to-pink-500 mt-40 mb-40">
      <div className="pt-14 flex flex-col p-20">
        <span className="text-4xl font-bold text-center text-white">How to convert videos.</span>
        <div className="flex pt-10 gap-8">
        <SmallCard icon={<Upload className="size-10"/> } header={'1.Upload a video.'}  text={"Begin by selecting the video type you want to convert from your media and start to convert."}/>
        <SmallCard icon={<FileChartLine className="size-10"/>} header={"2. Select a type."} text={"Browse customizable video types in VD converter and select one that suits your use case."} />
        <SmallCard icon={<Pen className="size-10"/>} header={"3. Convert the video."} text={"Your video will be converted into your desired selected type and even customise video quality along with fps."} />
        </div>
       </div>
      </div>
    </div>
    )
}