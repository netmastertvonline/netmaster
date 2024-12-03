"use client";

import React from 'react'
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import RedirectForm from '@/components/admin/redirect/RedirectForm';
import { useRedirectProvider } from '../hooks/useRedirectProvider';

const RedirectModalProvider = () => {
  const redirect = useRedirectProvider();  

  if (!redirect.isOpen) return null;

  return (
    <div className="absolute flex px-4 justify-center items-center h-full w-full z-[1] backdrop-blur-sm">
      <div className="relative border dark:border-white bg-white p-6 w-[600px] rounded-lg shadow-lg">
        <Button
          onClick={() => {
            redirect.onClose()
          }}
          className="absolute top-2 right-2 dark:text-background dark:hover:text-accent-foreground"
          variant="ghost"
        >
          <X className='dark:text-white'/>
        </Button>
        <>
          <RedirectForm redirect={redirect?.data || undefined } />
        </>
      </div>
    </div>
  )
}

export default RedirectModalProvider
