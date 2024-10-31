"use server"

import { baseUrl } from "@/utils/base-url"
import { revalidatePath } from "next/cache"
import { prisma } from "@/app/services/database/db"

export async function createMessage(values: { message: string; title: string }){
    const res = await fetch(`${baseUrl}/employees/sales/services/messages`, {
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
    const { title, message } = values
    try {
        const messageUpdated = await prisma.message.update({
            where:{
                id
            },
            data:{
                title,
                message
            }
        })
            
        revalidatePath('/employees/sales/services/messages')  

        return { messageUpdated, status: 200, message: "Mensagem atualizada com sucesso" }
    } catch (error) {
        console.log("Error creating user:", error);
    }
}

export async function deleteMessage(id: string){
    
    const res = await fetch(`${baseUrl}/employees/sales/services/messages/${id}`, {
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
    const res = await fetch(`${baseUrl}/employees/sales/services/messages`, {
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