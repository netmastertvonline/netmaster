"use client";

import React from 'react'
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useWhatsAppProvider } from '../hooks/useWhatsAppProvider';
import WhatsApptForm from '@/components/admin/whatsapp/WhatsAppForm';

const WhatsAppModalProvider = () => {
  const whatsApp = useWhatsAppProvider();  

  if (!whatsApp.isOpen) return null;

  return (
    <div className="absolute flex px-4 justify-center items-center h-full w-full z-[1] backdrop-blur-sm">
      <div className="relative border dark:border-white bg-white p-6 w-[600px] rounded-lg shadow-lg">
        <Button
          onClick={() => {
            whatsApp.onClose()
          }}
          className="absolute top-2 right-2 dark:text-background dark:hover:text-accent-foreground"
          variant="ghost"
        >
          <X className='dark:text-white'/>
        </Button>
        <>
          <WhatsApptForm whatsApp={whatsApp?.data || undefined } />
        </>
      </div>
    </div>
  )
}

export default WhatsAppModalProvider
