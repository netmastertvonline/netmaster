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

const formSchema = z.object({
    query: z.string().min(2, {
        message: "Por favor, digite o telefone.",
    }),
});

const SearchWhatsAppForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            query: '',
        },
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        if (query.length >= 2) {
            setIsSubmitting(true);
            try {
                toast.success("Mensagens encontradas com sucesso");
            } catch (error) {
                toast.error("Ocorreu um erro inesperado");
                console.log(error);
            }
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full">
            <Form {...form}>
                <form
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
                                        placeholder="pix"
                                        {...field}
                                        onChange={(e) => {
                                            field.onChange(e);
                                            handleInputChange(e);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage className="text-[12px]" />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </div>
    );
};

export default SearchWhatsAppForm;