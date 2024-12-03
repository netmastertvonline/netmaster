"use client"

import { useRedirectProvider } from '@/app/hooks/useRedirectProvider'
import { Button } from '@/components/ui/button'
import React from 'react'

const NewRedirectButton = () => {
  const redirectModal = useRedirectProvider()
    return (
    <Button  onClick={() => redirectModal.onOpen()} variant={"default"}>Adicionar</Button>
  )
}

export default NewRedirectButton
