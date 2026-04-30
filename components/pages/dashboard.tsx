"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Plus } from "lucide-react"
import { getAllIncomes } from "@/app/actions/Income"
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import IncomeCard from "../ui/cards/income-card"
import AddIncomeDialog from "../ui/forms/add-income"

export default function DashBoard(props: { userId: string }) {
    const [addOpen, setAddOpen] = useState(false)

    const { data: incomes, isLoading, error } = useQuery({
        queryKey: ["incomeSources"],
        queryFn: () => getAllIncomes(props.userId),
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
        <div className="min-h-screen w-full px-6 py-8 mt-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Income Sources</h1>
                <Button onClick={() => setAddOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add New
                </Button>
            </div>

            {/* Content */}
            {incomes && incomes.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {incomes.map((income) => (
                        <IncomeCard
                            key={income.id}
                            income={income}
                            userId={props.userId}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex justify-center items-center h-[60vh]">
                    <p className="text-gray-500 text-lg">
                        No income sources yet. Add one to get started.
                    </p>
                </div>
            )}

            <AddIncomeDialog
                open={addOpen}
                onOpenChange={setAddOpen}
                userId={props.userId}
            />
        </div>
    )
}