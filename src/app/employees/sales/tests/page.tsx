import React from 'react'
import { Metadata } from 'next';
import GenerateTestFormWorkerTNM2 from '@/components/GenerateTestFormWorkerTNM2';
import GenerateTestFormWorkerTNMI1 from '@/components/GenerateTestFormWorkerTNMI1';
import GenerateTestFormWorkerTNM7 from '@/components/GenerateTestFormWorkerTNM7';

export const metadata: Metadata = {
  title: "Vendas - Testes",
};

const TestesSalesPage = () => {
  return (
    <div className=" h-full w-full flex items-center bg-mobile md:bg-desk justify-center">
      <div className="w-full max-w-[800px] min-h-[500px] border dark:border-white rounded-lg bg-white dark:bg-secondary py-10 px-5 ">
        <div className="mb-5 text-black dark:text-primary">
          <h1 className="font-bold text-center text-4xl">Gerar Teste</h1>
        </div>
        <div className='flex gap-2 flex-wrap items-center justify-center'>
          <GenerateTestFormWorkerTNM2 />
          <GenerateTestFormWorkerTNM7 />
          <GenerateTestFormWorkerTNMI1 />
        </div>
      </div>
    </div>
  );
}

export default TestesSalesPage
