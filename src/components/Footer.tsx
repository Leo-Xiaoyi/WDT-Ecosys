import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white">
      {/* Bottom Footer */}
      <div className="py-12 bg-white border-t border-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 relative">
            {/* Center: Links */}
            <div className="flex items-center gap-12 text-sm font-bold text-[#1E1B4B]">
               <Link href="/about" className="hover:text-[#A399D8] transition-colors uppercase tracking-widest">About</Link>
               <Link href="/contact" className="hover:text-[#A399D8] transition-colors uppercase tracking-widest">Contact Us</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
