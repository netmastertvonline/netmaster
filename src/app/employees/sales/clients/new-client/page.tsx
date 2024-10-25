import Back from '@/components/Back'
import ClientForm from '@/components/employees/sales/clients/ClientForm'
import TitleH1Sales from '@/components/employees/sales/TitleH1Sales';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Vendas - Novo cliente",
};

const NewClientSalesPage = ({ }) => {
    return (
        <div className='p-5 w-full h-full'>
            <Back />

            <div className='w-full flex flex-col items-center'>
                <TitleH1Sales text='Cadastrar novo cliente' className='mb-5'  />
                <div className='w-[800px] mb-20'>
                    <ClientForm />
                </div>
            </div>
        </div>
    )
}

export default NewClientSalesPage
