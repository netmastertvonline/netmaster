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
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader, Trash } from "lucide-react";
import { todayDate } from "@/lib/today-date";
import Editor from "@/components/Editor";
import { formatToLowerCase } from "@/lib/format-to-lowercase";
import { createUser } from "@/app/employees/sales/clients/actions";
import { Screen, Subscription, User } from "@prisma/client";
import removeSpaces from "@/lib/remove-spaces";

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Por favor, digite o nome do cliente.",
    }),
    email: z.string().optional(),
    phone: z.string().min(11, {
        message: "Por favor, digite o telefone do cliente.",
    }),
    plan_value: z.string().min(2, {
        message: "Por favor, digite o valor pago.",
    }),
    plan_type: z.string().optional(),
    periodicity: z.string().optional(),
    contracting_plan: z.string().optional(),
    expiration_plan: z.string().optional(),
    screens: z.array(z.object({
        screen_name: z.string().optional(),
        system_type: z.string().optional(),
        painel: z.string().optional(),
        user_number: z.string().optional(),
        app_name: z.string().optional(),
        mac_address: z.string().optional(),
        app_key: z.string().optional()
    }).optional()),
    notes: z.string().optional(),
});

interface ClientFormProps {
    client?: (User & { subscription: (Subscription & { screens: Screen[] })[] });
} 

