import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'

const ListsDefaultTable = () => {
    return (
        <Table className='border'>
            <TableHeader>
                <TableRow className='text-left'>
                    <TableHead className="font-bold text-black">PADRÃO</TableHead>
                    <TableHead className='border text-center w-fit'>Series</TableHead>
                    <TableHead className='border text-center'>Filmes</TableHead>
                    <TableHead className='border text-center'>Canais</TableHead>
                    <TableHead className='text-center'>Total</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow >
                    <TableCell className="text-sm">Club - TNM1</TableCell>
                    <TableCell className='border text-center'>5256</TableCell>
                    <TableCell className='border text-center'>20670</TableCell>
                    <TableCell className='border text-center'>2523</TableCell>
                    <TableCell className='text-center'>{5256 + 20670 + 2523}</TableCell>
                </TableRow>
                <TableRow >
                    <TableCell className="text-sm">P2 Cini - TNM2</TableCell>
                    <TableCell className='border text-center'>3605</TableCell>
                    <TableCell className='border text-center'>17866</TableCell>
                    <TableCell className='border text-center'>2090</TableCell>
                    <TableCell className='text-center'>{3605 + 17866 + 2090}</TableCell>
                </TableRow>
                <TableRow >
                    <TableCell className="text-sm">Uniplay - TNM3</TableCell>
                    <TableCell className='border text-center'>3468</TableCell>
                    <TableCell className='border text-center'>11344</TableCell>
                    <TableCell className='border text-center'>2845</TableCell>
                    <TableCell className='text-center'>{3468 + 11344 + 2845}</TableCell>
                </TableRow>
                <TableRow >
                    <TableCell className="text-sm">Tvs - TNM5</TableCell>
                    <TableCell className='border text-center'>3468</TableCell>
                    <TableCell className='border text-center'>11344</TableCell>
                    <TableCell className='border text-center'>2838</TableCell>
                    <TableCell className='text-center'>{3468 + 11344 + 2838}</TableCell>
                </TableRow>
                <TableRow >
                    <TableCell className="text-sm">Datec - TNM6</TableCell>
                    <TableCell className='border text-center'></TableCell>
                    <TableCell className='border text-center'></TableCell>
                    <TableCell className='border text-center'></TableCell>
                    <TableCell className='text-center'></TableCell>
                </TableRow>
                <TableRow >
                    <TableCell className="text-sm">Playtec - TNM7</TableCell>
                    <TableCell className='border text-center'>6085</TableCell>
                    <TableCell className='border text-center'>9882</TableCell>
                    <TableCell className='border text-center'>937</TableCell>
                    <TableCell className='text-center'>{6085 + 9882 + 937}</TableCell>
                </TableRow>
                <TableRow >
                    <TableCell className="text-sm">Linx - TNM9</TableCell>
                    <TableCell className='border text-center'></TableCell>
                    <TableCell className='border text-center'></TableCell>
                    <TableCell className='border text-center'></TableCell>
                    <TableCell className='text-center'></TableCell>
                </TableRow>
                <TableRow >
                    <TableCell className="text-sm">Gf - TNM9</TableCell>
                    <TableCell className='border text-center'></TableCell>
                    <TableCell className='border text-center'></TableCell>
                    <TableCell className='border text-center'></TableCell>
                    <TableCell className='text-center'></TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

export default ListsDefaultTable
