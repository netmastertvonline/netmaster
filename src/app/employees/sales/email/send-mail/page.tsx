import MessageTestMailForm from '@/components/employees/sales/email/MessageTestMailForm'
import TitleH1Sales from '@/components/employees/sales/TitleH1Sales'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Vendas - Novo email",
};

const SendMailSalesPAge = () => {
  return (
    <div className='p-5 w-full h-full overflow-hidden'>
      <TitleH1Sales text='Novo email' className='mb-5' />
      <div className='mt-10 pb-20'>
        <MessageTestMailForm />
      </div>
    </div>
  )
}

export default SendMailSalesPAge
