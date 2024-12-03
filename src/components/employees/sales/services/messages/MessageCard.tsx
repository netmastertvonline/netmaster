"use client"

import React, { useEffect, useState } from 'react'
import { Message } from '@/app/types/message'
import Actions from './Actions';
import { Textarea } from '@/components/ui/textarea';

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
        <div className='h-full'>
            <div className='grid grid-cols-2 gap-10 h-full'>
                <div className='max-h-[550px] flex flex-col gap-2 overflow-y-auto'>
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
                            <div className='border-t p-4'>
                                <Textarea
                                    rows={19}
                                    className="focus-visible:ring-0 dark:border-primary resize-none"
                                    value={message?.message}
                                />
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default MessageCard
