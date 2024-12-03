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
import { Redirect } from '@prisma/client'
import { baseUrlFront } from '@/utils/base-url'
import Actions from './Actions'

interface RedirectTableProps {
    redirects: Redirect[];
}

const RedirectTable = ({ redirects }: RedirectTableProps) => {

    return (
        <div className=''>
            <div className='border'>
                <Table >
                    <TableHeader>
                        <TableRow className='text-left'>
                            <TableHead className='w-[300px]'>Redirecionar para</TableHead>
                            <TableHead className='text-center w-[300px]'>Link de redirecionamento</TableHead>
                            <TableHead className='text-center'>Link Original</TableHead>
                            <TableHead className='text-center'>Link Customizado</TableHead>
                            <TableHead className='text-center'>Status</TableHead>
                            <TableHead className="text-center w-[100px]'">Editar</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {redirects?.length > 0 && redirects.map(redirect => (
                            <TableRow key={redirect.id}>
                                <TableCell className="font-bold">{redirect?.redirect_to}</TableCell>
                                <TableCell className='text-center'>
                                    {redirect?.redirect_link}
                                </TableCell>
                                <TableCell className='text-center w-[300px]'>{
                                    redirect.status ? <Link target='_blank' href={`${baseUrlFront}/redirect/random`}>{`${baseUrlFront}/redirect/random`}</Link> : ""}
                                </TableCell>
                                <TableCell className="text-center w-[300px]">
                                    {redirect.status ? <Link target='_blank' href={`${redirect.custom_link}`}>{redirect?.custom_link}</Link> : "" }
                                </TableCell>                                
                                
                                <TableCell className='text-center'>{redirect.status ? <Badge className='bg-green-400' >Ativo</Badge> : <Badge className='bg-red-600' >Inativo</Badge>}</TableCell>
                                
                                <TableCell className='flex justify-center items-center'>
                                    <Actions redirect={redirect} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default RedirectTable
