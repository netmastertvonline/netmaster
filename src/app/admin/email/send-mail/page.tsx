import Back from '@/components/Back';
import TitleH1Sales from '@/components/employees/sales/TitleH1Sales'
import { FlaskConical, Send } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react'

export const metadata: Metadata = {
  title: "Novo email - Admin ",
};

const SendMailAdminPAge = () => {
  return (
    <div className='p-5 w-full h-full'>
      <Back />

      <div className='w-full flex flex-col items-center'>
        <TitleH1Sales text='Emails' className='mb-5' />

        <div className='w-[1000px] mb-20'>
          <div className='flex gap-5'>

            <Link href={`/admin/email/send-mail/tests`} className='flex border p-5 rounded-md shadow-lg gap-3 w-[180px] h-[140px] flex-col items-center justify-center'>
                <FlaskConical />
                <h2>Enviar teste</h2>
            </Link>
            <Link href={`/admin/email/send-mail/marketing`} className='flex border p-5 rounded-md shadow-lg gap-3 w-[180px] h-[140px] flex-col items-center justify-center'>
                <Send />
                <h2>Email marketing</h2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SendMailAdminPAge
