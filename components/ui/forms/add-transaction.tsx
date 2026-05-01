"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm, type Resolver } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
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
import { getAllCategories } from "@/app/actions/category"
import { createTransaction } from "@/app/actions/transactions"

const formSchema = z.object({
    amount: z.coerce.number().positive("Amount must be greater than 0."),
    categoryId: z.string().min(1, "Please select a category."),
    Type: z.nativeEnum(TransactionType),
})

export default function AddTransactionDialog({
    open,
    onOpenChange,
    userId,
    incomeSourceId,
}: {
    open: boolean
    onOpenChange: (open: boolean) => void
    userId: string
    incomeSourceId: string
}) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema) as unknown as Resolver<z.infer<typeof formSchema>>,
        defaultValues: {
            amount: 0,
            categoryId: "",
            Type: TransactionType.EXPENSE,
        },
    })

    const queryClient = useQueryClient()

    const { data: categories, isLoading: categoriesLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: () => getAllCategories(userId),
        enabled: open,
    })

    const { mutate: addTransaction, isPending } = useMutation({
        mutationFn: async (values: z.infer<typeof formSchema>) => {
            return await createTransaction(
                userId,
                incomeSourceId,
                values.amount,
                values.categoryId,
                values.Type
            )
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["transactions", incomeSourceId] })
            toast.success("Transaction added!")
            form.reset()
            onOpenChange(false)
        },
        onError: (error) => {
            toast.error(`Failed to add: ${error.message}`)
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        addTransaction(values)
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="rounded-2xl p-6 shadow-lg">
                <AlertDialogHeader className="mb-2">
                    <AlertDialogTitle className="text-xl font-bold text-slate-900">
                        Add Transaction
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-sm text-slate-500">
                        Enter the details for the new transaction.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <form id="add-transaction-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FieldGroup>
                        {/* Amount */}
                        <Controller
                            name="amount"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel
                                        htmlFor="add-transaction-amount"
                                        className="text-sm font-medium text-slate-700"
                                    >
                                        Amount
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="add-transaction-amount"
                                        type="number"
                                        step="0.01"
                                        placeholder="0.00"
                                        aria-invalid={fieldState.invalid}
                                        className="mt-1 rounded-lg border-slate-200 focus:ring-blue-500 focus:border-blue-500"
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
                                    <FieldLabel
                                        htmlFor="add-transaction-category"
                                        className="text-sm font-medium text-slate-700"
                                    >
                                        Category
                                    </FieldLabel>
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        disabled={categoriesLoading}
                                    >
                                        <SelectTrigger
                                            id="add-transaction-category"
                                            aria-invalid={fieldState.invalid}
                                            className="mt-1 rounded-lg border-slate-200"
                                        >
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
                                    <FieldLabel
                                        htmlFor="add-transaction-type"
                                        className="text-sm font-medium text-slate-700"
                                    >
                                        Type
                                    </FieldLabel>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger
                                            id="add-transaction-type"
                                            className="mt-1 rounded-lg border-slate-200"
                                        >
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

                <AlertDialogFooter className="mt-4 gap-2">
                    <AlertDialogCancel
                        onClick={() => form.reset()}
                        className="rounded-lg border-slate-200 text-slate-600 hover:bg-slate-50"
                    >
                        Cancel
                    </AlertDialogCancel>
                    <Button
                        type="submit"
                        form="add-transaction-form"
                        disabled={isPending}
                        className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        {isPending ? "Adding..." : "Add Transaction"}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}