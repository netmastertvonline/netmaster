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
import formatDate from '@/lib/formatDate'
import { Badge } from "@/components/ui/badge"
import formatNextMonth from '@/lib/format-next-month'
import { User } from '@/app/types/user'


interface ClientsTableProps {
    clients: User[];
}

const ClientsTable = ({ clients }: ClientsTableProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
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
                                <TableCell className='text-center'>{client.plan_type}</TableCell>
                                <TableCell className='text-center'>{client.screens.length}</TableCell>
                                <TableCell className='text-center'>{client.plan_value ? <Badge variant={"outline"} className='bg-green-400' >Pago</Badge> : <Badge variant={"outline"} className='bg-red-600 text-white'>Em aberto</Badge>}</TableCell>
                                <TableCell className='text-center'>{formatDate(client.contracting_plan)}</TableCell>
                                <TableCell className='text-center'>{formatNextMonth(client.contracting_plan)}</TableCell>
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
            {clients.length > 10 && (
                <div className='flex mt-10 items-center justify-center'>
                    <Paginate itemsToPaginate={clients} itemsPerPage={itemsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} firstIndex={firstIndex} />
                </div>
            )}
        </div>

    )
}

export default ClientsTable
