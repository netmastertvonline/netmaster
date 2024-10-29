"use client"

import React, { useEffect, useState } from 'react'
import { Message } from '@/app/types/message'
import SearchMessageForm from './SearchMessagesForm';
import CreateMessageButton from './CreateMessageButton';
import Actions from './Actions';

interface MessageCardProps {
    messages: Message[];
}

const MessageCard = ({ messages }: MessageCardProps) => {
    const [message, setMessage] = useState(messages[0])
    const [activeMessage, setActiveMessage] = useState(messages[0]?.id)

    const returnItem = (message: Message) => {
        setActiveMessage(message.id)
        setMessage(message)
    }

    useEffect(() => {
        setMessage(messages[0])
        setActiveMessage(messages[0]?.id)
    }, [messages])

    return (
        <div className=''>
            <div className='grid grid-cols-2 gap-10'>
                <div className='flex flex-col gap-2 sha'>
                    <div className='flex gap-2'>
                        <SearchMessageForm />
                        <CreateMessageButton />
                    </div>

                    {messages.length > 0 && messages?.map(message => (
                        <div key={message?.id} className={`cursor-pointer border shadow-md rounded-md p-5 gap-2 ${activeMessage === message.id && "bg-red-100 border border-red-700"} `} onClick={() => returnItem(message)}>
                            {message.title}
                        </div>
                    ))}
                </div>
                {message &&
                    <div>
                        <div className='border rounded-md gap-2'>
                            <div className='flex p-5 shadow-lg justify-between'>
                                <div><h2>{message?.title}</h2></div>
                                <div className='flex gap-2'>
                                    <Actions message={message} />
                                </div>
                            </div>
                            <div className='border-t p-5'>
                                {message?.message}
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default MessageCard
