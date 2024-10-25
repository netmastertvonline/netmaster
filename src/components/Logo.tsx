import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface LogoProps {
  path: string
} 

const Logo = ({ path }: LogoProps) => {
  return (
    <div className='w-fit'>
        <Link id="aside-logo" className="flex items-center font-bold text-2xl gap-2" href={path}>
            <Image alt='' src={"https://netmastertvonline.com/wp-content/uploads/2022/10/favicon.png"} width={50} height={50} /> 
            <span className='text-white text-2xl'>Netmaster <br/> Tv Online</span>
        </Link>
    </div>
  )
}

export default Logo