import { LucideGithub, Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Footer(){
  return (
    <div className='flex flex-col items-center justify-center border-t border-black/20 pt-10'>
        <div className='flex items-center justify-center mb-30'>
            <Link href='https://www.github.com/hrushikesh44' target='_blank' className='mr-10'>
                <LucideGithub className='size-10'/>
            </Link>
            <Link href='https://www.x.com/hrushikesh_44' target='_blank' className='mr-10'>
                <Image src={'/x.png'} alt='' width={30} height={30}/>
            </Link>
            <Link href={"mailto:hrushikesh44.dev@gmail.com"}>
                <Mail className='size-10'/>
            </Link>
        </div>
        <p className='bottom-0'>© 2025 Transcode it . All rights reserved.</p>
    </div>
  )
}