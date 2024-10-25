import { cn } from '@/lib/utils'
import React from 'react'

interface TitleH1SalesProps {
    text: string
    className?: string
    
} 

const TitleH1Sales = ({ text, className }: TitleH1SalesProps) => {
  return (
    <h1 className={cn(`font-bold text-xl ${className}`)}>{text}</h1>
  )
}

export default TitleH1Sales
