import CategoriesDashboard from "@/components/pages/categories";
import { getCurrentUser } from "../actions/get-user";
import { redirect } from "next/navigation";

export default async function CategoriesPage() {
    const user = await getCurrentUser()
    if (!user) return redirect("/")
    return (
        <div>
            <h1>Categories</h1>
            <CategoriesDashboard userId={user?.id} />
        </div>
    )
}
