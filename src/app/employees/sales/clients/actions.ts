"use server"

import { baseUrl } from "@/utils/base-url"
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createUser(values: User){
    const res = await fetch(`${baseUrl}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'API-Key': process.env.DATA_API_KEY!,
        },
        body: JSON.stringify(values)
    })
    if (res.ok) {
        revalidatePath('/employees/sales/clients')
        const message = await res.json()   
        return message
    }
    return
}

export async function getAllUsers(){
    const res = await fetch(`${baseUrl}/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'API-Key': process.env.DATA_API_KEY!,
        },
    })
    if (res.ok) {
        const message = await res.json()   
        return message
    }
    return
}

export async function getUserById(id: string){
    const res = await fetch(`${baseUrl}/users/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'API-Key': process.env.DATA_API_KEY!,
        },
    })
    if (res.ok) {
        const message = await res.json()   
        if (message?.user) {
            return message?.user
        }
        return
    }
    return
}
