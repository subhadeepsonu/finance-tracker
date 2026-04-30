import DashBoard from "@/components/pages/dashboard";
import { getCurrentUser } from "../actions/get-user";
import { redirect } from "next/navigation";

export default async function Page() {
    const user = await getCurrentUser()
    if (!user) return redirect("/")

    return (
        <DashBoard userId={user.id} />
    )
}