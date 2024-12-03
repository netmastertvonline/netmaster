import { deleteMessage } from '@/app/employees/sales/services/messages/actions';
import { useMessageProvider } from '@/app/hooks/useMessageProvider';
import { Message } from '@/app/types/message';
import { Button } from '@/components/ui/button'
import { Copy, CopyCheck, SquarePen, Trash } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { withSwal } from 'react-sweetalert2';

interface ActionsProps {
  message: Message;
  swal: ReturnType<typeof withSwal>;
}

const Actions: React.FC<ActionsProps> = ({ message, swal }) => {
  const messageModal = useMessageProvider();
  const [isCopied, setIsCopied] = useState(false);

  const editMessage = (message: Message) => {
    messageModal.onOpen(message)
  }

  const alertMessage = async (message: Message) => {
    (swal as unknown as { fire: (options: { title: string; text: string; showCancelButton: boolean; confirmButtonText: string; confirmButtonColor: string; cancelButtonText: string; reverseButtons: boolean }) => Promise<{ isConfirmed: boolean }> }).fire({
      title: 'Você tem certeza?',
      text: `Quer excluir a mensagem "${message.title}"?`,
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      confirmButtonColor: "#b91c1c",
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then(async (result: { isConfirmed: boolean }) => {
      if (result.isConfirmed) {
        const res = await deleteMessage(message?.id)
        toast.success(res?.message)
        messageModal.onClose()
      }
    }).catch((error: unknown) => {
      console.log(error);
    });
  }

  const copyMessage = () => {
    navigator.clipboard.writeText(message.message);
    setIsCopied(true);
    toast.success('Mensagem copiada!');

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  }

  return (
    <div className='flex items-center gap-4'>
      <Button className='p-2' onClick={copyMessage} variant={"ghost"}>
        {isCopied ? <CopyCheck /> : <Copy />}
      </Button>
      <Button className='p-2' onClick={() => editMessage(message)} variant={"default"}>
        <SquarePen />
      </Button>
      <Button className='p-2' variant={"destructive"} onClick={() => alertMessage(message)}>
        <Trash />
      </Button>
    </div>
  )
}

export default withSwal((props: { message: Message; swal: ReturnType<typeof withSwal> }) => (
  <Actions message={props.message} swal={props.swal} />
));