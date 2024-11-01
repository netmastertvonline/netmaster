import React from "react";
import { AsideAdminComponent, AsideAdminContainer, AsideAdminItem, AsideItemBetween } from "./components";
import GroupAdminLink from "./group-admin-link";
import Logo from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ArrowLeftToLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import Profile from "@/components/Profile";

const AsideAdmin = () => {
    return (
        <AsideAdminComponent id="aside-component">
            <AsideAdminContainer id="aside-container">

                <AsideAdminItem id="aside-logo-container" className="text-primary w-fit mb-8 cursor-pointer">
                    <Logo path="/admin/dashboard" />
                </AsideAdminItem>

                <AsideAdminItem id="menu" className="h-full">
                    <AsideItemBetween className="flex-col h-full">
                        <AsideAdminItem id="menu-container" className="no-scroll overflow-x-auto md:overflow-x-hidden">
                            <GroupAdminLink />
                        </AsideAdminItem>

                        <AsideAdminItem id="logout-container" className="mb-5 hidden md:block">
                            <Profile />

                            <ThemeToggle />
                            <Button variant={"ghost"} className="flex w-full gap-2 justify-start h-[48px] items-center hover:bg-zinc-800 hover:text-white">
                                <ArrowLeftToLine />
                                <span className="text-base">Sair</span>
                            </Button>
                        </AsideAdminItem>
                    </AsideItemBetween>
                </AsideAdminItem>

            </AsideAdminContainer>
        </AsideAdminComponent>
    );
}

export default AsideAdmin;