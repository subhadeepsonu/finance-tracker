import { getCurrentUser } from "@/app/actions/get-user"
import TransactionsDashboard from "@/components/pages/transaction"
import { redirect } from "next/navigation"

export default async function TransactionPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const user = await getCurrentUser()
    if (!user) return redirect("/")

    return (
        <TransactionsDashboard
            userId={user.id}
            incomeSourceId={id}
        />
    )
}