const ClientForm = ({ client }: ClientFormProps) => {    
    const [isSaving, setIsSaving] = useState(false)
    const today = todayDate()    

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: client?.name || "",
            email: client?.email || "",
            phone: client?.phone || "",
            plan_value: client?.subscription[0]?.plan_value || '29.99',
            plan_type: client?.subscription[0]?.plan_type || "Padrão",
            periodicity: client?.subscription[0]?.periodicity || "Mensal",
            contracting_plan: client?.subscription[0]?.contracting_plan || today,
            expiration_plan: client?.subscription[0]?.expiration_plan || "",
            screens: client?.subscription[0]?.screens?.map(screen => ({
                screen_name: screen?.screen_name || "",
                system_type: screen?.system_type || "",
                painel: screen?.painel || "",
                user_number: screen?.user_number || "",
                app_name: screen?.app_name || "",
                mac_address: screen?.mac_address || "",
                app_key: screen?.app_key || ""
            })) || [{ screen_name: "Tela 1", system_type: "IPTV" }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "screens"
    });

    const { isSubmitting, isValid } = form.formState;
    const watch = form.watch;
    const watchPeriodicity = watch("periodicity");
    const watchContractingPlan = watch("contracting_plan");

    useEffect(() => {
        const expirationDate = new Date(watchContractingPlan || '');
        switch (watchPeriodicity) {
            case "Mensal":
                expirationDate.setMonth(expirationDate.getMonth() + 1);
                break;
            case "Trimestral":
                expirationDate.setMonth(expirationDate.getMonth() + 3);
                break;
            case "Semestral":
                expirationDate.setMonth(expirationDate.getMonth() + 6);
                break;
            case "Anual":
                expirationDate.setFullYear(expirationDate.getFullYear() + 1);
                break;
        }
        form.setValue("expiration_plan", expirationDate.toISOString().split('T')[0]);
    }, [watchPeriodicity, watchContractingPlan]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSaving(true)
        try {
            const res = await createUser(values as unknown as User)
            if (res.status = 201) {
                toast.success(res.message)
                form.reset()
            }
        } catch (error) {
            console.log(error);
            toast.error("Ocorreu um erro inesperado")
        }
        setIsSaving(false)
    };

    const addScreens = () => {
        append({ system_type: "IPTV" });
    }

    const removeScreens = (idx: number) => {
        if (fields.length <= 1) {
            toast.error("Este é o mínimo de telas")
            return
        }
        remove(idx)
    }

    const formatPhone = (phone: string) => {
        return phone.replace(/\D/g, '');
    };

    const formatName = (name: string) => {
        return name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    };

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
                                            value={formatName(field.value)}
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
                                <FormItem className="grow">
                                    <FormLabel>Email:</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            disabled={isSubmitting}
                                            placeholder="exemplo@dominio.com"
                                            {...field}
                                            value={field.value ? formatToLowerCase(field.value) : ""}
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
                                            placeholder="41985645219"
                                            {...field}
                                            value={formatPhone(field.value)}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-[12px]" />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
                        <FormField
                            control={form.control}
                            name="plan_value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Valor do plano:</FormLabel>
                                    <FormControl className="min-w-fit flex justify-end">
                                        <Input
                                            type="text"
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
                            name="plan_type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tipo de Plano:</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="min-w-[120px]">
                                            <SelectValue placeholder="Padrão" />
                                        </SelectTrigger>
                                        <SelectContent >
                                            <SelectItem value="Padrão">Padrão</SelectItem>
                                            <SelectItem value="Premium">Premium</SelectItem>
                                            <SelectItem value="Pro">Pro</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage className="text-[12px]" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="periodicity"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel>Periodo:</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="min-w-[120px]">
                                            <SelectValue placeholder="Mensal" />
                                        </SelectTrigger>
                                        <SelectContent {...field}>
                                            <SelectItem value="Mensal">Mensal</SelectItem>
                                            <SelectItem value="Trimestral">Trimestral</SelectItem>
                                            <SelectItem value="Semestral">Semestral</SelectItem>
                                            <SelectItem value="Anual">Anual</SelectItem>
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
                            name="expiration_plan"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Vencimento:</FormLabel>
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
                    </div>
                    <div className="my-3">
                        <Button type="button" onClick={addScreens}>Adicionar tela</Button>
                        {fields.length > 0 && fields.map((field, idx) => (
                            <div key={field.id} className="flex mt-3 items-center justify-center w-full gap-2">
                                <div className="w-full grid grid-cols-7 gap-2">
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
                                        name={`screens.${idx}.system_type`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger className="min-w-[120px]">
                                                        <SelectValue placeholder="SISTEMA" />
                                                    </SelectTrigger>
                                                    <SelectContent {...field}>
                                                        <SelectItem value="IPTV">IPTV</SelectItem>
                                                        <SelectItem value="P2P">P2P</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage className="text-[12px]" />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`screens.${idx}.painel`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger className="min-w-[120px]">
                                                        <SelectValue placeholder="PAINEL" />
                                                    </SelectTrigger>
                                                    <SelectContent {...field} className="h-[300px]">
                                                        <SelectItem value="Club - TNM1">Club - TNM1</SelectItem>
                                                        <SelectItem value="P2 Cini - TNM2">P2 Cini - TNM2</SelectItem>
                                                        <SelectItem value="UniPlay - TNM3">UniPlay - TNM3</SelectItem>
                                                        <SelectItem value="Live 21 - TNM4">Live 21 - TNM4</SelectItem>
                                                        <SelectItem value="Tvs - TNM5">Tvs - TNM5</SelectItem>
                                                        <SelectItem value="Datec - TNM6">Datec - TNM6</SelectItem>
                                                        <SelectItem value="PlayTec - TNM7">PlayTec - TNM7</SelectItem>
                                                        <SelectItem value="Linx - TNM9">Linx - TNM9</SelectItem>
                                                        <SelectItem value="Gf - TNM10">Gf - TNM10</SelectItem>
                                                        <SelectItem value="Elite - TNMP1">Elite - TNMP1</SelectItem>
                                                        <SelectItem value="Bit - TNMP2">Bit - TNMP2</SelectItem>
                                                        <SelectItem value="Seven - TNMI1">Seven - TNMI1</SelectItem>
                                                        <SelectItem value="Mega - TNMI2">Mega - TNMI2</SelectItem>
                                                        <SelectItem value="Outro">Outro</SelectItem>
                                                    </SelectContent>
                                                </Select>
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
                                                        value={removeSpaces(field.value || "") || ""}
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
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger className="min-w-[120px] ">
                                                        <SelectValue placeholder="APP" />
                                                    </SelectTrigger>
                                                    <SelectContent {...field} className="h-[300px]">
                                                        <SelectItem value="BAY TV">BAY TV</SelectItem>
                                                        <SelectItem value="BOB PLAYER">BOB PLAYER</SelectItem>
                                                        <SelectItem value="CAP PLAYER">CAP PLAYER</SelectItem>
                                                        <SelectItem value="CLOUDDY">CLOUDDY</SelectItem>
                                                        <SelectItem value="DUPLECAST">DUPLECAST</SelectItem>
                                                        <SelectItem value="DUPLEX PLAYER">DUPLEX PLAYER</SelectItem>
                                                        <SelectItem value="ENZO PLAYER">ENZO PLAYER</SelectItem>
                                                        <SelectItem value="IBO PLAYER">IBO PLAYER</SelectItem>
                                                        <SelectItem value="IBO PLAYER">IBO PLAYER PRO</SelectItem>
                                                        <SelectItem value="IPTV 4K">IPTV 4K</SelectItem>
                                                        <SelectItem value="IPTV PLUS E PLAYER">IPTV PLUS E PLAYER</SelectItem>
                                                        <SelectItem value="NETMASTER 1">NETMASTER 1</SelectItem>
                                                        <SelectItem value="NETMASTER 2">NETMASTER 2</SelectItem>
                                                        <SelectItem value="NETMASTER PRO">NETMASTER PRO</SelectItem>
                                                        <SelectItem value="SMARTERS">SMARTERS</SelectItem>
                                                        <SelectItem value="SMARTONE">SMARTONE</SelectItem>
                                                        <SelectItem value="SMART IPTV">SMART IPTV</SelectItem>
                                                        <SelectItem value="SMART TV CLUB">SMART TV CLUB</SelectItem>
                                                        <SelectItem value="SS IPTV">SS IPTV</SelectItem>
                                                        <SelectItem value="VU PLAYER">VU PLAYER</SelectItem>
                                                        <SelectItem value="XCLOUD">XCLOUD</SelectItem>
                                                        <SelectItem value="OUTRO">OUTRO</SelectItem>
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
                                                        placeholder={"MAC - EMAIL"}
                                                        {...field}
                                                        value={removeSpaces(field.value || "") || ""}
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
                                                        placeholder={"KEY - SENHA"}
                                                        {...field}
                                                        value={removeSpaces(field.value || "") || ""}
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-[12px]" />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <Button title="Excluir" variant={"destructive"} type="button" onClick={() => removeScreens(idx)}>
                                    <Trash />
                                </Button>
                            </div>
                        ))}
                    </div>
                    <div>
                        <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                                <FormItem>
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
                    </div>
                    <div className="my-3">
                        <Button
                            className="w-full"
                            type={"submit"}
                            variant={"default"}
                            disabled={!isValid || isSubmitting || isSaving}
                        >
                            {isSaving ?
                                <span className="flex items-center gap-2">Salvando <Loader className="animate-spin" /></span>
                                :
                                <span className="flex items-center gap-2">Salvar</span>
                            }
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default ClientForm;