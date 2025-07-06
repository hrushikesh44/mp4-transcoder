
import { ReactNode } from "react"

interface CardProps{
    icon: ReactNode;
    header: string;
    text: string
}

export default function Card({icon, header, text} :CardProps){
    return (
        <div className="w-[20vw] h-full bg-white rounded-md flex p-5 ">
            <div className="text-black font-bold pt-2">
                <span >{icon}</span>
            </div>
            <div className="pl-3">
                <span className="text-lg font-bold"> {header}</span><br />
                <span className="text-sm text-neutral-500 ">{text}</span>
            </div>
        </div>
    )
}