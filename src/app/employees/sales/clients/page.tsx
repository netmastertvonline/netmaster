import ClientsTable from '@/components/employees/sales/clients/ClientsTable'
import TitleH1Sales from '@/components/employees/sales/TitleH1Sales'
import { Button } from '@/components/ui/button'
import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import { getAllUsers, searchUser } from './actions'
import { Screen, Subscription, User } from '@prisma/client'
import { Search } from '@/components/Search'

export const metadata: Metadata = {
    title: "Vendas - Clientes",
};

interface SearchParamsProps {
    searchParams?: {
        query?: string;
    } 
}

const ClientsSalesPage = async ({ searchParams } : Readonly<SearchParamsProps>) => {
    let clients;
    const query = searchParams?.query ?? ""
    if (query) {
        clients = await searchUser(query);
    }else{
        clients = await getAllUsers();
    }
    
    return (
        <div className='p-5 w-full h-full'>
            <TitleH1Sales text='Clientes' className='mb-5' />
            <div className='flex justify-between items-start gap-10 w-full '>
                <div className='w-[800px]'>
                    <Search />
                </div>
                <Link href={'/employees/sales/clients/new-client'}>
                    <Button variant={"default"}>Novo cliente</Button>
                </Link>
            </div>
            <div className='mt-10 pb-20'>
                <ClientsTable clients={clients as (User & { subscription: (Subscription & { screens: Screen[] })[] })[]} />
            </div>
        </div>
    )
}

export default ClientsSalesPage
