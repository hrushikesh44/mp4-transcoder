import { ArrowRight, FileChartLine, FileVideo2, LucideVideotape, Pen, RulerDimensionLine, SlidersHorizontal, Upload, Videotape } from "lucide-react";
import Link from "next/link";
import SmallCard from "./card";
import LargeCard from "./outside-card";

export default function Hero(){
    return (
        <div>
        <div className="h-full flex justify-center items-center pb-12 ">
            <div className="flex flex-col mx-auto pt-36"> 
            <span className="mx-auto text-3xl md:text-6xl text-[#121212] font-bold tracking-tighter px-5 text-center">Convert videos online, <span className=" text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-400 to-pink-400 text-center">
                Instantly</span></span>
            <span className="mx-auto text-xl md:text-2xl text-neutral-600 pt-3 px-5 text-center ">
                Powerful browser-based converting tool for linux users and everyone.
            </span>
            <span className="mx-auto text-sm text-md px-5 text-neutral-500 md:w-2/5 text-center mt-6">Easily convert video from one format to any other format with ease and just one click. Helps mainly linux users for screen recordings conversion. Built using FFMPEG Web Assembly.</span>
                <Link href={"/transcode"} className="flex border border-neutral-600 rounded-full shadow-xl text-neutral-800 shadow-neutral-800/10 hover:shadow-neutral-200 w-fit p-5 mt-5 mx-auto font-medium hover:bg-neutral-800 hover:text-neutral-200 hover:duration-300 hover:border-neutral-700 hover:scale-105 transition-transform ease-in-out duration-300">
            Convert videos{' '}
            <LucideVideotape className="size-6 ml-2 "/>
            </Link>
            </div>
      </div>
      <div className="flex justify-center"> 
         <div className="h-fit w-[90vw] md:w-[80vw] border-y flex justify-center border-neutral-900/10 bg-gradient-to-tr from-purple-500 via-purple-300 to-pink-500 mt-20 shadow-lg mb-20 rounded-xl">
            <div className="pt-14 flex flex-col p-20">
                <span className="text-2xl sm:text-4xl font-bold text-center text-white">How to convert videos.</span>
                <div className="flex flex-col md:flex-row pt-10 gap-8">
                    <SmallCard icon={<Upload className="size-10"/> } header={'1.Upload a video.'}  text={"Begin by selecting the video type you want to convert from your media and start to convert."}/>
                    <SmallCard icon={<FileChartLine className="size-10"/>} header={"2. Select a type."} text={"Browse customizable video types in Transcoder and select one that suits your use case."} />
                    <SmallCard icon={<Pen className="size-10"/>} header={"3. Convert the video."} text={"Your video will be converted into your desired selected type and even customise video quality along with fps."} />
                </div>
            </div>
        </div>
      </div>
      <div className="h-fit w-full flex justify-center items-center mb-20">
        <div className="flex flex-col items-center">
            <p className="text-2xl md:text-3xl font-bold tracking-wide pb-4">Endless Customisations</p>
            <p className="text-wrap w-[70w] md:w-[30vw] text-center text-sm text-neutral-500 mb-5">You can choose from many options that are available including framerate, video quality and many more..</p>
            <div className="my-5 h-fit w-fit flex justify-center p-2 hover:scale-105 duration-300">
                <LargeCard icon={<FileVideo2 className="size-10" />} header={'Customise your framerate accordingly'} text="You can customise the framerate you want to transcode your video into by giving the number"/>
            </div>
            <div className="my-5 h-fit w-fit flex justify-center p-2 hover:scale-105 duration-300  ">
                <LargeCard icon={<Videotape className="size-10" />} header={'Different video quality'} text="You can choose from four different video qualities you want to transcode your video into by giving the number"/>
            </div>
            <div className="my-5 h-fit w-fit flex justify-center p-2 hover:scale-105 duration-300  ">
                <LargeCard icon={<RulerDimensionLine className="size-10" />} header={'Different dimensions'} text="Choose the dimensions you want to use to upload the video accordingly in different platforms."/>
            </div>
        </div>
      </div>
      <div className="flex justify-center my-10">
        <div className="h-fit w-[80vw] border-y flex justify-center border-neutral-900/10 bg-gradient-to-tr from-purple-500 via-purple-300 to-pink-500 mt-20 shadow-lg mb-20 rounded-xl">
            <div className="p-10 w-[70vw] md:w-[50vw]">
                <p className="text-2xl md:text-5xl font-bold text-center text-white">Ready to convert using our Transcoder?</p>
                <p className="text-xl text-center text-white pt-5">Be one of our early users to start using the product and provide your feedback. It's free and very secure.</p>
                <Link href={"/transcode"} className="flex border border-neutral-300 rounded-full shadow-xl text-neutral-800 bg-neutral-100 w-fit p-4 mt-5 mx-auto text-lg font-medium hover:bg-neutral-800 hover:text-neutral-200 hover:duration-300 hover:border-neutral-700 hover:scale-105 transition-transform ease-in-out duration-300">
                Try it now{' '}
                    <ArrowRight className="size-6 ml-2 mt-0.5" />
                </Link>
            </div>
        </div>
      </div>
    </div>
    )
}