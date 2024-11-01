import React, { useState } from 'react'
import { withSwal } from 'react-sweetalert2';
import { deleteWhatsApp, toggleStatusWhatsApp } from '@/app/admin/whatsapp/actions';
import { useWhatsAppProvider } from '@/app/hooks/useWhatsAppProvider';
import { Button } from '@/components/ui/button'
import { WhatsApp } from '@prisma/client';
import { CirclePower, SquarePen, Trash } from 'lucide-react'
import toast from 'react-hot-toast';

interface ActionsProps {
  whatsApp: WhatsApp;
  swal: ReturnType<typeof withSwal>;
}

const Actions: React.FC<ActionsProps> = ({ whatsApp, swal }) => {
  const whatsAppModal = useWhatsAppProvider();
  const [isToggleWhatsApp, setIsToggleWhatsApp] = useState(false)

  const toggleWhatsApp = async (id: string) => {
    setIsToggleWhatsApp(true)
    try {
      const res = await toggleStatusWhatsApp(id)
      if (res.ok) {
        toast.success(res?.message)
      }
    } catch (error) {
      toast.error("Ocorreu um erro inesperado")
      console.log(error);
    }
    setIsToggleWhatsApp(false)
  }
  const editWhatsApp = (whatsApp: WhatsApp) => {
    whatsAppModal.onOpen(whatsApp)
  }

  const alertMessage = async (message: WhatsApp) => {
    (swal as unknown as { fire: (options: { title: string; text: string; showCancelButton: boolean; confirmButtonText: string; confirmButtonColor: string; cancelButtonText: string; reverseButtons: boolean }) => Promise<{ isConfirmed: boolean }> }).fire({
      title: 'Você tem certeza?',
      text: `Quer excluir o numero "${message.phone}"?`,
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      confirmButtonColor: "#b91c1c",
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then(async (result: { isConfirmed: boolean }) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteWhatsApp(whatsApp?.id)
          toast.success(res?.message)
        } catch (error) {
          toast.error("Ocorreu um erro inesperado")
          console.log(error);
        }
      }
    }).catch((error: unknown) => {
      console.log(error);
    });
  }

  return (
    <div className='flex items-center gap-4'>
      <Button disabled={isToggleWhatsApp} title={whatsApp.status ? "Desativar": "Ativar"} className='p-2' onClick={() => toggleWhatsApp(whatsApp?.id)} variant={"outline"}>
        <CirclePower />
      </Button>
      <Button title='Editar' className='p-2' onClick={() => editWhatsApp(whatsApp)} variant={"default"}>
        <SquarePen />
      </Button>
      <Button title='Excluir' className='p-2' variant={"destructive"} onClick={() => alertMessage(whatsApp)}>
        <Trash />
      </Button>
    </div>
  )
}

export default withSwal((props: { whatsApp: WhatsApp; swal: ReturnType<typeof withSwal> }) => (
  <Actions whatsApp={props.whatsApp} swal={props.swal} />
));