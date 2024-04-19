import "@/assets/css/style.css";
import 'alertifyjs/build/css/alertify.css';
import 'alertifyjs/build/css/themes/default.css';
import Providers from "@/providers/Provider";
import { getServerSession } from "next-auth";
import imgHome from "@/assets/images/pages/home/so-do-tu-duy.webp"

export const metadata = {
  title: "Mindmap Flow",
  description: "Mindmap Flow - Công cụ xây dựng sơ đồ tư duy mạnh mẽ",
  images: [`${process.env.NEXT_PUBLIC_HOST}${imgHome.src}`]
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
