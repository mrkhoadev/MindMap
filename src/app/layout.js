import "@/assets/css/style.css";
import Providers from "@/providers/Provider";
import { getServerSession } from "next-auth";
import "@/assets/css/loading.css";

export const metadata = {
  title: "Mindmap Flow",
  description: "Mindmap Flow - Công cụ xây dựng sơ đồ tư duy mạnh mẽ",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
