import React from 'react'
import { Metadata } from 'next'
import { getAllWatsApps, getWatsApp } from './actions'
import TitleH1Sales from '@/components/employees/sales/TitleH1Sales'
import NewWhatsApButton from '@/components/admin/whatsapp/NewWhatsApButton'
import WhatsAppTable from '@/components/admin/whatsapp/WhatsAppTable'
import { WhatsApp } from '@prisma/client'
import { SearchParamsProps } from '@/interfaces/searchparams'
import { Search } from '@/components/Search'

export const metadata: Metadata = {
    title: "WhatsApp - Admin",
};

const WhatsAppAdminPage = async ({ searchParams }: Readonly<SearchParamsProps>) => {
    let watsApps: WhatsApp[]

    const query = searchParams?.query ?? ""
    if (query) {
        watsApps = await getWatsApp(query);
    } else {
        watsApps = await getAllWatsApps()
    }

    return (
        <div className='p-5 w-full h-full'>
            <TitleH1Sales text='WhatsApp' className='mb-5' />
            <div className='grid grid-cols-2 gap-10 mb-5'>
                <div className='flex gap-4'>
                    <Search placeholder='8467' />
                    <NewWhatsApButton />
                </div>
            </div>

            <div className='mt-10 pb-20'>
                <WhatsAppTable watsApps={watsApps} />
            </div>
        </div>
    )
}

export default WhatsAppAdminPage
