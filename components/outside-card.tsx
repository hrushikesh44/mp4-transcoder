import { ReactNode } from "react"

interface LargeCardProps{
    icon: ReactNode;
    header: string;
    text: string
}

export default function LargeCard({icon, header, text} :LargeCardProps){
    return (
        <div className="h-fit w-[80vw] md:w-[40vw] md:h-full bg-white border border-black/10 rounded-md flex p-5 hover:scale-110 duration-300 group">
            <div className=" font-bold pt-2">
                <span >{icon}</span>
            </div>
            <div className="pl-3">
                <span className="text-lg font-bold"> {header}</span><br />
                <span className="text-sm text-neutral-500 ">{text}</span>
            </div>
        </div>
    )
}