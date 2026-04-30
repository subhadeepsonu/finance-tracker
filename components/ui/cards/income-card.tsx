"use client"

import { useState } from "react"
import { Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import EditIncomeDialog from "../forms/edit-income"
import DeleteIncomeDialog from "../forms/delete-income"

type Income = {
    id: string
    name: string
    userId: string
}

export default function IncomeCard({ income, userId }: { income: Income; userId: string }) {
    const [editOpen, setEditOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)

    return (
        <>
            <div className="flex items-center justify-between border rounded-lg px-4 py-3 shadow-sm bg-white">
                <Link
                    href={`/dashboard/${income.id}`}
                    className="font-medium text-gray-800 hover:underline hover:text-blue-600 transition-colors"
                >
                    {income.name}
                </Link>
                <div className="flex gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditOpen(true)}
                        aria-label="Edit"
                    >
                        <Pencil className="w-4 h-4 text-blue-500" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteOpen(true)}
                        aria-label="Delete"
                    >
                        <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                </div>
            </div>

            <EditIncomeDialog
                open={editOpen}
                onOpenChange={setEditOpen}
                income={income}
                userId={userId}
            />
            <DeleteIncomeDialog
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                incomeId={income.id}
                incomeName={income.name}
                userId={userId}
            />
        </>
    )
}