import { Metadata } from 'next'
import TitleH1Sales from '@/components/employees/sales/TitleH1Sales';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Vendas - Atendimento",
};
  
const ServiceSalesPage = () => {
    
    return (
        <div className='h-full w-full p-5 overflow-hidden'>
            <TitleH1Sales text='Atendimento' className='mb-5' />
            <>
                <Link href={"/employees/sales/services/messages"}>
                    <Button>Mensagens</Button>
                </Link>
                
                <Link href={"/employees/sales/services/step-by-step-services"}>
                    <Button>Passo a passo</Button>
                </Link>
            </>
        </div>
    )
}

export default ServiceSalesPage
