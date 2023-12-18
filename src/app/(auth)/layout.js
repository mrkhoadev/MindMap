import { getProviders } from "next-auth/react";
import Link from "next/link";
import SingInBtn from "./components/SingInBtn";

export default async function AuthLayout({ children }) {
  const providers = await getProviders();
  return (
    <main className="bg-primary-100 min-h-[100vh] relative flex justify-center items-center">
      <div className={`bg-[#fff] py-4 px-7 w-[400px] rounded-md`}>
        {children}
        <div className="flex flex-col gap-y-4">
          {Object.values(providers).map((provider) => {
            if (provider.id !== "credentials") {
              return (
                <div key={provider.id}>
                  <SingInBtn id={provider.id} name={provider.name} />
                </div>
              );
            }
          })}
          <Link
            href={"/"}
            className="text-center text-primary-100 hover:underline decoration-1"
          >
            Trở lại trang chủ
          </Link>
        </div>
      </div>
    </main>
  );
}
