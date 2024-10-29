import { Metadata } from 'next'
import TitleH1Sales from '@/components/employees/sales/TitleH1Sales';
import Back from '@/components/Back';
import MessageCard from '@/components/employees/sales/services/messages/MessageCard';
import { Message } from '@/app/types/message';
import { getAllMessages } from './actions';

export const metadata: Metadata = {
    title: "Vendas - Mensagens",
};

const MessagesServiceSalesPage = async () => {
    const messages: Message[] | [] = await getAllMessages()

    return (
        <div className='p-5 w-full h-full overflow-hidden'>
            <Back />

            <div className='w-full flex flex-col items-center h-full'>
                <TitleH1Sales text='Mensagens ' className='mb-5' />
                <div className='w-full'>
                    {messages && (
                        <MessageCard messages={messages} />
                    )}
                </div>
            </div>
        </div>

    )
}

export default MessagesServiceSalesPage
