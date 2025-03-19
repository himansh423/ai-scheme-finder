"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

const ShowNav = () => {
  const pathname = usePathname();

  const hideNavbarPaths = [
    /^\/auth\/login$/,
    /^\/auth\/register$/,
    /^\/auth\/verify-otp\/[^\/]+$/, 
  ];

  const shouldHideNavbar = hideNavbarPaths.some((pattern) =>
    pattern.test(pathname)
  );

  return <div>{!shouldHideNavbar && <Navbar />}</div>;
};

export default ShowNav;
