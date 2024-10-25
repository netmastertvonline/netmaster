import React from "react";
import { AsideSalesComponent, AsideSalesContainer, AsideSalesItem, AsideItemBetween } from "./components";
import GroupAdminLink from "./group-admin-link";
import Logo from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";

const AsideSales = () => {
    return (
        <AsideSalesComponent id="aside-component">
            <AsideSalesContainer id="aside-container">
                
                <AsideSalesItem id="aside-logo-container" className="text-primary w-fit mb-8 cursor-pointer">
                    <Logo path="/employees/sales/dashboard"/> 
                </AsideSalesItem>

                <AsideSalesItem id="menu" className="h-full">
                    <AsideItemBetween className="flex-col h-full">
                        <AsideSalesItem id="menu-container" className="no-scroll overflow-x-auto md:overflow-x-hidden">
                            <GroupAdminLink />
                        </AsideSalesItem>
                        
                        <AsideSalesItem id="logout-container" className="mb-5 hidden md:block">
                            <ThemeToggle />
                            LogOutButton
                        </AsideSalesItem>
                    </AsideItemBetween>
                </AsideSalesItem>

            </AsideSalesContainer>
        </AsideSalesComponent>
    );
}

export default AsideSales;