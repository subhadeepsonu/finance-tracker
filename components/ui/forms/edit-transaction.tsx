"use client"

import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, Resolver, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { updateTransaction } from "@/app/actions/transactions"
import { getAllCategories } from "@/app/actions/category"
import { TransactionType } from "@/generated/client"

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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type Transaction = {
    id: string
    amount: number
    categoryId: string
    Type: TransactionType
    incomeSourceId: string
}

const formSchema = z.object({
    amount: z.coerce.number().positive("Amount must be greater than 0."),
    categoryId: z.string().min(1, "Please select a category."),
    Type: z.nativeEnum(TransactionType),
})

export default function EditTransactionDialog({
    open,
    onOpenChange,
    transaction,
    userId,
    incomeSourceId,
}: {
    open: boolean
    onOpenChange: (open: boolean) => void
    transaction: Transaction
    userId: string
    incomeSourceId: string
}) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema) as unknown as Resolver<z.infer<typeof formSchema>>,
        defaultValues: {
            amount: transaction.amount,
            categoryId: transaction.categoryId,
            Type: transaction.Type,
        },
    })

    useEffect(() => {
        form.reset({
            amount: transaction.amount,
            categoryId: transaction.categoryId,
            Type: transaction.Type,
        })
    }, [transaction, form])

    const queryClient = useQueryClient()

    const { data: categories, isLoading: categoriesLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: () => getAllCategories(userId),
        enabled: open,
    })

    const { mutate: updateTransactionMutate, isPending } = useMutation({
        mutationFn: async (values: z.infer<typeof formSchema>) => {
            return await updateTransaction(
                userId,
                transaction.id,
                values.amount,
                values.categoryId,
                values.Type
            )
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["transactions", incomeSourceId] })
            toast.success("Transaction updated!")
            onOpenChange(false)
        },
        onError: (error) => {
            toast.error(`Failed to update: ${error.message}`)
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        updateTransactionMutate(values)
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Edit Transaction</AlertDialogTitle>
                    <AlertDialogDescription>
                        Update the details for this transaction.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <form id="edit-transaction-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FieldGroup>
                        {/* Amount */}
                        <Controller
                            name="amount"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="edit-transaction-amount">Amount</FieldLabel>
                                    <Input
                                        {...field}
                                        id="edit-transaction-amount"
                                        type="number"
                                        step="0.01"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        {/* Category */}
                        <Controller
                            name="categoryId"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="edit-transaction-category">Category</FieldLabel>
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        disabled={categoriesLoading}
                                    >
                                        <SelectTrigger id="edit-transaction-category" aria-invalid={fieldState.invalid}>
                                            <SelectValue placeholder={categoriesLoading ? "Loading..." : "Select a category"} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories?.map((cat) => (
                                                <SelectItem key={cat.id} value={cat.id}>
                                                    {cat.name}
                                                </SelectItem>
                                            ))}
                                            {categories?.length === 0 && (
                                                <SelectItem value="none" disabled>
                                                    No categories found
                                                </SelectItem>
                                            )}
                                        </SelectContent>
                                    </Select>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        {/* Type */}
                        <Controller
                            name="Type"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="edit-transaction-type">Type</FieldLabel>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger id="edit-transaction-type">
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.values(TransactionType).map((type) => (
                                                <SelectItem key={type} value={type}>
                                                    {type.charAt(0) + type.slice(1).toLowerCase()}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
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
                    <Button type="submit" form="edit-transaction-form" disabled={isPending}>
                        {isPending ? "Saving..." : "Save Changes"}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}