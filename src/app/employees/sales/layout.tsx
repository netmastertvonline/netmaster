import React, { PropsWithChildren } from 'react'
import AsideSales from './_components/aside'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Vendas",
  openGraph: {
    title: "Vendas",
  },
  twitter: {
    title: "Vendas",
  },
};

const SalesAdminlayout = ({ children }: PropsWithChildren ) => {
  return (
    <div className='flex flex-col md:flex-row h-screen w-screen thini-scroll overflow-hidden'>
      <AsideSales />
      <main className='w-full h-full overflow-y-auto'>
          {children}
      </main>
    </div>
  )
}

export default SalesAdminlayout
