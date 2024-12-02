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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { WhatsApp } from "@prisma/client";
import { createWhatsApp, editWhatsApp } from "@/app/admin/whatsapp/actions";
import { useWhatsAppProvider } from "@/app/hooks/useWhatsAppProvider";
import removeSpaces from "@/lib/remove-spaces";
import Editor from "@/components/Editor";

const formSchema = z.object({
    phone: z.string().min(11, {
        message: "Por favor, digite o numero de.",
    }),
    phone_type: z.string({
        message: "Por favor, escolha o tipo do numero.",
    }),
    original_link: z.string().optional(),
    custom_link: z.string().optional(),
    status: z.boolean().optional(),
    notes: z.string().optional(),
    operator: z.string().optional(),
    message: z.string().optional(),
});

interface WhatsApptFormProps {
    whatsApp?: WhatsApp
}

const WhatsApptForm = ({ whatsApp }: WhatsApptFormProps) => {
    const [isSaving, setIsSaving] = useState(false)
    const whatsAppModal = useWhatsAppProvider()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            phone: whatsApp?.phone || "",
            original_link: "",
            phone_type: whatsApp?.phone_type || "sales",
            custom_link: whatsApp?.custom_link || "",
            notes: whatsApp?.notes || "",
            operator: whatsApp?.operator || "",
            message: whatsApp?.message || ""
        }
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSaving(true)
        let res;
        try {
            if (whatsApp?.id) {
                res = await editWhatsApp(whatsApp?.id, values as WhatsApp)
                if (res?.status === 200) {
                    toast.success(res?.message)
                    form.reset()
                    whatsAppModal.onClose()
                }

            } else {
                res = await createWhatsApp(values as unknown as WhatsApp)
                if (res.status = 201) {
                    toast.success(res.message)
                    form.reset()
                    whatsAppModal.onClose()
                }
            }
        } catch (error) {
            console.log(error);
            toast.error("Ocorreu um erro inesperado")
        }
        setIsSaving(false)
    };

    const formatPhone = (phone: string) => {
        return phone.replace(/\D/g, '');
    };

    return (
        <div className="w-full">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-2 "
                >
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
                                        placeholder="41985645219"
                                        {...field}
                                        value={formatPhone(field.value)}
                                    />
                                </FormControl>
                                <FormMessage className="text-[12px]" />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="operator"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Atendente:</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            disabled={isSubmitting}
                                            placeholder="Nome do atendente"
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
                                        <Input
                                            type="text"
                                            disabled={isSubmitting}
                                            placeholder="Gostaria de informações..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-[12px]" />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name={"phone_type"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tipo:</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="min-w-[120px] ">
                                        <SelectValue placeholder="TIPO" />
                                    </SelectTrigger>
                                    <SelectContent {...field} className="max-h-[300px]">
                                        <SelectItem value="sales">Vendas</SelectItem>
                                        <SelectItem value="suport">Suporte</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage className="text-[12px]" />
                            </FormItem>
                        )}
                    />
                    {whatsApp &&
                        <>
                            <FormField
                                control={form.control}
                                name="custom_link"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Link personalizado:</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                disabled={isSubmitting}
                                                placeholder="https://bit.ly/3Aieyq1"
                                                {...field}
                                                value={removeSpaces(field.value || "") || ''}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-[12px]" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="notes"
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel>Anotações:</FormLabel>
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
                        </>
                    }
                    <div className="my-3">
                        <Button
                            className="w-full"
                            type={"submit"}
                            variant={"default"}
                            disabled={!isValid || isSubmitting || isSaving}
                        >
                            {isSaving ?
                                <span className="flex items-center gap-2">{whatsApp ? "Atualizando" : "Salvando"}<Loader className="animate-spin" /></span>
                                :
                                <span className="flex items-center gap-2">{whatsApp ? "Atualizar" : "Salvar"}</span>
                            }
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default WhatsApptForm;