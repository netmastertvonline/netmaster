"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { getTestTNM2 } from "../app/tests/client/actions";
import { Loader } from "lucide-react";
import { useMyTestProvider } from "../app/hooks/useMyTestProvider";
import { MyTest } from "../app/types/mytest";

const GenerateTestFormWorkerTNM2 = () => {
  const [isGettingTest, setIsGettingTest] = useState(false)
  const myTest = useMyTestProvider();
  const workers = true
  const success = true
  const painel = "TNM2"

  const OnSubmit = async () => {
    setIsGettingTest(true)
    try {
      const res: MyTest = await getTestTNM2()
      const firstName = 'Seu Nome'
      myTest.onOpen(res, firstName, success, workers, painel)
      toast.success("Teste gerado com sucesso");
    } catch (error) {
      toast.error("Ocorreu um erro inesperado, tente mais tarde")
      console.log(error);
    }
    setIsGettingTest(false)
  };

  return (
    <div className="w-fit">
      <Button onClick={OnSubmit} className="w-[200px] " variant={"default"}>
      {isGettingTest ?
            <div className="flex gap-2">
              Gerando teste TNM2
              <span className="animate-spin gap-2">
                {isGettingTest && <Loader />}
              </span>
            </div>
            :
            'P2 CINI - TNM2'
          }
        </Button>
    </div>
  );
};

export default GenerateTestFormWorkerTNM2
