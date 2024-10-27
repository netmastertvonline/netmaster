import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"

import React from 'react'
import { Button } from "./ui/button"
import { UserRoundPen } from "lucide-react"
import EmployeeForm from "./EmployeeForm"
import TitleH1Sales from "./employees/sales/TitleH1Sales"


const Profile = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant={"ghost"} className="flex w-full gap-2 justify-start h-[48px] items-center hover:bg-zinc-800 hover:text-white">
                    <UserRoundPen />
                    <span className="text-base">Perfil</span>
                </Button>
            </SheetTrigger>
            <SheetContent>
                <TitleH1Sales text="Editar perfil" className="mb-5"/>
                <EmployeeForm />
            </SheetContent>
        </Sheet>
    )
}

export default Profile
