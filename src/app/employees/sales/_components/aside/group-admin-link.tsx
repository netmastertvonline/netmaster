"use client"

import { checkPathname } from "@/lib/check-pathname";
import { AsideItemCol, AsideSalesLink } from "./components";
import { AtSign, ContactRound, FlaskConical, HandHelping, LayoutDashboard, List, Tv } from "lucide-react"
import { usePathname } from "next/navigation";

const GroupSalesLink = () => {
    const pathname = usePathname()
  
    return (
    <AsideItemCol>
      <AsideSalesLink active={pathname === "/employees/sales/dashboard"} path="/employees/sales/dashboard" icon={<LayoutDashboard  />} >Dashboard</AsideSalesLink>
      <AsideSalesLink active={checkPathname(pathname, "/employees/sales/clients")} path="/employees/sales/clients" icon={<ContactRound /> }>Clientes</AsideSalesLink>
      <AsideSalesLink active={checkPathname(pathname, "/employees/sales/tests")} path="/employees/sales/tests" icon={<FlaskConical /> }>Testes</AsideSalesLink>
      <AsideSalesLink active={checkPathname(pathname, "/employees/sales/services")} path="/employees/sales/services" icon={<List /> }>Atendimento</AsideSalesLink>
      <AsideSalesLink active={checkPathname(pathname, "/employees/sales/lists")} path="/employees/sales/lists" icon={<Tv /> }>Listas</AsideSalesLink>
      <AsideSalesLink active={checkPathname(pathname, "/employees/sales/help")} path="/employees/sales/help" icon={<HandHelping /> }>Ajuda</AsideSalesLink>
      <AsideSalesLink active={checkPathname(pathname, "/employees/sales/email")} path="/employees/sales/email" icon={<AtSign /> }>Email</AsideSalesLink>
    </AsideItemCol>  
  );
};

export default GroupSalesLink;