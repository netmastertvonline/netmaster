import { Metadata } from 'next'
import TitleH1Sales from '@/components/employees/sales/TitleH1Sales';
import Back from '@/components/Back';
import MessageCard from '@/components/employees/sales/services/messages/MessageCard';
import { Message } from '@/app/types/message';
import { getAllMessages, searchMessages } from './actions';
import { Search } from '@/components/Search';
import CreateMessageButton from '@/components/employees/sales/services/messages/CreateMessageButton';
import { SearchParamsProps } from '@/interfaces/searchparams';

export const metadata: Metadata = {
    title: "Vendas - Mensagens",
};

const MessagesServiceSalesPage = async ({ searchParams }: Readonly<SearchParamsProps>) => {
    let messages: Message[] | [];
    const query = searchParams?.query ?? ""
    if (query) {
        messages = await searchMessages(query);
    } else {
        messages = await getAllMessages()
    }


    return (
        <div className='p-5 w-full h-full'>
            <div className='w-full '>
                <Back />
                <TitleH1Sales text='Mensagens' className='mb-5 text-center' />
                <div className='grid grid-cols-2 gap-10 mb-5'>
                    <div className='flex gap-4'>
                        <Search placeholder='pix' />
                        <CreateMessageButton />
                    </div>
                </div>
                <div className='w-full h-full'>
                    {messages && (
                        <MessageCard messages={messages} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default MessagesServiceSalesPage
