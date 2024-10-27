import React from 'react'
import { Metadata } from 'next'
import TitleH1Sales from '@/components/employees/sales/TitleH1Sales'

export const metadata: Metadata = {
    title: "Vendas - Perfil",
};

const SettingsSalesPage = () => {
    return (
        <div className='p-5 w-full h-full overflow-hidden'>
            <TitleH1Sales text='Configurações' className='mb-5' />
            
        </div>
    )
}

export default SettingsSalesPage
