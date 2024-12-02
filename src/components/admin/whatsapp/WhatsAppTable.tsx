"use client"

import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Link from 'next/link'
import { Badge } from "@/components/ui/badge"
import { WhatsApp } from '@prisma/client'
import { baseUrlFront } from '@/utils/base-url'
import Actions from './Actions'

interface WhatsAppTableProps {
    watsApps: WhatsApp[];
}

const WhatsAppTable = ({ watsApps }: WhatsAppTableProps) => {

    return (
        <div className=''>
            <div className='border'>
                <Table >
                    <TableHeader>
                        <TableRow className='text-left'>
                            <TableHead className="">Numero</TableHead>
                            <TableHead className='text-center'>Operador</TableHead>
                            <TableHead className='text-center'>Tipo</TableHead>
                            <TableHead className='text-center'>Link Original</TableHead>
                            <TableHead className='text-center'>Link Customizado</TableHead>
                            <TableHead className='text-center'>Status</TableHead>
                            <TableHead className="text-center w-[100px]'">Editar</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {watsApps?.length > 0 && watsApps.map(whatsApp => (
                            <TableRow key={whatsApp.id}>
                                <TableCell className="font-bold text-sm">{whatsApp?.phone}</TableCell>
                                <TableCell className="text-center">{whatsApp?.operator}</TableCell>
                                <TableCell className='text-center'>
                                    {whatsApp?.phone_type === "suport" && "Suporte"}
                                    {whatsApp?.phone_type === "sales" && "Vendas"}
                                </TableCell>
                                <TableCell className='text-center w-[300px]'>{
                                    whatsApp.status ?
                                        <>
                                            {whatsApp?.phone_type === "sales" && <Link target='_blank' href={`${baseUrlFront}/whatsapp/sales`}>{`${baseUrlFront}/whatsapp/sales`}</Link>}
                                            {whatsApp?.phone_type === "suport" && <Link target='_blank' href={`${baseUrlFront}/whatsapp/suport`}>{`${baseUrlFront}/whatsapp/suport`}</Link>}
                                        </>
                                        : ""
                                }
                                </TableCell>
                                <TableCell className="text-center w-[300px]">
                                    {whatsApp.status ?
                                        <>
                                            {whatsApp?.phone_type === "sales" && <Link target='_blank' href={`${whatsApp.custom_link}`}>{whatsApp?.custom_link}</Link>}
                                            {whatsApp?.phone_type === "suport" && <Link target='_blank' href={`${whatsApp.custom_link}`}>{whatsApp?.custom_link}</Link>}
                                        </>
                                        : ""
                                    }
                                </TableCell>
                                <TableCell className='text-center'>{whatsApp.status ? <Badge className='bg-green-400' >Ativo</Badge> : <Badge className='bg-red-600' >Inativo</Badge>}</TableCell>
                                <TableCell className='flex justify-center items-center'>
                                    <Actions whatsApp={whatsApp} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default WhatsAppTable
