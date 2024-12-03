import React, { useState } from 'react'
import { withSwal } from 'react-sweetalert2';
import { Button } from '@/components/ui/button'
import { Redirect } from '@prisma/client';
import { CirclePower, SquarePen, Trash } from 'lucide-react'
import toast from 'react-hot-toast';
import { useRedirectProvider } from '@/app/hooks/useRedirectProvider';
import { deleteRedirect, toggleStatusRedirect } from '@/app/admin/redirect/actions';

interface ActionsProps {
  redirect: Redirect;
  swal: ReturnType<typeof withSwal>;
}

const Actions: React.FC<ActionsProps> = ({ redirect, swal }) => {
  const redirectModal = useRedirectProvider();
  const [isToggleRedirect, setIsToggleRedirect] = useState(false)

  const toggleRedirect = async (id: string) => {
    setIsToggleRedirect(true)
    try {
      const res = await toggleStatusRedirect(id)
      if (res.status === 200) {
        toast.success(res?.message)
      }
    } catch (error) {
      toast.error("Ocorreu um erro inesperado")
      console.log(error);
    }
    setIsToggleRedirect(false)
  }
  const editWhatsApp = (redirect: Redirect) => {
    redirectModal.onOpen(redirect)
  }

  const alertMessage = async (message: Redirect) => {
    (swal as unknown as { fire: (options: { title: string; text: string; showCancelButton: boolean; confirmButtonText: string; confirmButtonColor: string; cancelButtonText: string; reverseButtons: boolean }) => Promise<{ isConfirmed: boolean }> }).fire({
      title: 'Você tem certeza?',
      text: `Quer excluir o numero "${message.redirect_to}"?`,
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      confirmButtonColor: "#b91c1c",
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then(async (result: { isConfirmed: boolean }) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteRedirect(redirect?.id)
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
      <Button disabled={isToggleRedirect} title={redirect.status ? "Desativar": "Ativar"} className='p-2' onClick={() => toggleRedirect(redirect?.id)} variant={"outline"}>
        <CirclePower />
      </Button>
      <Button title='Editar' className='p-2' onClick={() => editWhatsApp(redirect)} variant={"default"}>
        <SquarePen />
      </Button>
      <Button title='Excluir' className='p-2' variant={"destructive"} onClick={() => alertMessage(redirect)}>
        <Trash />
      </Button>
    </div>
  )
}

export default withSwal((props: { redirect: Redirect; swal: ReturnType<typeof withSwal> }) => (
  <Actions redirect={props.redirect} swal={props.swal} />
));