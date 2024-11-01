"use server"

import { prisma } from "@/app/services/database/db"
import { baseUrl } from "@/utils/base-url"
import { WhatsApp } from "@prisma/client"
import { revalidatePath } from "next/cache"

export async function createWhatsApp(values: WhatsApp) {
    const res = await fetch(`${baseUrl}/whatsapp`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'API-Key': process.env.DATA_API_KEY!,
        },
        body: JSON.stringify(values)
    })
    if (res.ok) {
        revalidatePath('/admin/whatsapp')
        const whatsApp = await res.json()
        return whatsApp
    }
    return
}

export async function getAllWatsApps() {
    const res = await fetch(`${baseUrl}/whatsapp`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'API-Key': process.env.DATA_API_KEY!,
        },
    })
    if (res.ok) {
        revalidatePath('/admin/whatsapp')
        const allWhatsApp = await res.json()
        return allWhatsApp
    }
    return
}

export async function getSalesNumbers() {
    const res = await fetch(`${baseUrl}/whatsapp/sales`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'API-Key': process.env.DATA_API_KEY!,
        },
    })
    if (res.ok) {
        const allWhatsApp = await res.json()
        return allWhatsApp
    }
    return
}

export async function getSuportNumbers() {
    const res = await fetch(`${baseUrl}/whatsapp/suport`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'API-Key': process.env.DATA_API_KEY!,
        },
    })
    if (res.ok) {
        const allWhatsApp = await res.json()
        return allWhatsApp
    }
    return
}

export async function deleteWhatsApp(id: string) {
    const res = await fetch(`${baseUrl}/whatsapp/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'API-Key': process.env.DATA_API_KEY!,
        },
    })
    if (res.ok) {
        revalidatePath('/admin/whatsapp')
        const deleted = await res.json()
        return deleted
    }
    return
}

export async function editWhatsApp(id: string, values: WhatsApp) {
    const { phone, phone_type, custom_link, notes } = values

    const updatedWhatsApp = await prisma.whatsApp.update({
        where: {
            id
        },
        data:{
            phone, 
            phone_type, 
            custom_link, 
            notes
        }
    })
    revalidatePath('/admin/whatsapp')
    return { updatedWhatsApp, status: 200, message: "Telefone atualizado com sucesso" }
}

export async function toggleStatusWhatsApp(id: string) {
    const currentStatus = await prisma.whatsApp.findUnique({
        where: { id: id },
        select: { status: true }
    });
    await prisma.whatsApp.update({
        where: { id: id },
        data: { status: !currentStatus?.status }
    });
    revalidatePath('/admin/whatsapp')
    return { status: 200, message: "Telefone atualizado com sucesso" }
}
