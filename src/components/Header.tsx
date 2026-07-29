"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "WAWT", href: "/wawt" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Directory", href: "/database" },
    { name: "Map", href: "/map" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image 
            src="/Pictures/logo.png" 
            alt="Waikato.DT Logo" 
            width={140} 
            height={40} 
            className="h-9 w-auto object-contain"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-10 text-[#1E1B4B] font-semibold text-sm">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name}
                href={link.href} 
                className={`relative py-1 transition-colors hover:text-[#3B3469] ${isActive ? "text-[#1E1B4B]" : "text-[#1E1B4B]/70"}`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-[-14px] left-0 right-0 h-[2px] bg-[#1E1B4B]" />
                )}
              </Link>
            );
          })}
        </nav>

        <Link 
          href="/join" 
          className="bg-[#3B3469] text-white px-7 py-2.5 rounded-lg font-bold hover:bg-[#2D2852] transition-all uppercase text-[12px] tracking-wider shadow-md"
        >
          Join Ecosystem
        </Link>
      </div>
    </header>
  );
};

export default Header;
