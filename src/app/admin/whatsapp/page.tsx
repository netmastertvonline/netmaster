import React from 'react'
import { Metadata } from 'next'
import { getAllWatsApps } from './actions'
import TitleH1Sales from '@/components/employees/sales/TitleH1Sales'
import NewWhatsApButton from '@/components/admin/whatsapp/NewWhatsApButton'
import SearchWhatsAppForm from '@/components/admin/whatsapp/SearchWhatsAppForm'
import WhatsAppTable from '@/components/admin/whatsapp/WhatsAppTable'

export const metadata: Metadata = {
    title: "WhatsApp - Admin",
};

const WhatsAppAdminPage = async () => {
    const watsApps = await getAllWatsApps()
    return (
        <div className='p-5 w-full h-full'>
            <TitleH1Sales text='WhatsApp' className='mb-5' />
            <div className='flex justify-between items-start gap-10 h-fit w-full'>
                <div className='w-[800px]'>
                    <SearchWhatsAppForm />
                </div>
                <NewWhatsApButton />
            </div>
            <div className='mt-10 pb-20'>
                <WhatsAppTable watsApps={watsApps} />
            </div>
        </div>
    )
}

export default WhatsAppAdminPage
