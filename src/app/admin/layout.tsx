import React, { PropsWithChildren } from 'react'
import { Metadata } from 'next';
import AsideAdmin from './_components/aside';
import WhatsAppModalProvider from '../providers/WhatsAppProvider';
import RedirectModalProvider from '../providers/RedirectProvider';

export const metadata: Metadata = {
  title: "Admin",
  openGraph: {
    title: "Admin",
  },
  twitter: {
    title: "Admin",
  },
};

const SalesAdminlayout = ({ children }: PropsWithChildren ) => {
  return (
    <div className='flex flex-col md:flex-row h-screen w-screen thini-scroll overflow-hidden'>
      <RedirectModalProvider />
      <WhatsAppModalProvider />
      <AsideAdmin />
      <main className='w-full h-full overflow-y-auto'>
          {children}
      </main>
    </div>
  )
}

export default SalesAdminlayout
