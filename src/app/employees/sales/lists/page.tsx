import React from 'react'
import { Metadata } from 'next'
import TitleH1Sales from '@/components/employees/sales/TitleH1Sales'
import ListsDefaultTable from '@/components/employees/sales/lists/ListsDefaultTable';
import ListsPremiumTable from '@/components/employees/sales/lists/ListsPremiumTable';

export const metadata: Metadata = {
    title: "Vendas - Listas",
};

const ListsSalesPage = () => {
    return (
        <div className='p-5 w-full h-full overflow-y-auto'>
            <TitleH1Sales text='Listas' className='mb-5' />
            <div className='w-full flex flex-col items-center'>
                <div className='w-[1000px] flex flex-col gap-5 mb-20'>
                    <ListsDefaultTable />
                    <ListsPremiumTable />
                </div>
            </div>
        </div>
    )
}

export default ListsSalesPage
