"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

const formSchema = z.object({
    query: z.string().min(2, {
        message: "Por favor, digite o nome, telefone, ou usuário.",
    }),
});

const SearchClientForm = () => {
    const [isSearching, setIsSearching] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            query: '',
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSearching(true)
        console.log(values);
        
        try {
            toast.success("Cliente encontrado com sucesso")
        } catch (error) {
            toast.error("Ocorreu um erro inesperado")
            console.log(error);
        }
        setIsSearching(false)
    };

    return (
        <div className="w-full">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex gap-1 w-full"
                >
                    <FormField
                        control={form.control}
                        name="query"
                        render={({ field }) => (
                            <FormItem className="grow">
                                <FormControl >
                                    <Input
                                        className="border"
                                        type="text"
                                        disabled={isSubmitting}
                                        placeholder="nome, telefone, ou usuário"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-[12px]" />
                            </FormItem>
                        )}
                    />
                    <Button
                        className="w-fit"
                        type={"submit"}
                        variant={"outline"}
                        disabled={!isValid || isSubmitting || isSearching}
                    >
                        {isSearching ? <span className="flex gap-2 justify-center items-center"> Buscando <Loader className="animate-spin" /></span> : "Buscar cliente"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default SearchClientForm;