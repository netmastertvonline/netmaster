"use server"

import { prisma } from "@/app/services/database/db"
import { baseUrl } from "@/utils/base-url"
import { Redirect } from "@prisma/client"
import { revalidatePath } from "next/cache"

export async function createRedirect(values: Redirect) {    
    const res = await fetch(`${baseUrl}/redirects`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'API-Key': process.env.DATA_API_KEY!,
        },
        body: JSON.stringify(values)
    })
    if (res.ok) {
        revalidatePath('/admin/redirect')
        const redirect = await res.json()
        return redirect
    }
    return
}

export async function getAllRedirects() {
    const res = await fetch(`${baseUrl}/redirects`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'API-Key': process.env.DATA_API_KEY!,
        },
    })
    if (res.ok) {
        revalidatePath('/admin/redirect')
        const allRedirects = await res.json()
        return allRedirects
    }
    return
}

export async function findRedirect(query: string) {
    const res = await fetch(`${baseUrl}/redirects/results?search_query=${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'API-Key': process.env.DATA_API_KEY!,
        },
    })
    if (res.ok) {
        revalidatePath('/admin/redirect')
        const redirectsFinded = await res.json()
        return redirectsFinded
    }
    return
}

export async function getAllAciveRedirects() {
    const res = await fetch(`${baseUrl}/redirects/actives`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'API-Key': process.env.DATA_API_KEY!,
        },
    })
    if (res.ok) {
        const allRedirectsActives = await res.json()
        return allRedirectsActives
    }
    return
}


export async function deleteRedirect(id: string) {
    const res = await fetch(`${baseUrl}/redirects/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'API-Key': process.env.DATA_API_KEY!,
        },
    })
    if (res.ok) {
        revalidatePath('/admin/redirect')
        const deleted = await res.json()
        return deleted
    }
    return
}

export async function editRedirect(id: string, values: Redirect) {
    const { redirect_to, redirect_link, original_link, custom_link } = values

    const updatedWhatsApp = await prisma.redirect.update({
        where: {
            id
        },
        data:{
            redirect_to, 
            redirect_link, 
            original_link, 
            custom_link,
        }
    })
    revalidatePath('/admin/redirect')
    return { updatedWhatsApp, status: 200, message: "Link atualizado com sucesso" }
}

export async function toggleStatusRedirect(id: string) {
    const currentStatus = await prisma.redirect.findUnique({
        where: { id: id },
        select: { status: true }
    });
    await prisma.redirect.update({
        where: { id: id },
        data: { status: !currentStatus?.status }
    });
    revalidatePath('/admin/redirect')
    return { status: 200, message: "Link atualizado com sucesso" }
}
