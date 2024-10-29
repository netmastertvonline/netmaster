"use client";

import React from 'react'
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useMessageProvider } from '../hooks/useMessageProvider';
import MessageForm from '@/components/employees/sales/services/messages/MessageForm';

const MessageModalProvider = () => {
  const messageModal = useMessageProvider();  

  if (!messageModal.isOpen) return null;

  return (
    <div className="absolute flex px-4 justify-center items-center h-full w-full z-[1] backdrop-blur-sm">
      <div className="relative border dark:border-white bg-white p-6 w-[600px] rounded-lg shadow-lg">
        <Button
          onClick={() => {
            messageModal.onClose()
          }}
          className="absolute top-2 right-2 dark:text-background dark:hover:text-accent-foreground"
          variant="ghost"
        >
          <X className='dark:text-white'/>
        </Button>
        <>
          <MessageForm message={messageModal.message} />
        </>
      </div>
    </div>
  )
}

export default MessageModalProvider
