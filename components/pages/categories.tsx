"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Plus } from "lucide-react"
import { getAllCategories } from "@/app/actions/category"
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import AddCategoryDialog from "../ui/forms/add-category"
import CategoryCard from "../ui/cards/category-card"


export default function CategoriesDashboard({ userId }: { userId: string }) {
    const [addOpen, setAddOpen] = useState(false)

    const { data: categories, isLoading, error } = useQuery({
        queryKey: ["categories"],
        queryFn: () => getAllCategories(userId),
    })

    if (isLoading) return (
        <div className="h-screen w-full flex justify-center items-center">
            <Spinner />
        </div>
    )

    if (error) return (
        <div className="h-screen w-full flex justify-center items-center text-red-500">
            Error: {error.message}
        </div>
    )

    return (
        <div className="max-w-xl mx-auto py-10 px-4 space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Categories</h1>
                <Button onClick={() => setAddOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add New
                </Button>
            </div>

            {categories && categories.length > 0 ? (
                <div className="space-y-2">
                    {categories.map((category) => (
                        <CategoryCard
                            key={category.id}
                            category={category}
                            userId={userId}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 py-10">
                    No categories yet. Add one to get started.
                </p>
            )}

            <AddCategoryDialog
                open={addOpen}
                onOpenChange={setAddOpen}
                userId={userId}
            />
        </div>
    )
}