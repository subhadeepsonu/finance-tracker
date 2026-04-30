"use client"

import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateCategory } from "@/app/actions/category"

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

type Category = { id: string; name: string; userId: string }

const formSchema = z.object({
    Name: z.string().min(3, "Name must be at least 3 characters."),
})

export default function EditCategoryDialog({
    open,
    onOpenChange,
    category,
    userId,
}: {
    open: boolean
    onOpenChange: (open: boolean) => void
    category: Category
    userId: string
}) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { Name: category.name },
    })

    useEffect(() => {
        form.reset({ Name: category.name })
    }, [category, form])

    const queryClient = useQueryClient()

    const { mutate: updateCategoryMutate, isPending } = useMutation({
        mutationFn: async (name: string) => {
            return await updateCategory({ userId, categoryId: category.id, name })
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["categories"] })
            toast.success("Category updated!")
            onOpenChange(false)
        },
        onError: (error) => {
            toast.error(`Failed to update: ${error.message}`)
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        updateCategoryMutate(values.Name)
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Edit Category</AlertDialogTitle>
                    <AlertDialogDescription>
                        Update the name for <strong>{category.name}</strong>.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <form id="edit-category-form" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="Name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="edit-category-name">Name</FieldLabel>
                                    <Input
                                        {...field}
                                        id="edit-category-name"
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
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button type="submit" form="edit-category-form" disabled={isPending}>
                        {isPending ? "Saving..." : "Save Changes"}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}