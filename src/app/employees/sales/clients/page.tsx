import { User } from '@/app/types/user'
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

const clients: User | [] = [];

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
