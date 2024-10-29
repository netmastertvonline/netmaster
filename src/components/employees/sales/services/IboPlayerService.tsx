import { Button } from '@/components/ui/button'
import { ArrowUpToLine } from 'lucide-react'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const IboPlayerService = () => {
    const [currentStep, setCurrentStep] = useState(1)

    const handlePreviousStep = () => {
        if (currentStep <= 1) {
            setCurrentStep(1)
        }else{
            setCurrentStep(currentStep - 1)
        }
    }

    return (
        <div className=''>
            <div className='mb-5'>
                <h1 className='text-xl font-bold'>Atendimento para app <strong className='text-red-700'>IBO PLAYER</strong></h1>
            </div>
            <div className='flex justify-between h-[500px] w-[800px]'>
                
                <div>
                    {currentStep === 1 &&
                        <motion.div
                        initial={{ y: 200, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        >
                            <div className='flex flex-col'>
                                <h2 className='font-bold text-lg'>Envie para o cliente:</h2>
                                <span className='ml-6'>NOME, abre o app e onde aparece escrito MAC, tira uma foto e envia pra mim por gentileza</span><br /> 
                                
                                <h2 className='font-bold text-lg'>Em posse do mac e device key do app do cliente:</h2>
                                <span className='ml-6'>Vá para o site <Link className='text-blue-600' target='_blank' href={"https://iboplayer.com/login"}>IBO PLAYER</Link> e clique em Proximo passo</span><br /> 
                        
                                
                                <Button onClick={() => setCurrentStep(2)}>Proximo passo</Button>
                            </div>
                        </motion.div>
                    }

                    {currentStep === 2 &&
                        <motion.div
                        initial={{ y: 200, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            >
                            <div className='flex flex-col'>
                            <Button onClick={() => setCurrentStep(3)}>IR PARA PASSO 3</Button>
                            </div>
                        </motion.div>
                    }

                    {currentStep === 3 &&
                        <motion.div
                        initial={{ y: 200, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        >
                            <div className='flex flex-col'>
                            <Button onClick={() => setCurrentStep(4)}>IR PARA PASSO 4</Button>
                            </div>
                        </motion.div>
                    }

                </div>

                <div>
                    {currentStep > 1 &&
                        <Button onClick={() => handlePreviousStep()}><ArrowUpToLine /></Button>
                    }
                </div>
            </div>
        </div>
    )
}

export default IboPlayerService
