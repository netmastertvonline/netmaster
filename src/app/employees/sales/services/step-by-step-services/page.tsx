import { Metadata } from 'next'
import ContentPage from '@/components/employees/sales/services/ContentPage'
import TitleH1Sales from '@/components/employees/sales/TitleH1Sales';
import Back from '@/components/Back';

export const metadata: Metadata = {
    title: "Vendas - Passo a Passo",
};

const StepByStepServiceSalesPage = () => {

    return (
        <div className='p-5 w-full h-full'>
            <Back />

            <div className='w-full flex flex-col items-center'>
                <TitleH1Sales text='Passo a Passo ' className='mb-5' />

                <div className='w-[1000px] mb-20 overflow-hidden'>
                    <ContentPage />
                </div>
            </div>
        </div>

    )
}

export default StepByStepServiceSalesPage
