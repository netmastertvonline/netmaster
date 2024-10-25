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
        contracting_plan: new Date().toISOString(),
        plan_value: '29.99',
        plan_type: "Pro",
        screens: [
            {
                screen_name: "Tela 1",
                user_number: "525198465",
                app_name: "IBO PLAYER",
                mac_address: "67:5E:4C:8E:6A:26:69:07",
                app_key: "154895",
            }
        ]
    },
    {
        id: '2',
        name: "joão silva",
        phone: "41912345678",
        contracting_plan: new Date().toISOString(),
        plan_value: '29.99',
        plan_type: "Padrão",
        screens: [
            {
                screen_name: "Tela 1",
                user_number: "525198465",
                app_name: "IBO PLAYER",
                mac_address: "67:5E:4C:8E:6A:26:69:07",
                app_key: "154895",
            }
        ]
    },
    {
        id: '3',
        name: "ana pereira",
        phone: "41987654321",
        contracting_plan: new Date().toISOString(),
        plan_value: '29.99',
        plan_type: "Premium",
        screens: [
            {
                screen_name: "Tela 1",
                user_number: "525198465",
                app_name: "IBO PLAYER",
                mac_address: "67:5E:4C:8E:6A:26:69:07",
                app_key: "154895",
            }
        ]
    },
    {
        id: '4',
        name: "pedro almeida",
        phone: "41923456789",
        contracting_plan: new Date().toISOString(),
        plan_value: '',
        plan_type: "Padrão",
        screens: [
            {
                screen_name: "Tela 1",
                user_number: "525198465",
                app_name: "IBO PLAYER",
                mac_address: "67:5E:4C:8E:6A:26:69:07",
                app_key: "154895",
            },
            {
                screen_name: "Tela 2",
                user_number: "525198465",
                app_name: "IBO PLAYER",
                mac_address: "67:5E:4C:8E:6A:26:69:07",
                app_key: "154895",
            }
        ]
    },
    {
        id: '5',
        name: "carla souza",
        phone: "41934567890",
        contracting_plan: new Date().toISOString(),
        plan_value: '29.99',
        plan_type: "Pro",
        screens: [
            {
                screen_name: "Tela 1",
                user_number: "525198465",
                app_name: "IBO PLAYER",
                mac_address: "67:5E:4C:8E:6A:26:69:07",
                app_key: "154895",
            }
        ]
    },
    {
        id: '6',
        name: "julia martins",
        phone: "41945678901",
        contracting_plan: new Date().toISOString(),
        plan_value: '',
        plan_type: "Pro",
        screens: [
            {
                screen_name: "Tela 1",
                user_number: "525198465",
                app_name: "IBO PLAYER",
                mac_address: "67:5E:4C:8E:6A:26:69:07",
                app_key: "154895",
            }
        ]
    },
    {
        id: '7',
        name: "lucas mendes",
        phone: "41956789012",
        contracting_plan: new Date().toISOString(),
        plan_value: '29.99',
        plan_type: "Premium",
        screens: [
            {
                screen_name: "Tela 1",
                user_number: "525198465",
                app_name: "IBO PLAYER",
                mac_address: "67:5E:4C:8E:6A:26:69:07",
                app_key: "154895",
            },
            {
                screen_name: "Tela 2",
                user_number: "525198465",
                app_name: "IBO PLAYER",
                mac_address: "67:5E:4C:8E:6A:26:69:07",
                app_key: "154895",
            }
        ]
    },
    {
        id: '8',
        name: "beatriz rodrigues",
        phone: "41967890123",
        contracting_plan: new Date().toISOString(),
        plan_value: '29.99',
        plan_type: "Pro",
        screens: [
            {
                screen_name: "Tela 1",
                user_number: "525198465",
                app_name: "IBO PLAYER",
                mac_address: "67:5E:4C:8E:6A:26:69:07",
                app_key: "154895",
            }
        ]
    },
    {
        id: '9',
        name: "felipe costa",
        phone: "41978901234",
        contracting_plan: new Date().toISOString(),
        plan_value: '29.99',
        plan_type: "Pro",
        screens: [
            {
                screen_name: "Tela 1",
                user_number: "525198465",
                app_name: "IBO PLAYER",
                mac_address: "67:5E:4C:8E:6A:26:69:07",
                app_key: "154895",
            }
        ]
    },
];

const ClientsSalesPage = () => {
    return (
        <div className='p-5 w-full h-full'>
            <TitleH1Sales text='Clientes' className='mb-5' />
            <div className='flex justify-between items-start gap-10 h-fit w-full'>
                <div className='w-[800px]'>
                    <SearchClientForm />
                </div>
                <Link href={'/employees/sales/clients/new-client'}>
                    <Button variant={"default"}>Novo cliente</Button>
                </Link>
            </div>

            <div className='mt-10'>
                <ClientsTable clients={clients} />
            </div>

        </div>
    )
}

export default ClientsSalesPage
