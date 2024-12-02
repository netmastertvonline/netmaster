import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getSalesNumbers, getSuportNumbers } from './app/admin/whatsapp/actions';
import { WhatsApp } from '@prisma/client';

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/whatsapp/sales')) {
        const urls = await getSalesNumbers()
        const randomNumber: WhatsApp = urls[Math.floor(Math.random() * urls.length)]
        console.log(randomNumber);
        
        if (randomNumber) {
            return NextResponse.redirect(new URL(`https://wa.me/${randomNumber?.phone}?text=${randomNumber?.message}`, request.url))
        } else {
            return NextResponse.redirect(new URL('https://suportemil.com/', request.url))
        }
    }

    if (request.nextUrl.pathname.startsWith('/whatsapp/suport')) {
        const urls = await getSuportNumbers()
        const randomNumber: WhatsApp = urls[Math.floor(Math.random() * urls.length)]
        if (randomNumber) {
            return NextResponse.redirect(new URL(`https://wa.me/${randomNumber?.phone}?text=${randomNumber?.message}`, request.url))
        } else {
            return NextResponse.redirect(new URL('https://suportemil.com/', request.url))
        }
    }
}

export const config = {
    matcher: '/whatsapp/:path*',
}