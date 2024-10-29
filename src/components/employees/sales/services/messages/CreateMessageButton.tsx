"use client"

import { useMessageProvider } from '@/app/hooks/useMessageProvider';
import { Button } from '@/components/ui/button';
import React from 'react'

const CreateMessageButton = () => {
    const messageModal = useMessageProvider();  

  return (
    <Button onClick={() => messageModal.onOpen()}>Adicionar</Button>
  )
}

export default CreateMessageButton
