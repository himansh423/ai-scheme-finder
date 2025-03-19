"use client";
import { usePathname } from "next/navigation";
import Footer from "./Footer";

const ShowFooter = () => {
  const pathname = usePathname();

  const hideFooterPaths = [
    /^\/auth\/login$/,
    /^\/auth\/register$/,
    /^\/auth\/verify-otp\/[^\/]+$/,
    /^\/upload-profile-picture$/,
    /^\/write-about-yourself$/,
    /^\/important-questions$/,
    /^\/forgot-password$/,
    /^\/reset-password(?:\?.*)?$/,
  ];

  // Checking if the current pathname matches any of the hideNavbarPaths
  const shouldFooterNavbar = hideFooterPaths.some((pattern) =>
    pattern.test(pathname)
  );

  return <div>{!shouldFooterNavbar && <Footer />}</div>;
};

export default ShowFooter;
