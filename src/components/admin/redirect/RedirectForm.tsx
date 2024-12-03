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
import { Redirect } from "@prisma/client";
import removeSpaces from "@/lib/remove-spaces";
import { createRedirect, editRedirect } from "@/app/admin/redirect/actions";
import { useRedirectProvider } from "@/app/hooks/useRedirectProvider";

const formSchema = z.object({
    redirect_to: z.string().min(1, {
        message: "Por favor, digite o nome do redirecionamento.",
    }),
    redirect_link: z.string().min(1, {
        message: "Por favor, digite o link do redirecionamento.",
    }),
    original_link: z.string().optional(),
    custom_link: z.string().optional(),
    status: z.boolean().optional(),
});

interface RedirectFormProps {
    redirect?: Redirect
}

const RedirectForm = ({ redirect }: RedirectFormProps) => {
    const [isSaving, setIsSaving] = useState(false)
    const redirectModal = useRedirectProvider()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            redirect_to: redirect?.redirect_to || "",
            redirect_link: redirect?.redirect_link || "",
            original_link: redirect?.original_link || "",
            custom_link: redirect?.custom_link || "",
        }
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSaving(true)
        let res;
        try {
            if (redirect?.id) {
                res = await editRedirect(redirect?.id, values as Redirect)
                if (res?.status === 200) {
                    toast.success(res?.message)
                    form.reset()
                    redirectModal.onClose()
                }

            } else {
                res = await createRedirect(values as unknown as Redirect)
                if (res.status = 201) {
                    toast.success(res.message)
                    form.reset()
                    redirectModal.onClose()
                }
            }
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
                    className="flex flex-col gap-2 "
                >
                    <FormField
                        control={form.control}
                        name="redirect_to"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Redirecionar para:</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        disabled={isSubmitting}
                                        placeholder="ex: Suporte"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-[12px]" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={"redirect_link"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Link de redirecionamento:</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        disabled={isSubmitting}
                                        placeholder="http://meulink.com"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-[12px]" />
                            </FormItem>
                        )}
                    />
                    {redirect &&
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
                                <span className="flex items-center gap-2">{redirect ? "Atualizando" : "Salvando"}<Loader className="animate-spin" /></span>
                                :
                                <span className="flex items-center gap-2">{redirect ? "Atualizar" : "Salvar"}</span>
                            }
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default RedirectForm;