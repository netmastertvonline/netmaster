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
import { Textarea } from "@/components/ui/textarea";
import { useMessageProvider } from "@/app/hooks/useMessageProvider";
import { createMessage, updateMessage } from "@/app/employees/sales/services/messages/actions";
import { Message } from "@/app/types/message";

const formSchema = z.object({
    title: z.string().toLowerCase().min(2, {
        message: "Por favor, digite o titulo.",
    }),
    message: z.string().min(2, {
        message: "Por favor, digite a mensagem.",
    }),

});

interface MessageFormProps {
    message: Message | null | undefined
}

const MessageForm = ({ message }: MessageFormProps) => {
    const [isSaving, setIsSaving] = useState(false)
    const messageModal = useMessageProvider();  

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            title: message?.title || "",
            message: message?.message || ""
        }
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema> ) => {
        setIsSaving(true)                
        try {
            let res;

            if (message) {
                res = await updateMessage(message?.id, values)
                if(res.status === 200){
                    toast.success(res?.message)
                    form.reset()
                    messageModal.onClose()
                    return
                }
            }else{
                res = await createMessage(values)
                if(res.status === 201){
                    toast.success(res?.message)
                    form.reset()
                    messageModal.onClose()
                    return
                }
            }
            toast.error(res?.message)
        } catch (error) {
            console.log(error);
            toast.error("Ocorreu um erro inesperado")
        }
        setIsSaving(false)
    };

    return (
        <div className="w-full">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-4"
                >
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold text-base">Titulo:</FormLabel>
                                <FormControl>
                                    <Input
                                        className="dark:border-primary"
                                        type="text"
                                        disabled={isSubmitting}
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
                                <FormLabel className="font-bold text-base">Mensagem:</FormLabel>
                                <FormControl>
                                    <Textarea 
                                        className="resize-none dark:border-primary"
                                        rows={10}
                                        disabled={isSubmitting}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-[12px]" />
                            </FormItem>
                        )}
                    />
                    
                    <div className="my-3">
                        <Button
                            className="w-full"
                            type={"submit"}
                            variant={"default"}
                            disabled={!isValid || isSubmitting || isSaving}
                        >
                            {isSaving ? 
                                <>
                                    {message ? 
                                        <span className="flex items-center gap-2">Editando <Loader className="animate-spin" /></span>
                                    :
                                        <span className="flex items-center gap-2">Salvando <Loader className="animate-spin" /></span>
                                     }
                                </>
                                :
                                <>
                                    {message ? "Editar": "Salvar" }
                                </>
                                
                            }
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default MessageForm;