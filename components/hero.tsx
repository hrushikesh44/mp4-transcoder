import { FileChartLine, LucideVideotape, Pen, Upload } from "lucide-react";
import Link from "next/link";
import Card from "./card";

export default function Hero(){
    return (
        <div>
        <div className="h-full flex justify-center items-center pb-12 ">
            <div className="flex flex-col mx-auto pt-36"> 
            <span className="mx-auto text-6xl text-[#121212] font-bold tracking-tighter">Edit videos online, <span className=" text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-500 to-purple-400">
                Instantly</span></span>
            <span className="mx-auto text-2xl text-neutral-600 pt-3 ">
                Powerful browser-based editor for creators, marketers and teams.
            </span>
            <span className="mx-auto text-md text-neutral-500 w-2/5 text-center mt-6">Easily create videos using VD Editor, the quick and easy create-anything app. Using our online video editor, you can quickly create and share videos to all your social channels. No experience required.</span>
                <Link href={"/signin"} className="flex border border-neutral-600 rounded-full shadow-xl text-neutral-800 shadow-neutral-800/10 hover:shadow-purple-200 w-fit p-4 mt-5 mx-auto font-medium hover:bg-gradient-to-r from-purple-400/90 via-cyan-500/80 to-purple-400/90 text-black hover:border-purple-700 hover:scale-105 transition-transform ease-in-out duration-300">
            Start Editing{' '}
            <LucideVideotape className="size-6 ml-2 "/>
            </Link>
            </div>
      </div>
      <div className="h-fit w-full border-y flex justify-center border-neutral-900/10 bg-gradient-to-tr from-purple-500 to-pink-500 mt-28">
      <div className="pt-14 flex flex-col p-20">
        <span className="text-4xl font-bold text-center text-white">How to edit videos.</span>
        <div className="flex pt-10 gap-8">
        <Card icon={<Upload className="size-10"/> } header={'1.Upload a video.'}  text={"Begin a new project by selecting the video type you want to create or upload your own media and start from scratch."}/>
        <Card icon={<FileChartLine className="size-10"/>} header={"2. Select a template."} text={"Browse customizable video templates in VD Editor and select one that suits your visual style. Add icons, text, images, animation, and more."} />
        <Card icon={<Pen className="size-10"/>} header={"3. Edit the video."} text={"Crop, trim, or split your video. Add a soundtrack to your project, upload your own, or keep editing. Download your newly edited video as an MP4 file to save and share anywhere."} />
        </div>
       </div>
      </div>
    </div>
    )
}