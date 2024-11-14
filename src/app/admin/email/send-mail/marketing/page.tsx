
import EmailMarketingForm from '@/components/admin/emails/EmailMarketing';
import Back from '@/components/Back';
import TitleH1Sales from '@/components/employees/sales/TitleH1Sales';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Email marketing - Admin ",
};

const SendMailAdminPAge = () => {
  return (
    <div className='p-5 w-full h-full'>
      <Back />

      <div className='w-full flex flex-col items-center'>
        <TitleH1Sales text='Email marketing' className='mb-5' />

        <div className='w-[1000px] mb-20'>
          <EmailMarketingForm />
        </div>
      </div>
    </div>
  )
}

export default SendMailAdminPAge
