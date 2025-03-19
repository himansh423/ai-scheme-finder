import Image from "next/image";
import logo from "../../public/Logo.png";
import Link from "next/link";
import { ArrowBigRight } from "lucide-react";
import { Bebas_Neue } from "next/font/google";
const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"] });
const Navbar = () => {
  return (
    <div className="w-screen h-[90px] bg-black border-b-[1px] flex justify-between max-xs:flex-col max-xs:py-7 max-xs:h-[160px] max-xs:gap-7 px-7 items-center border-white">
      <div className="relative w-[300px] h-[50px]">
        <Image src={logo.src} alt="logo" objectFit="cover" layout="fill" />
      </div>
      <Link
        className={`${bebasNeue.className} w-[200px] h-[50px] bg-black text-white shadow-md shadow-[#e5e5e5] flex items-center justify-center  rounded-lg border-[1px] border-black`}
        href={"/saved-schemes"}
      >
        <p>Saved Schemes</p>
        <div>
          <ArrowBigRight />
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
