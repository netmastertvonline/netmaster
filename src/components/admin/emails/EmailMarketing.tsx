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
import { Loader } from "lucide-react";
import Editor from "@/components/Editor";
import { Textarea } from "@/components/ui/textarea";
import { sendMailMarketing } from "@/app/admin/email/send-mail/actions";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    emails: z.string().min(1, {
        message: "Por favor, digite a mensagem.",
    }),
    subject: z.string().optional(),
    message: z.string().min(1, {
        message: "Por favor, digite a mensagem.",
    }),
});

const EmailMarketingForm = () => {
    const [isSendingMail, setIsSendingMail] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            subject: '',
            emails: '',
            message: ''
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSendingMail(true)

        const emailsArray = values.emails
            .split(/\s+/) 
            .map(email => email.trim()) 
            .filter(email => email !== "")
            .filter((email, index, self) => self.indexOf(email) === index);
            
        try {
            for (let index = 0; index < emailsArray.length; index++) {
                const email = emailsArray[index];
                await sendMailMarketing(email, values?.subject, values.message);
                toast.success(`Email ${index + 1} enviado com sucesso`);
            }
        } catch (error) {
            toast.error("Ocorreu um erro inesperado, tente mais tarde")
            console.log(error);
        }
        form.reset()
        setIsSendingMail(false)
    };

    return (
        <div className="w-full">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col "
                >
                    <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Assunto:</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        disabled={isSubmitting}
                                        placeholder="Renovação"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="emails"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Emails:</FormLabel>
                                <FormControl>
                                    <Textarea
                                        rows={7}
                                        disabled={isSubmitting}
                                        placeholder="Digite os e-mails, separando-os por vírgula"
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
                                Enviando emails <Loader className="animate-spin" />
                             </span>
                             :
                              "Enviar emails"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default EmailMarketingForm;