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
            <div className="flex items-center justify-between border border-blue-100 rounded-xl px-4 py-3.5 bg-white hover:border-blue-300 hover:bg-blue-50 transition-colors group">
                <Link
                    href={`/dashboard/${income.id}`}
                    className="font-medium text-slate-800 hover:text-blue-600 transition-colors text-sm"
                >
                    {income.name}
                </Link>
                <div className="flex gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditOpen(true)}
                        aria-label="Edit"
                        className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-100"
                    >
                        <Pencil className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteOpen(true)}
                        aria-label="Delete"
                        className="h-8 w-8 text-slate-400 hover:text-red-500 hover:bg-red-50"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
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