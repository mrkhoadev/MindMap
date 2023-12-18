import Home from "@/pages/Home";
import { getServerSession } from "next-auth";

export default async function HomeRoute() {
  const session = await getServerSession();

  return <Home session={session} />;
}
