import LandingPage from "@/components/pages/landing";
import { getCurrentUser } from "./actions/get-user";
import DashBoard from "@/components/pages/dashboard";
export default async function Home() {

  const user = await getCurrentUser();

  if (user == null) return <LandingPage />
  else return <DashBoard />
}