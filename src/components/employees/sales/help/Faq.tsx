import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { TableHead, TableCell, TableBody, TableRow, Table } from '@/components/ui/table'
import { Check } from 'lucide-react'

const Faq = () => {
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger className='font-bold text-base'>Teste de 7 dias?</AccordionTrigger>
                <AccordionContent>
                    <Table>
                        <TableHead className='grid grid-cols-1'>
                            <TableCell className='font-bold text-primary text-lg'>Apps</TableCell>
                        </TableHead>
                        <TableBody>
                            <TableRow className='grid grid-cols-1'>
                                <TableCell className='flex items-center gap-2'>Red Play <Check className='text-green-400' /></TableCell>
                            </TableRow>
                            <TableRow className='grid grid-cols-1'>
                                <TableCell className='flex items-center gap-2'>Tv Express <Check className='text-green-400' /></TableCell>
                            </TableRow>
                            <TableRow className='grid grid-cols-1'>
                                <TableCell className='flex items-center gap-2'>Tvs P2P<Check className='text-green-400' /></TableCell>
                            </TableRow>
                            <TableRow className='grid grid-cols-1'>
                                <TableCell className='flex items-center gap-2'>Tvs - TNM5 <Check className='text-green-400' /></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger className='font-bold text-base'>Quais listas funcionam fora do Brasil?</AccordionTrigger>
                <AccordionContent>
                    <Table>
                        <TableHead className='grid grid-cols-2'>
                            <TableCell className='font-bold text-primary text-lg'>Padrão</TableCell>
                            <TableCell className='font-bold text-primary text-lg'>Premium</TableCell>
                        </TableHead>
                        <TableBody>
                            <TableRow className='grid grid-cols-2'>
                                <TableCell className='flex items-center gap-2'>Tvs - TNM5<Check className='text-green-400' /></TableCell>
                                <TableCell className='flex items-center gap-2'>Live - TNM4<Check className='text-green-400' /></TableCell>
                            </TableRow>
                            <TableRow className='grid grid-cols-2'>
                                <TableCell className='flex items-center gap-2'>Seven - TNMI1<Check className='text-green-400' /></TableCell>
                                <TableCell className='flex items-center gap-2'>Elite - TNMP1<Check className='text-green-400' /></TableCell>
                            </TableRow>
                            <TableRow className='grid grid-cols-2'>
                                <TableCell className='flex items-center gap-2'>Mega - TNMI2<Check className='text-green-400' /></TableCell>
                                <TableCell className='flex items-center gap-2'>Bit - TNMP2<Check className='text-green-400' /></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger className='font-bold text-base'>Quais as forma de pagamento?</AccordionTrigger>
                <AccordionContent>
                    <Table>
                        <TableHead className='grid grid-cols-2'>
                            <TableCell className='font-bold text-primary text-lg'>Forma de pagamento</TableCell>
                            <TableCell className='font-bold text-primary text-lg'>Mensagem</TableCell>
                        </TableHead>
                        <TableBody>
                            <TableRow className='grid grid-cols-2'>
                                <TableCell className='flex items-center gap-2'>Pix<Check className='text-green-400' /></TableCell>
                                <TableCell className=''>
                                    <div>Após efetuar o pagamento é só enviar o comprovante aqui  😃</div>
                                    <div> DADOS PARA PAGAMENTO PIX Celular ou CNPJ</div>
                                    <div>🏦 BANCO Mercado Pago</div>
                                    <div>🔘 NOME : Infocus NetMaster</div>
                                    <div>🔰 CNPJ: 56928820000100</div>
                                    <div>📱 41991828568</div>
                                    <div>ou</div>
                                    <div>📱 41987911651</div>
                                </TableCell>
                            </TableRow>
                            <TableRow className='grid grid-cols-2'>
                                <TableCell className='flex items-center gap-2'>Mercado pago<Check className='text-green-400' /></TableCell>
                                <TableCell className='leading-loose'>
                                    <div>No mercado pago tem um acréscimo de 5%</div>
                                    <div>Informa o valor para o cliente e envia o link abaixo <br /> <b>Ex: 29,99 + 5% = 31.48(aredonda para cima = R$32,00)</b></div>
                                    <div>https://link.mercadopago.com.br/tvnetmaster</div>
                                </TableCell>
                            </TableRow>
                            <TableRow className='grid grid-cols-2'>
                                <TableCell className='flex items-center gap-2'>Paypal<Check className='text-green-400' /></TableCell>
                                <TableCell className='leading-loose'>
                                    <div>No paypal tem um acréscimo de 7%</div>
                                    <div>Informa o valor para o cliente e envia o email abaixo <br /> <b>Ex: 29,99 + 7% = 32.08(aredonda para cima = R$33,00)</b></div>
                                    <div>jonatan.cgil13@gmail.com</div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
                <AccordionTrigger className='font-bold text-base'>Como instalar apps P2P?</AccordionTrigger>
                <AccordionContent>
                    <Table>
                        <TableHead className='grid grid-cols-2'>
                            <TableCell className='font-bold text-primary text-lg'>Apps</TableCell>
                            <TableCell className='font-bold text-primary text-lg'>Mensagem</TableCell>
                        </TableHead>
                        <TableBody>
                            <TableRow className='grid grid-cols-2'>
                                <TableCell className='flex items-center gap-2'>Uniplay<Check className='text-green-400' /></TableCell>
                                <TableCell className=''>
                                    <div><b>UNIPLAY</b> via app Downloader</div>
                                    <div>1º Abra a <b>PLAY STORE</b></div>
                                    <div>2º Pesquise pelo app <b>Downloader by AFTVnews</b>, baixe-o e instale-o</div>
                                    <div>Tutorial:</div>
                                    <div>https://netmastertvonline.com/como-usar-downloader-para-assistir-iptv/</div>
                                    <div>3º Abra o app, no campo de busca digite o código <b>835375</b> e clique em pesquisar</div>
                                    <div><b>ou</b></div>
                                    <div>digite o link https://8844.ws/x7rdgd6h e clique em pesquisar</div>
                                    <div>4º permita as instalações</div>
                                    <div>5ª Clique em Install e em seguida abra o app</div><br />
                                    <div>ou</div>
                                    <div>abra um app de pesquisa e busque por https://8844.ws/x7rdgd6h</div>
                                </TableCell>
                            </TableRow>
                            <TableRow className='grid grid-cols-2'>
                                <TableCell className='flex items-center gap-2'>Tvs<Check className='text-green-400' /></TableCell>
                                <TableCell className='leading-loose'>
                                    <div><b>NEWSTVS</b> via app Downloader</div>
                                    <div>1º Abra a <b>PLAY STORE</b></div>
                                    <div>2º Pesquise pelo app <b>Downloader by AFTVnews</b>, baixe-o e instale-o</div>
                                    <div>Tutorial:</div>
                                    <div>https://netmastertvonline.com/como-usar-downloader-para-assistir-iptv/</div>
                                    <div>3º Abra o app, no campo de busca digite o código <b>723424</b> e clique em pesquisar</div>
                                    <div><b>ou</b></div>
                                    <div>digite o link https://8844.ws/e1291b4k e clique em pesquisar</div>
                                    <div>4º permita as instalações</div>
                                    <div>5ª Clique em Install e em seguida abra o app</div><br />
                                    <div>ou</div>
                                    <div>abra um app de pesquisa e busque por https://8844.ws/e1291b4k</div>
                                </TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>

                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

export default Faq
