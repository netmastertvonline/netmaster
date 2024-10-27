import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { ReactNode } from "react"

type AsideSalesGenericProps =  {
    children:  React.ReactNode;
    className?: string;
    id?: string;
}

type AsideSalesLinkProps =  {
    children:  React.ReactNode;
    id?: string;
    className?: string;
    icon?: ReactNode;
    path: string;
    active?: boolean;
}

export function AsideSalesComponent ({ children, id, className }: AsideSalesGenericProps ) {
    return(
        <aside id={id} className={cn("w-full md:w-[280px] p-3 md:p-5 md:h-full bg-black/90 dark:bg-black/90 text-white", className)}>{children}</aside>
    )
}

export function AsideSalesContainer ({ children, id, className }: AsideSalesGenericProps ) {
    return(
        <div id={id} className={cn("flex flex-col h-full", className)}>{children}</div>
    )
}

export function AsideSalesItem ({ children, id, className }: AsideSalesGenericProps ) {
    return(
        <div id={id} className={cn("", className)}>{children}</div>
    )
}

export function AsideItemBetween ({ children, id, className }: AsideSalesGenericProps ) {
    return(
        <div id={id} className={cn("flex justify-between", className)}>{children}</div>
    )
}

export function AsideItemCol ({ children, id, className }: AsideSalesGenericProps ) {
    return(
        <ul id={id} className={cn("flex flex-row gap-2 md:gap-0  md:flex-col ", className)}>{children}</ul>
    )
}

export function AsideSalesLink ({ children, id, className,icon, path, active }: AsideSalesLinkProps ) {
    return(
        <li className="">
            <Link href={path} id={id} className={cn(`flex justify-start items-center gap-2 p-3 rounded-lg text-my_text ${active ? "bg-red-700 text-white" : "hover:bg-zinc-800" }`, className)}>
                <span className={` ${active ? "text-white": " dark:text-white"}`}>{icon}</span>
                {children}
            </Link> 
        </li>
    )
}