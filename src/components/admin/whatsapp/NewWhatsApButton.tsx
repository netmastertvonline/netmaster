"use client"

import { useWhatsAppProvider } from '@/app/hooks/useWhatsAppProvider'
import { Button } from '@/components/ui/button'
import React from 'react'

const NewWhatsApButton = () => {
  const whatsApp = useWhatsAppProvider()
    return (
    <Button  onClick={() => whatsApp.onOpen()} variant={"default"}>Adicionar</Button>
  )
}

export default NewWhatsApButton
