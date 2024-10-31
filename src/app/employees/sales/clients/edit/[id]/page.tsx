import Back from '@/components/Back'
import ClientForm from '@/components/employees/sales/clients/ClientForm'
import TitleH1Sales from '@/components/employees/sales/TitleH1Sales';
import { Metadata } from 'next';
import React from 'react'
import { getUserById } from '../../actions';

export const metadata: Metadata = {
    title: "Vendas - Editar cliente",
};

const EditClientSalesPage = async ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const client = await getUserById(id)
    
    return (
        <div className='p-5 w-full h-full'>
            <Back />

            <div className='w-full flex flex-col items-center'>
                <TitleH1Sales text='Editar cliente' className='mb-5'  />
                <div className='w-[1000px] mb-20'>
                    <ClientForm client={client} />
                </div>
            </div>
        </div>
    )
}

export default EditClientSalesPage
