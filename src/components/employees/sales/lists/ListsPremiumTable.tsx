import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'

const ListsPremiumTable = () => {
    return (
        <Table className='border'>
            <TableHeader>
                <TableRow className='text-left'>
                    <TableHead className="font-bold text-black">PREMIUM</TableHead>
                    <TableHead className='border text-center'>Series</TableHead>
                    <TableHead className='border text-center'>Filmes</TableHead>
                    <TableHead className='border text-center w-[150px]'>Canais</TableHead>
                    <TableHead className='text-center'>Total</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow >
                    <TableCell className="text-sm">Live - TNM4</TableCell>
                    <TableCell className='border text-center'>3527</TableCell>
                    <TableCell className='border text-center'>12333</TableCell>
                    <TableCell className='border text-center'>1967</TableCell>
                    <TableCell className='text-center'>{3527 + 12333 + 1967}</TableCell>
                </TableRow>
                <TableRow >
                    <TableCell className="text-sm">Elite - TNMP1</TableCell>
                    <TableCell className='border text-center'>1924</TableCell>
                    <TableCell className='border text-center'>7725</TableCell>
                    <TableCell className='border text-center'>3117</TableCell>
                    <TableCell className='text-center'>{1924 + 7725 + 3117}</TableCell>
                </TableRow>
                <TableRow >
                    <TableCell className="text-sm">Bit - TNMP2</TableCell>
                    <TableCell className='border text-center'>2547</TableCell>
                    <TableCell className='border text-center'>8794</TableCell>
                    <TableCell className='border text-center'>2851</TableCell>
                    <TableCell className='text-center'>{2547 + 8794 + 2851}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

export default ListsPremiumTable
