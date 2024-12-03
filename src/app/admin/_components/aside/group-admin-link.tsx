"use client"

import { checkPathname } from "@/lib/check-pathname";
import { AsideAdminLink, AsideItemCol,  } from "./components";
import { AtSign, ContactRound, FlaskConical, LayoutDashboard, MessageCircle, TrendingUpDown } from "lucide-react"
import { usePathname } from "next/navigation";

const GroupSalesLink = () => {
    const pathname = usePathname()
  
    return (
    <AsideItemCol>
      <AsideAdminLink active={pathname === "/admin/dashboard"} path="/admin/dashboard" icon={<LayoutDashboard  />} >Dashboard</AsideAdminLink>
      <AsideAdminLink active={checkPathname(pathname, "/admin/clients")} path="/admin/clients" icon={<ContactRound /> }>Clientes</AsideAdminLink>
      <AsideAdminLink active={checkPathname(pathname, "/admin/tests")} path="/admin/tests" icon={<FlaskConical /> }>Testes</AsideAdminLink>
      <AsideAdminLink active={checkPathname(pathname, "/admin/email")} path="/admin/email" icon={<AtSign /> }>Emails</AsideAdminLink>
      <AsideAdminLink active={checkPathname(pathname, "/admin/whatsapp")} path="/admin/whatsapp" icon={<MessageCircle /> }>WhatsApp</AsideAdminLink>
      <AsideAdminLink active={checkPathname(pathname, "/admin/redirect")} path="/admin/redirect" icon={<TrendingUpDown /> }>Redirect</AsideAdminLink>
    </AsideItemCol>  
  );
};

export default GroupSalesLink;