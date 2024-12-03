import React from 'react'
import { Metadata } from 'next'
import { findRedirect, getAllRedirects } from './actions'
import TitleH1Sales from '@/components/employees/sales/TitleH1Sales'
import { Redirect } from '@prisma/client'
import { SearchParamsProps } from '@/interfaces/searchparams'
import { Search } from '@/components/Search'
import RedirectTable from '@/components/admin/redirect/RedirectTable'
import NewRedirectButton from '@/components/admin/redirect/NewRedirectButton'

export const metadata: Metadata = {
    title: "Redirect - Admin",
};

const RedirectAdminPage = async ({ searchParams }: Readonly<SearchParamsProps>) => {
    let redirects: Redirect[]

    const query = searchParams?.query ?? ""
    if (query) {
        redirects = await findRedirect(query);
    } else {
        redirects = await getAllRedirects()
    }

    return (
        <div className='p-5 w-full h-full'>
            <TitleH1Sales text='Redirect' className='mb-5' />
            <div className='grid grid-cols-2 gap-10 mb-5'>
                <div className='flex gap-4'>
                    <Search placeholder='suporte' />
                    <NewRedirectButton />
                </div>
            </div>

            <div className='mt-10 pb-20'>
                <RedirectTable redirects={redirects} />
            </div>
        </div>
    )
}

export default RedirectAdminPage
