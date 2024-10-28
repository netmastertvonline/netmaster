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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import Editor from "@/components/Editor";
import { sendTestEmail } from "@/app/employees/sales/email/send-mail/actions";

const formSchema = z.object({
    email: z.string().email().min(1, {
        message: "Por favor, digite a mensagem.",
    }),
    name: z.string().min(1, {
        message: "Por favor, digite o nome do cliente.",
    }),
    message: z.string().min(1, {
        message: "Por favor, digite a mensagem.",
    }),
});
type SendMail = {
    name: string;
    email: string;
    message: string;
}

const MessageTestMailForm = () => {
    const [isSendingMail, setIsSendingMail] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            message: ''
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSendingMail(true)
        try {
            const res = await sendMail(values)
            console.log("RESP EMAIL", res.email);
            toast.success("Email enviado com sucesso")
        } catch (error) {
            toast.error("Ocorreu um erro inesperado, tente mais tarde")
            console.log(error);
        }
        form.reset()
        setIsSendingMail(false)
    };

    const sendMail = async (values: SendMail) => {
        const firstName = values.name.split(' ')[0];

        const email = await sendTestEmail(values.email, values.message, firstName)
        return { email }
    }

    const formatName = (name: string) => {
        return name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    };

    return (
        <div className="w-full">
            <Form {...form}>
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
                                    value={formatName(field.value)}
                                />
                            </FormControl>
                            <FormMessage className="text-[12px]" />
                        </FormItem>
                    )}
                />
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col "
                ><FormField
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
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mensagem:</FormLabel>
                                <FormControl>
                                    <Editor
                                        {...field}
                                        value={field.value || ''}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="my-3">
                        <Button
                            className="w-full"
                            type={"submit"}
                            variant={"default"}
                            disabled={!isValid || isSubmitting || isSendingMail}
                        >
                            {isSendingMail ? 
                             <span className="flex items-center gap-2">
                                Enviando email <Loader className="animate-spin" />
                             </span>
                             :
                              "Enviar email"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default MessageTestMailForm;