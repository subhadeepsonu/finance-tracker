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
        <div className="min-h-screen w-full pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Categories</h1>
                        <p className="text-sm text-slate-500 mt-1">Manage your spending categories</p>
                    </div>
                    <Button
                        onClick={() => setAddOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Category
                    </Button>
                </div>

                {/* Content */}
                {categories && categories.length > 0 ? (
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {categories.map((category) => (
                            <CategoryCard
                                key={category.id}
                                category={category}
                                userId={userId}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col justify-center items-center h-[60vh] gap-3">
                        <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
                            <Plus className="w-5 h-5 text-blue-400" />
                        </div>
                        <p className="text-slate-500 text-base">
                            No categories yet. Add one to get started.
                        </p>
                    </div>
                )}

            </div>

            <AddCategoryDialog
                open={addOpen}
                onOpenChange={setAddOpen}
                userId={userId}
            />
        </div>
    )
}