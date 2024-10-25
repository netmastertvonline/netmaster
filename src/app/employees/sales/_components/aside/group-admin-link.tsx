"use client"

import { checkPathname } from "@/lib/check-pathname";
import { AsideItemCol, AsideSalesLink } from "./components";
import { ContactRound, FlaskConical, HandHelping, LayoutDashboard, List, Settings, UserRoundPen } from "lucide-react"
import { usePathname } from "next/navigation";

const GroupSalesLink = () => {
    const pathname = usePathname()
  
    return (
    <AsideItemCol>
      <AsideSalesLink active={pathname === "/employees/sales/dashboard"} path="/employees/sales/dashboard" icon={<LayoutDashboard  />} >Dashboard</AsideSalesLink>
      <AsideSalesLink active={checkPathname(pathname, "/employees/sales/tests")} path="/employees/sales/tests" icon={<FlaskConical /> }>Testes</AsideSalesLink>
      <AsideSalesLink active={checkPathname(pathname, "/employees/sales/step-by-step-service")} path="/employees/sales/step-by-step-service" icon={<List /> }>Atendimento</AsideSalesLink>
      <AsideSalesLink active={checkPathname(pathname, "/employees/sales/clients")} path="/employees/sales/clients" icon={<ContactRound /> }>Clientes</AsideSalesLink>
      <AsideSalesLink active={checkPathname(pathname, "/employees/sales/profile")} path="/employees/sales/profile" icon={<UserRoundPen /> }>Perfil</AsideSalesLink>
      <AsideSalesLink active={checkPathname(pathname, "/employees/sales/help")} path="/employees/sales/help" icon={<HandHelping /> }>Ajuda</AsideSalesLink>
      <AsideSalesLink active={checkPathname(pathname, "/employees/sales/settings")} path="/employees/sales/settings" icon={<Settings />} >Configurações</AsideSalesLink>
    </AsideItemCol>  
  );
};

export default GroupSalesLink;