"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { checkUserTNM2, getTestTNM2, getTestTNMI1, saveUserTNM2, sendEmail } from "../app/tests/client/actions";
import { Loader } from "lucide-react";
import { useMyTestProvider } from "../app/hooks/useMyTestProvider";
import { MyTest } from "../app/types/mytest";
import { Input } from "@/components/ui/input";
import { User } from "@prisma/client";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Por favor, digite seu nome.",
  }),
  email: z.string().email({
    message: "Por favor, digite um email válido.",
  }).min(1, {
    message: "Por favor, digite seu email.",
  }),
  phone: z.string()
    .refine(
      (value) => /^\d+$/.test(value),
      {
        message: "Por favor, digite apenas números para o telefone.",
      }
    )
    .refine(
      (value) => value.length >= 11,
      {
        message: "O telefone deve ter pelo menos 11 dígitos.",
      }
    ),
});

const GenerateTestForm = () => {
  const [isGettingTest, setIsGettingTest] = useState(false)
  const myTest = useMyTestProvider();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      name: '',
      phone: '',
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsGettingTest(true)
    const workers = false
    let success = true
    const painel = ""
    
    try {
      const firstName = values.name.split(' ')[0];
      const user = await checkUserTNM2(values)

      if (!user) {
        const res = await sendMail1(values as User, firstName)
        setTimeout(() => sendMail3(values as User, firstName), 5000)
        
        console.log("RESP EMAIL", res.email);
        
        if (res.email.message.type === "success") {
          await saveUserTNM2(values as User);
          toast.success("Teste gerado com sucesso");
          myTest.onOpen(res.res, firstName, success, workers, painel)
        }else{
          toast.error("Ocorreu um erro inesperado, tente mais tarde")
        }
        
      } else {
        success = false
        const resp = null
        myTest.onOpen(resp, firstName, success, workers, painel)
        toast.error("Um teste já foi gerado para este usuário.");
      }
    } catch (error) {
      toast.error("Ocorreu um erro inesperado, tente mais tarde")
      console.log(error);
    }
    form.reset()
    setIsGettingTest(false)
  };

  const sendMail1 = async(values: User, firstName: string) =>{
    const listname = "TNM2"
    const res: MyTest = await getTestTNM2()
    const urls: string[] = ["http://serviceon.ltd", "http://tcosmarter.ddns.net", "http://tntv4.com:80"] 
    const dns: string[] = ["64.31.61.14", "103.195.100.208"] 
    const email = await sendEmail(values.email, firstName, res as MyTest, urls, listname, dns) 
    return {res, email}
  }

  const sendMail3 = async(values: User, firstName: string) =>{
    const listname = "TNMI1"
    const res: MyTest = await getTestTNMI1()
    const urls: string[] = ["http://7smartvplayers.top:2052"] 
    await sendEmail(values.email, firstName, res as MyTest, urls, listname) 
  } 

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome:</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    disabled={isSubmitting}
                    placeholder="Digite seu nome"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[12px]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email:</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    disabled={isSubmitting}
                    placeholder="Digite seu email"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[12px]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone:</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    disabled={isSubmitting}
                    placeholder="Digite seu telefone"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[12px]" />
              </FormItem>
            )}
          />
          <div className="my-3">
            <Button
              className="w-full gap-2"
              type={"submit"}
              variant={"default"}
              disabled={!isValid || isSubmitting}
            >
              {isGettingTest ? 'Gerando' : 'Gerar'} meu teste
              <span className="animate-spin">
                {isGettingTest && <Loader />}
              </span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default GenerateTestForm
