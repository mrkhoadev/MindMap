import imgError from "@/assets/images/error/error.png"
export const metadata = {
  title: "Không tìm thấy",
  description: "Lỗi 404",
  images: [`${process.env.NEXT_PUBLIC_HOST}${imgError.src}`]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
