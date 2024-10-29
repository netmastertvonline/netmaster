"use client"

import React from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import IboPlayerService from '@/components/employees/sales/services/IboPlayerService'
import IboPlayerProService from '@/components/employees/sales/services/IboPlayerProService '
import Image from 'next/image'

const ContentPage = () => {

    const [currentStep, setCurrentStep] = useState(0)
    const [selectedService, setSelectedService] = useState<React.ReactNode>(null);

    const handleChoice = (step: number) => {
        setCurrentStep(step)

        switch (step) {
            case 1:
                setSelectedService(<IboPlayerService />);
                break;
            case 2:
                setSelectedService(<IboPlayerProService />);
                break;
            case 3:
                setSelectedService(null);
                break;
            case 4:
                setSelectedService(null);
                break;
            default:
                setSelectedService(null);
                break;
        }
    }

    return (
        <div className='h-full flex justify-between'>
            <div className='grow flex items-center justify-center'>
                {currentStep === 0 &&
                    <motion.div
                        initial={{ y: 200, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className='flex flex-col gap-2 mb-10 max-w-[800px]'>
                            <div >
                                <h2 className='font-bold text-lg'>PASSO 1:</h2>
                                <span className='ml-6'>Bom dia, Boa tarde, Boa noite, NOME</span>
                            </div>
                            <div>
                                <h2 className='font-bold text-lg'>PASSO 2:</h2>
                                <span className='ml-6'>qual dispositivo gostaria de instalar o app ?</span><br />
                                <span className='ml-6'>*Celular*, Iphone ou Android?</span><br />
                                <span className='ml-6'>*TvBox* *??*</span><br />
                                <span className='ml-6'>*Tv*, qual marca ? possui Play Store?</span>
                            </div>
                            <div>
                                <h2 className='font-bold text-lg'>PASSO 3:</h2>
                                <span className='ml-6'>Qual app tem instalado, NOME</span>
                            </div>
                            <div>
                                <h2 className='font-bold text-lg'>PASSO 4:</h2>
                            </div>
                            <div className='flex gap-5 flex-wrap'>
                                <div title='BAYTV' onClick={() => handleChoice(1)} className='cursor-pointer relative aspect-square w-24 ' >
                                    <Image src={"https://netmastertvonline.com/wp-content/uploads/2024/02/22.png"} objectFit='cover' fill alt='SSIPTV' />
                                </div>
                                <div title='CLOUDDY' onClick={() => handleChoice(1)} className='cursor-pointer relative aspect-square w-24 ' >
                                    <Image src={"https://netmastertvonline.com/wp-content/webp-express/webp-images/uploads/2024/02/18.png.webp"} objectFit='cover' fill alt='SSIPTV' />
                                </div>
                                <div title='DUPLEXPLAY' onClick={() => handleChoice(1)} className='cursor-pointer relative aspect-square w-24 ' >
                                    <Image src={"https://netmastertvonline.com/wp-content/uploads/2024/02/6.png"} objectFit='cover' fill alt='SSIPTV' />
                                </div>
                                <div title='FLIX' onClick={() => handleChoice(1)} className='cursor-pointer relative aspect-square w-24 ' >
                                    <Image src={"https://netmastertvonline.com/wp-content/uploads/2024/02/3.png"} objectFit='cover' fill alt='SSIPTV' />
                                </div>
                                <div title='IBO PLAYER' onClick={() => handleChoice(1)} className='cursor-pointer relative aspect-square w-24 ' >
                                    <Image src={"https://netmastertvonline.com/wp-content/uploads/2024/02/10.png"} objectFit='cover' fill alt='SSIPTV' />
                                </div>
                                <div title='IBO PLAYER PRO' onClick={() => handleChoice(1)} className='cursor-pointer relative aspect-square w-24 ' >
                                    <Image src={"https://netmastertvonline.com/wp-content/uploads/2024/02/2.png"} objectFit='cover' fill alt='SSIPTV' />
                                </div>
                                <div title='REDPLAY' onClick={() => handleChoice(1)} className='cursor-pointer relative aspect-square w-24 ' >
                                    <Image src={"https://netmastertvonline.com/wp-content/uploads/2024/09/apps-150x150-1.png"} objectFit='cover' fill alt='SSIPTV' />
                                </div>
                                <div title='SMARTONE' onClick={() => handleChoice(1)} className='cursor-pointer relative aspect-square w-24 ' >
                                    <Image src={"https://netmastertvonline.com/wp-content/uploads/2024/02/5.png"} objectFit='cover' fill alt='SSIPTV' />
                                </div>
                                <div title='SMART IPTV' onClick={() => handleChoice(1)} className='cursor-pointer relative aspect-square w-24 ' >
                                    <Image src={"https://netmastertvonline.com/wp-content/webp-express/webp-images/uploads/2024/02/1.png.webp"} objectFit='cover' fill alt='SSIPTV' />
                                </div>
                                <div title='SMARTERS PLAYER' onClick={() => handleChoice(1)} className='cursor-pointer relative aspect-square w-24 ' >
                                    <Image src={"https://netmastertvonline.com/wp-content/uploads/2024/02/19.png"} objectFit='cover' fill alt='SSIPTV' />
                                </div>
                                <div title='SMARTONE' onClick={() => handleChoice(1)} className='cursor-pointer relative aspect-square w-24 ' >
                                    <Image src={"https://netmastertvonline.com/wp-content/uploads/2024/02/4.png"} objectFit='cover' fill alt='SSIPTV' />
                                </div>
                                <div title='SMART STB' onClick={() => handleChoice(1)} className='cursor-pointer relative aspect-square w-24 ' >
                                    <Image src={"https://netmastertvonline.com/wp-content/uploads/2024/02/8.png"} objectFit='cover' fill alt='SSIPTV' />
                                </div>
                                <div title='SMART TV CLUB' onClick={() => handleChoice(1)} className='cursor-pointer relative aspect-square w-24 ' >
                                    <Image src={"https://netmastertvonline.com/wp-content/uploads/2024/02/7.png"} objectFit='cover' fill alt='SSIPTV' />
                                </div>
                                <div title='SSIPTV' onClick={() => handleChoice(1)} className='cursor-pointer relative aspect-square w-24 ' >
                                    <Image src={"https://netmastertvonline.com/wp-content/uploads/2024/02/20.png"} objectFit='cover' fill alt='SSIPTV' />
                                </div>
                                <div title='UNITV' onClick={() => handleChoice(1)} className='cursor-pointer relative aspect-square w-24 ' >
                                    <Image src={"https://netmastertvonline.com/wp-content/uploads/2024/02/14.png"} objectFit='cover' fill alt='SSIPTV' />
                                </div>
                                <div title='XCIPTV' onClick={() => handleChoice(1)} className='cursor-pointer relative aspect-square w-24 ' >
                                    <Image src={"https://netmastertvonline.com/wp-content/uploads/2024/02/21.png"} objectFit='cover' fill alt='SSIPTV' />
                                </div>
                                <div title='' onClick={() => handleChoice(1)} className='cursor-pointer relative aspect-square w-24 ' >
                                    <Image src={"https://netmastertvonline.com/wp-content/uploads/2024/02/11.png"} objectFit='cover' fill alt='SSIPTV' />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                }

                {currentStep === 1 &&
                    <motion.div
                        initial={{ y: 200, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className='flex'>
                            {selectedService}
                        </div>
                    </motion.div>
                }

            </div>
            <Button onClick={() => setCurrentStep(0)}>INICIO</Button>
        </div>
    )
}

export default ContentPage
