import { cn } from '@/lib/utils'
import React from 'react'

interface TitleH1AdminProps {
    text: string
    className?: string
    
} 

const TitleH1Admin = ({ text, className }: TitleH1AdminProps) => {
  return (
    <h1 className={cn(`font-bold text-xl ${className}`)}>{text}</h1>
  )
}

export default TitleH1Admin
