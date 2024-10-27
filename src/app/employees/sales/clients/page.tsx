import ClientsTable from '@/components/employees/sales/clients/ClientsTable'
import TitleH1Sales from '@/components/employees/sales/TitleH1Sales'
import SearchClientForm from '@/components/employees/SearchClientForm'
import { Button } from '@/components/ui/button'
import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = {
    title: "Vendas - Clientes",
};

const clients = [
    {
        id: '1',
        name: "maria do carmo",
        phone: "41984519264",
        plan_value: '29.99',
        plan_type: "Padrão",
        periodicity: "Mensal",
        contracting_plan: new Date(new Date().getFullYear(), 11, 1),
        expiration_plan: new Date(new Date().getFullYear(), 12, 1),
        screens: [
            {
                system_type: "IPTV",
                screen_name: "Tela 1",
                painel: "Live 21 - TNM4",
                user_number: "525198465",
                app_name: "IBO PLAYER",
                mac_address: "67:5E:4C:8E:6A:26:69:07",
                app_key: "154895"
            }
        ],
        notes: ""
    }
];

const ClientsSalesPage = () => {
    return (
        <div className='p-5 w-full h-full overflow-hidden'>
            <TitleH1Sales text='Clientes' className='mb-5' />
            <div className='flex justify-between items-start gap-10 h-fit w-full'>
                <div className='w-[800px]'>
                    <SearchClientForm />
                </div>
                <Link href={'/employees/sales/clients/new-client'}>
                    <Button variant={"default"}>Novo cliente</Button>
                </Link>
            </div>

            <div className='mt-10 pb-20'>
                <ClientsTable clients={clients} />
            </div>
        </div>
    )
}

export default ClientsSalesPage
