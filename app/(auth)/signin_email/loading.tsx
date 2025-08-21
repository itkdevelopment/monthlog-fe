import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex justify-center h-screen items-center bg-white">
      <Image
        src="/images/blue_loading.gif"
        alt="로딩중"
        width={50}
        height={50}
        unoptimized
      />
    </div>
  );
}
