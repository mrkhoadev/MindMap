import Image from "next/image";
import imgHome from "@/assets/images/pages/home/so-do-tu-duy.webp"

export default function Home() {
  return (
    <main className="bg-[#E0E7FF]">
      <div className={`container xl:mx-auto max-w-7xl py-11`}>
        <div>
          <h1 className={`text-center text-4xl font-medium`}>
            Học tập hiệu quả với bản đồ tư duy
          </h1>
        </div>
        <div className={`text-center mt-10`}>
          <button
            className={`rounded-full bg-accent-100 text-300 px-6 py-2 text-xl`}
          >
            Sử dụng miễn phí
          </button>
          <Image
            src={imgHome}
            width={672}
            height={352}
            style={{ width: "auto", height: "auto" }}
            priority
            alt="intro"
            className="mx-auto mt-5"
          />
        </div>
        <div className="flex gap-x-[100px] mt-10">
          <div className="flex-1 text-center">
            <span className="h-[2px] w-[80px] bg-[rgb(199,210,254)] inline-block"></span>
            <h5 className="text-xl font-medium my-3">DỄ SỬ DỤNG</h5>
            <p className="text-200">
              FWR blocks bring in an air of fresh design with their creative
              layouts and blocks, which are easily customizable
            </p>
          </div>
          <div className="flex-1 text-center">
            <span className="h-[2px] w-[80px] bg-[rgb(199,210,254)] inline-block"></span>
            <h5 className="text-xl font-medium my-3">KHÔNG GIỚI HẠN</h5>
            <p className="text-200">
              FWR blocks are the cleanest pieces of HTML blocks, which are
              built with utmost care to quality and usability.
            </p>
          </div>
          <div className="flex-1 text-center">
            <span className="h-[2px] w-[80px] bg-[rgb(199,210,254)] inline-block"></span>
            <h5 className="text-xl font-medium my-3">QUẢN LÝ VÀ CHIA SẺ</h5>
            <p className="text-200">
              FWR blocks is a perfect tool for designers, developers and
              agencies looking to create stunning websites in no time.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
