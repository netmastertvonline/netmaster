"use client";

import React from 'react'
import { useMyTestProvider } from '../hooks/useMyTestProvider';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

const MyTestModalProvider = () => {
  const myTestModal = useMyTestProvider();
  const myTest = myTestModal?.myTest
  const myName = myTestModal?.name
  const success = myTestModal?.success
  const workers = myTestModal?.workers
  const painel = myTestModal?.painel

  const copyContent = (content: string | undefined) => {
    if (content) {
      navigator.clipboard.writeText(content).then(() => {
        toast.success('Conteúdo copiado!');
      }).catch(err => {
        console.error('Erro ao copiar: ', err);
      });
    }
  }

  if (!myTestModal.isOpen) return null;

  return (
    <div className="absolute  flex px-4 justify-center items-center h-full w-full z-[1] bg-background_rgba backdrop-blur-sm">
      <div className="relative border dark:border-white bg-secondary dark:bg-secondary p-6 min-w-[400px] rounded-lg shadow-lg">
        <Button
          onClick={() => {
            myTestModal.onClose()
          }}
          className="absolute top-2 right-2 dark:text-background dark:hover:text-accent-foreground"
          variant="ghost"
        >
          <X className='dark:text-white'/>
        </Button>
        <>
          {workers ? //Enterprise
            <>
              <div className='mb-5'>
                <h2 className="text-2xl font-bold mb-2">Seu Teste IPTV foi gerado</h2>
              </div>
            
              {painel == "TNM2" && (
                <>
                  <div className='flex flex-col'>
                    <h3>TNM2 - Controle interno</h3>
                    <br />
                    <div className='flex gap-2'>
                      <h3>Nome: <span className='cursor-copy' onClick={() => copyContent(myName)}>{myName}</span></h3>
                    </div>
                    <div className='flex gap-2'>
                      <h3>Usuário: <span className='cursor-copy' onClick={() => copyContent(myTest?.user_teste)}>{myTest?.user_teste}</span></h3>
                    </div>
                    <div className='flex gap-2'>
                      <h3>Senha: <span className='cursor-copy' onClick={() => copyContent(myTest?.senha_teste)}>{myTest?.senha_teste}</span></h3>
                    </div>
                    <div className='leading-tight'>
                      <div className='flex gap-2'>
                        <h3>Url 1: <span className='cursor-copy text-primary' onClick={() => copyContent("https://tyuo22.live")} >https://tyuo22.live</span></h3>
                      </div><br />
                      <div className='flex gap-2'>
                        <h3>Url 2: <span className='cursor-copy text-primary' onClick={() => copyContent("https://mbcz9.online")} >https://mbcz9.online</span></h3>
                      </div><br />
                      <div className='flex gap-2'>
                        <h3>Url 3: <span className='cursor-copy text-primary' onClick={() => copyContent("http://serviceon.ltd")} >http://serviceon.ltd</span></h3>
                      </div><br />
                      <div className='flex gap-2'>
                        <h3>Vencimento: <span className='cursor-copy text-primary' onClick={() => copyContent("*Teste de 3 horas*")} >*Teste de 3 horas*</span></h3>
                      </div><br />
                      <div className='flex gap-2'>
                        <h3>M3U 1: <span className='cursor-copy text-primary' onClick={() => copyContent(`http://apow.life/get.php?username=${myTest?.user_teste}&password=${myTest?.senha_teste}&type=m3u_plus&output=ts`)} >http://apow.life/get.php?username={myTest?.user_teste}&password={myTest?.senha_teste}&type=m3u_plus&output=ts</span></h3>
                      </div><br />
                      <div className='flex gap-2'>
                        <h3>M3U 2: <span className='cursor-copy text-primary' onClick={() => copyContent(`http://ouy1.vip/get.php?username=${myTest?.user_teste}&password=${myTest?.senha_teste}&type=m3u_plus&output=ts`)} >http://ouy1.vip/get.php?username={myTest?.user_teste}&password={myTest?.senha_teste}&type=m3u_plus&output=ts</span></h3>
                      </div><br />
                      <div className='flex gap-2'>
                        <h3>SSIPTV: <span className='cursor-copy text-primary' onClick={() => copyContent(`http://pouy.one/ssiptv/get/${myTest?.user_teste}/${myTest?.senha_teste}/download_m3u/`)} >http://pouy.one/ssiptv/get/{myTest?.user_teste}/{myTest?.senha_teste}/download_m3u/</span></h3>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {painel == "TNM7" && (
                <>
                  <div className='flex flex-col gap-1'>
                    <h3>TNM7 - Controle interno</h3>
                    <br />
                    <div className='flex gap-2'>
                      <h3>Nome: <span className='cursor-copy' onClick={() => copyContent(myName)}>{myName}</span></h3>
                    </div>
                    <div className='flex gap-2'>
                      <h3>Usuário: <span className='cursor-copy' onClick={() => copyContent(myTest?.username)}>{myTest?.username}</span></h3>
                    </div>
                    <div className='flex gap-2'>
                      <h3>Senha: <span className='cursor-copy' onClick={() => copyContent(myTest?.password)}>{myTest?.password}</span></h3>
                    </div>
                    <div className='leading-tight'>
                      <div className='flex gap-2'>
                        <h3>Vencimento: <span className='cursor-copy text-primary' onClick={() => copyContent("*Teste de 4 horas*")} >*Teste de 4 horas*</span></h3>
                      </div><br />
                      <div className='flex gap-2'>
                        <h3>Url 1: <span className='cursor-copy text-primary' onClick={() => copyContent(`${myTest?.dns}`)} >{myTest?.dns}</span></h3>
                      </div><br />
                      <div className='flex gap-2'>
                        <h3>M3U 1: <span className='cursor-copy text-primary' onClick={() => copyContent(`http://playtec.tv/get.php?username=${myTest?.username}&password=${myTest?.password}&type=m3u_plus&output=m3u8`)} >http://playtec.tv/get.php?username={myTest?.username}&password={myTest?.password}&type=m3u_plus&output=m3u8</span></h3>
                      </div><br />
                      <div className='flex gap-2'>
                        <h3>M3U 2: <span className='cursor-copy text-primary' onClick={() => copyContent(`http://7svrcdn3.xyz:8080/get.php?username=${myTest?.username}&password=${myTest?.password}&type=m3u_plus&output=ts`)} >http://7svrcdn3.xyz:8080/get.php?username={myTest?.username}&password={myTest?.password}&type=m3u_plus&output=ts</span></h3>
                      </div><br />
                      <div className='flex gap-2'>
                        <h3>SSIPTV: <span className='cursor-copy text-primary' onClick={() => copyContent(`http://playtec.tv/ssiptv/${myTest?.username}/${myTest?.password}/download_mode`)} >http://playtec.tv/ssiptv/{myTest?.username}/{myTest?.password}/download_mode</span></h3>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {painel == "TNMI1" && (
                <>
                  <div className='flex flex-col gap-1'>
                    <h3>TNMI1 - Controle interno</h3>
                    <br />
                    <div className='flex gap-2'>
                      <h3>Nome: <span className='cursor-copy' onClick={() => copyContent(myName)}>{myName}</span></h3>
                    </div>
                    <div className='flex gap-2'>
                      <h3>Usuário: <span className='cursor-copy' onClick={() => copyContent(myTest?.user_teste)}>{myTest?.user_teste}</span></h3>
                    </div>
                    <div className='flex gap-2'>
                      <h3>Senha: <span className='cursor-copy' onClick={() => copyContent(myTest?.senha_teste)}>{myTest?.senha_teste}</span></h3>
                    </div>
                    <div className='leading-tight'>
                      <div className='flex gap-2'>
                        <h3>Vencimento: <span className='cursor-copy text-primary' onClick={() => copyContent("*Teste de 6 horas*")} >*Teste de 6 horas*</span></h3>
                      </div><br />
                      <div className='flex gap-2'>
                        <h3>Url 1: <span className='cursor-copy text-primary' onClick={() => copyContent("http://7smartvplayers.top:2052/")} >http://7smartvplayers.top:2052/</span></h3>
                      </div><br />
                      <div className='flex gap-2'>
                        <h3>M3U 1: <span className='cursor-copy text-primary' onClick={() => copyContent(`http://voa2.online:80/get.php?username=${myTest?.user_teste}&password=${myTest?.senha_teste}&type=m3u_plus&output=ts`)} >http://voa2.online:80/get.php?username={myTest?.user_teste}&password={myTest?.senha_teste}&type=m3u_plus&output=ts</span></h3>
                      </div><br />
                      <div className='flex gap-2'>
                        <h3>M3U 2: <span className='cursor-copy text-primary' onClick={() => copyContent(`http://top.cdn-domain.net:80/get.php?username=${myTest?.user_teste}&password=${myTest?.senha_teste}&type=m3u_plus&output=ts`)} >http://top.cdn-domain.net:80/get.php?username={myTest?.user_teste}&password={myTest?.senha_teste}&type=m3u_plus&output=ts</span></h3>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
            :
            <>
              {success ? ( //success users                    
                <div className="mb-10">
                  <h2 className="text-2xl font-bold mb-2">Teste enviado para o seu email</h2>
                  <p className="text-lg">
                    O seu teste IPTV foi gerado!! Entre 2 e 5 minutos, receberá de 2 a 3 testes no email fornecido.
                  </p>
                  <p className="text-lg">
                    Verifique sua <b>caixa de email</b>, <b>lixeira</b> e <b>span</b> para obter as informações do teste.
                  </p>
                </div>
              ) : ( //users faild
                <>
                  <div className="mb-10">
                    <h2 className="text-2xl font-bold mb-2">Teste já gerado</h2>
                    <p className="text-lg">
                      Um teste já foi gerado para este email. Aproveite!
                    </p>
                    <p className="text-lg">
                      {myName}, para <b>ativar sua conta</b>, clique no botão abaixo.
                    </p>
                  </div>
                  <div className="mt-4">
                    <Link href={"https://suportemil.com"} target="_blank">
                      <Button className="w-full bg-green-500 hover:bg-green-600 text-white" >
                        Ativar conta
                      </Button>
                    </Link>
                  </div>
                </>

              )}

            </>
          }
        </>
      </div>
    </div>
  )
}

export default MyTestModalProvider
