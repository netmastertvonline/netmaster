"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
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
import { Loader, Trash } from "lucide-react";
import { todayDate } from "@/lib/today-date";

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Por favor, digite o nome do cliente.",
    }),
    phone: z.string().min(11, {
        message: "Por favor, digite o telefone do cliente.",
    }),
    plan_value: z.string().min(2, {
        message: "Por favor, digite o valor pago.",
    }),
    plan_type: z.number().optional(),
    contracting_plan: z.string().optional(),
    screens: z.array(z.object({
        screen_name: z.string().optional(),
        user_number: z.string().optional(),
        app_name: z.string().optional(),
        mac_address: z.string().optional(),
        app_key: z.string().optional()
    }).optional()),
});

const ClientForm = () => {
    const [isSaving, setIsSaving] = useState(false)
    const today = todayDate()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            phone: '',
            plan_value: '29.99',
            contracting_plan: today,
            screens: [{ screen_name: 'Tela 1', user_number: '' }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "screens"
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
        
        setIsSaving(true)
        try {
            toast.success("Pergunta criada com sucesso")
            form.reset()
        } catch (error) {
            console.log(error);
            toast.error("Ocorreu um erro inesperado")
        }
        setIsSaving(false)
    };

    const addAnswers = () => {
        append({ screen_name: '', user_number: '', app_name: '', mac_address: '', app_key: '' });
    }

    const removeAnswers = (idx: number) => {
        if (fields.length <= 1) {
            toast.error("Este é o mínimo de telas")
            return
        }
        remove(idx)
    }

    return (
        <div className="w-full">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col "
                >
                    <div className="flex gap-2">

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="grow">
                                    <FormLabel>Nome:</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            disabled={isSubmitting}
                                            placeholder="Maria da Carmo"
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
                                            type="text"
                                            disabled={isSubmitting}
                                            placeholder="41985645219"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-[12px]" />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                        <FormField
                            control={form.control}
                            name="plan_value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Valor do plano:</FormLabel>
                                    <FormControl className="min-w-fit flex justify-end">
                                        <Input
                                            type="number"
                                            disabled={isSubmitting}
                                            placeholder="29.99"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-[12px]" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="contracting_plan"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contratação:</FormLabel>
                                    <FormControl className="min-w-fit flex justify-end">
                                        <Input
                                            type="date"
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
                            name="plan_type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tipo de Plano:</FormLabel>
                                    <Select>
                                        <SelectTrigger className="min-w-[120px]">
                                            <SelectValue placeholder="Padrão" />
                                        </SelectTrigger>
                                        <SelectContent {...field}>
                                            <SelectItem value="padrão">Padrão</SelectItem>
                                            <SelectItem value="premium">Premium</SelectItem>
                                            <SelectItem value="pro">Pro</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage className="text-[12px]" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="contracting_plan"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Plano:</FormLabel>
                                    <Select>
                                        <SelectTrigger className="min-w-[120px]">
                                            <SelectValue placeholder="Mensal" />
                                        </SelectTrigger>
                                        <SelectContent {...field}>
                                            <SelectItem value="mensal">Mensal</SelectItem>
                                            <SelectItem value="trimestral">Trimestral</SelectItem>
                                            <SelectItem value="semestral">Semestral</SelectItem>
                                            <SelectItem value="anual">Anual</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage className="text-[12px]" />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="my-3">
                        <Button type="button" onClick={addAnswers}>Adicionar tela</Button>
                        {fields.length > 0 && fields.map((field, idx) => (
                            <div key={field.id} className="flex mt-3 items-center justify-center w-full gap-2">
                                <div className="w-full grid grid-cols-5 gap-2">
                                    <FormField
                                        control={form.control}
                                        name={`screens.${idx}.screen_name`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        disabled={isSubmitting}
                                                        placeholder={`Tela ${idx + 1}`}
                                                        defaultValue={`Tela ${idx + 1}`}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-[12px]" />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`screens.${idx}.user_number`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        disabled={isSubmitting}
                                                        placeholder={`usuário`}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-[12px]" />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`screens.${idx}.app_name`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <Select>
                                                    <SelectTrigger className="min-w-[120px]">
                                                        <SelectValue placeholder="APP" />
                                                    </SelectTrigger>
                                                    <SelectContent {...field}>
                                                        <SelectItem value="netmaster 1">NETMASTER 1</SelectItem>
                                                        <SelectItem value="netmaster 2">NETMASTER 2</SelectItem>
                                                        <SelectItem value="netmaster pro">NETMASTER PRO</SelectItem>
                                                        <SelectItem value="ibo player">IBO PLAYER</SelectItem>
                                                        <SelectItem value="ibo player pro">IBO PLAYER PRO</SelectItem>
                                                        <SelectItem value="smarters">SMARTERS</SelectItem>
                                                        <SelectItem value="smartone">SMARTONE</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage className="text-[12px]" />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`screens.${idx}.mac_address`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        disabled={isSubmitting}
                                                        placeholder={"MAC"}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-[12px]" />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`screens.${idx}.app_key`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        disabled={isSubmitting}
                                                        placeholder={"KEY"}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-[12px]" />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <Button title="Excluir" variant={"destructive"} type="button" onClick={() => removeAnswers(idx)}>
                                    <Trash />
                                </Button>
                            </div>
                        ))}
                    </div>

                    <div className="my-3">
                        <Button
                            className="w-full"
                            type={"submit"}
                            variant={"default"}
                            disabled={!isValid || isSubmitting || isSaving}
                        >
                            {isSaving ? <Loader className="animate-spin" /> : "Salvar"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default ClientForm;