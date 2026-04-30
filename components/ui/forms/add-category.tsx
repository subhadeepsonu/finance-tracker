"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"


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
import addCategory from "@/app/actions/category"

const formSchema = z.object({
    Name: z.string().min(3, "Name must be at least 3 characters."),
})

export default function AddCategoryDialog({
    open,
    onOpenChange,
    userId,
}: {
    open: boolean
    onOpenChange: (open: boolean) => void
    userId: string
}) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { Name: "" },
    })

    const queryClient = useQueryClient()

    const { mutate: addCategoryMutate, isPending } = useMutation({
        mutationFn: async (name: string) => {
            return await addCategory({ userId, name })
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["categories"] })
            toast.success("Category added!")
            form.reset()
            onOpenChange(false)
        },
        onError: (error) => {
            toast.error(`Failed to add: ${error.message}`)
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        addCategoryMutate(values.Name)
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Add Category</AlertDialogTitle>
                    <AlertDialogDescription>
                        Enter a name for the new category.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <form id="add-category-form" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="Name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="add-category-name">Name</FieldLabel>
                                    <Input
                                        {...field}
                                        id="add-category-name"
                                        placeholder="e.g. Food & Drink"
                                        aria-invalid={fieldState.invalid}
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
                    <AlertDialogCancel onClick={() => form.reset()}>Cancel</AlertDialogCancel>
                    <Button type="submit" form="add-category-form" disabled={isPending}>
                        {isPending ? "Adding..." : "Add"}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}