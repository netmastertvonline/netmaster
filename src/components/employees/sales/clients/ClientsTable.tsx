"use client"

import React, { useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { SquarePen } from 'lucide-react'
import Link from 'next/link'
import Paginate from '@/components/Paginate'
import { Button } from '@/components/ui/button'
import formatName from '@/lib/formatName'
import { Badge } from "@/components/ui/badge"
import { Screen, Subscription, User } from '@prisma/client'
import normalizeDate from '@/lib/normalizeDate'


interface ClientsTableProps {
    clients: (User & { subscription: (Subscription & { screens: Screen[] })[] })[];
}

const ClientsTable = ({ clients }: ClientsTableProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentItem = clients.slice(firstIndex, lastIndex);

    return (
        <div className=''>
            <div className='border'>
                <Table >
                    <TableHeader>
                        <TableRow className='text-left'>
                            <TableHead className="">Nome</TableHead>
                            <TableHead className='text-center'>Telefone</TableHead>
                            <TableHead className='text-center'>Plano</TableHead>
                            <TableHead className='text-center w-[150px]'>Telas</TableHead>
                            <TableHead className='text-center'>Status</TableHead>
                            <TableHead className='text-center'>Data de criação</TableHead>
                            <TableHead className='text-center'>Data de vencimento</TableHead>
                            <TableHead className="text-center w-[100px]'">Editar</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentItem.map(client => (
                            <TableRow key={client?.id}>
                                <TableCell className="font-bold text-sm">{formatName(client.name)}</TableCell>
                                <TableCell className='text-center'>{client.phone}</TableCell>
                                <TableCell className='text-center'>{client?.subscription ? client?.subscription[0]?.plan_type : null}</TableCell>
                                <TableCell className='text-center'>{client?.subscription ? client?.subscription[0]?.screens.length : "0"}</TableCell>
                                <TableCell className='text-center'>{client?.subscription ? <Badge variant={"outline"} className='bg-green-400' >Pago</Badge> : <Badge variant={"outline"} className='bg-red-600 text-white'>Em aberto</Badge>}</TableCell>
                                <TableCell className='text-center'>{client?.subscription ? normalizeDate(client?.subscription[0]?.contracting_plan || "") : null}</TableCell>
                                <TableCell className='text-center'>{client?.subscription ? normalizeDate(client?.subscription[0]?.expiration_plan || "") : null}</TableCell>
                                <TableCell className='text-center'>
                                    <Button className='px-2' variant={"ghost"}>
                                        <Link href={`/employees/sales/clients/edit/${client.id}`}>
                                            <SquarePen />
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {clients.length > 5 && (
                <div className='flex mt-10 items-center justify-center'>
                    <Paginate itemsToPaginate={clients} itemsPerPage={itemsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} firstIndex={firstIndex} />
                </div>
            )}
        </div>

    )
}

export default ClientsTable
