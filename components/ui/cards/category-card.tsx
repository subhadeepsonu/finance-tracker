"use client"

import { useState } from "react"
import { Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import EditCategoryDialog from "../forms/edit-category"
import DeleteCategoryDialog from "../forms/delete-category"

type Category = { id: string; name: string; userId: string }

export default function CategoryCard({
    category,
    userId,
}: {
    category: Category
    userId: string
}) {
    const [editOpen, setEditOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)

    return (
        <>
            <div className="flex items-center justify-between border border-slate-200 rounded-xl px-4 py-3 shadow-sm bg-white hover:shadow-md transition-shadow">
                <span className="font-medium text-slate-800">{category.name}</span>
                <div className="flex gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditOpen(true)}
                        aria-label="Edit"
                        className="hover:bg-blue-50"
                    >
                        <Pencil className="w-4 h-4 text-blue-500" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteOpen(true)}
                        aria-label="Delete"
                        className="hover:bg-red-50"
                    >
                        <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                </div>
            </div>

            <EditCategoryDialog
                open={editOpen}
                onOpenChange={setEditOpen}
                category={category}
                userId={userId}
            />
            <DeleteCategoryDialog
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                categoryId={category.id}
                categoryName={category.name}
                userId={userId}
            />
        </>
    )
}