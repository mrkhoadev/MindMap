import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import Home from "@/pages/Home";
import { getServerSession } from "next-auth";

export default async function HomeRoute() {
  const session = await getServerSession();

  return (
    <>
      <Header session={session} />
      <Home />
      <Footer />
    </>
  );
}
