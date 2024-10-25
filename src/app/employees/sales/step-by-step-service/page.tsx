import { Metadata } from 'next'
import ContentPage from '@/components/employees/sales/step-by-step-service/ContentPage'

export const metadata: Metadata = {
    title: "Vendas - Atendimento",
};
  
const StepByStepServiceSalesPage = () => {
    
    return (
        <div className='h-full w-full p-5'>
            <ContentPage />
        </div>
    )
}

export default StepByStepServiceSalesPage
