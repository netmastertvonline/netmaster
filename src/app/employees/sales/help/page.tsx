import React from 'react'
import { Metadata } from 'next'
import TitleH1Sales from '@/components/employees/sales/TitleH1Sales'
import Faq from '@/components/employees/sales/help/Faq';

export const metadata: Metadata = {
    title: "Vendas - Ajuda",
};

const HelpSalesPage = () => {
    return (
        <div className='p-5 w-full h-full overflow-y-auto'>
            <TitleH1Sales text='Ajuda' className='mb-5' />
            <div className='w-full flex flex-col items-center'>
                <div className='w-[1000px] mb-20'>
                    <Faq />
                </div>
            </div>
        </div>
    )
}

export default HelpSalesPage
