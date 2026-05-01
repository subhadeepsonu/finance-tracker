"use client"

import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { UpdateIncome } from "@/app/actions/Income"

import { Button } from "@/components/ui/button"
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

type Income = { id: string; name: string; userId: string }

const formSchema = z.object({
    Name: z.string().min(3, "Name must be at least 3 characters."),
})

export default function EditIncomeDialog({
    open,
    onOpenChange,
    income,
    userId,
}: {
    open: boolean
    onOpenChange: (open: boolean) => void
    income: Income
    userId: string
}) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { Name: income.name },
    })

    useEffect(() => {
        form.reset({ Name: income.name })
    }, [income, form])

    const queryClient = useQueryClient()

    const { mutate: updateIncome, isPending } = useMutation({
        mutationFn: async (name: string) => {
            return await UpdateIncome({ userId, incomeId: income.id, name })
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["incomeSources"] })
            toast.success("Income bucket updated!")
            onOpenChange(false)
        },
        onError: (error) => {
            toast.error(`Failed to update: ${error.message}`)
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        updateIncome(values.Name)
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="border-blue-100">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-slate-900">
                        Edit income bucket
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-slate-500">
                        Update the name for <strong className="text-slate-700">{income.name}</strong>.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <form id="edit-income-form" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="Name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="edit-income-name">Name</FieldLabel>
                                    <Input
                                        {...field}
                                        id="edit-income-name"
                                        aria-invalid={fieldState.invalid}
                                        className="border-blue-100 focus:border-blue-400 focus:ring-blue-50"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </form>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button
                        type="submit"
                        form="edit-income-form"
                        disabled={isPending}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        {isPending ? "Saving..." : "Save changes"}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}