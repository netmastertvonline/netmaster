"use server"

import { baseUrl } from "@/utils/base-url"
import { revalidatePath } from "next/cache"

export async function createMessage(values: { message: string; title: string }){
    const res = await fetch(`${baseUrl}/employees/sales/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'API-Key': process.env.DATA_API_KEY!,
        },
        body: JSON.stringify(values)
    })
    console.log("RES", res);
    
    revalidatePath('/employees/sales/services/messages')  

    const message = await res.json()   
    return message
}

export async function updateMessage(id: string, values: { message: string; title: string; }){
    
    const res = await fetch(`${baseUrl}/employees/sales/messages/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'API-Key': process.env.DATA_API_KEY!,
        },
        body: JSON.stringify(values)
    })

    revalidatePath('/employees/sales/services/messages')
    
    const message = await res.json()   
    return message
}

export async function deleteMessage(id: string){
    
    const res = await fetch(`${baseUrl}/employees/sales/messages/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'API-Key': process.env.DATA_API_KEY!,
        },
    })
    if (res.ok) {
        revalidatePath('/employees/sales/services/messages')
        const message = await res.json()      
        return message
    }
    return
}

export async function getAllMessages(){
    const res = await fetch(`${baseUrl}/employees/sales/messages`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'API-Key': process.env.DATA_API_KEY!,
        },
    })
    if (res.ok) {
        const messages = await res.json()   
        return messages 
    }
    return
}