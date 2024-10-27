import { Metadata } from 'next'
import ContentPage from '@/components/employees/sales/step-by-step-service/ContentPage'
import TitleH1Sales from '@/components/employees/sales/TitleH1Sales';

export const metadata: Metadata = {
    title: "Vendas - Atendimento",
};
  
const StepByStepServiceSalesPage = () => {
    
    return (
        <div className='h-full w-full p-5 overflow-hidden'>
            <TitleH1Sales text='Atendimento' className='mb-5' />
            <ContentPage />
        </div>
    )
}

export default StepByStepServiceSalesPage
