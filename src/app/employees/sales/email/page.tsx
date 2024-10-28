import React from 'react'
import { Metadata } from 'next'
import TitleH1Sales from '@/components/employees/sales/TitleH1Sales'
import SearchClientForm from '@/components/employees/SearchClientForm';
import { Button } from '@/components/ui/button';
import ClientsTable from '@/components/employees/sales/clients/ClientsTable';
import Link from 'next/link';
import { User } from '@/app/types/user';

export const metadata: Metadata = {
    title: "Vendas - Email",
};

const clients: User | [] = [];

const EmailSalesPage = () => {
    return (
        <div className='p-5 w-full h-full overflow-hidden'>
            <TitleH1Sales text='Emails' className='mb-5' />
            <div className='flex justify-between items-start gap-10 h-fit w-full'>
                <div className='w-[800px]'>
                    <SearchClientForm />
                </div>
                <Link href={'/employees/sales/email/send-mail'}>
                    <Button variant={"default"}>Novo email</Button>
                </Link>
            </div>

            <div className='mt-10 pb-20'>
                <ClientsTable clients={clients} />
            </div>
        </div>
    )
}

export default EmailSalesPage
