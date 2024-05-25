import Image from "next/image";
import React from "react";

// ----------------------------------------------------------------------

export default function Footer() {
  return (
    <footer className="md:px-10 lg:px-20 bg-slate-950">
      <div className="flex flex-col md:flex-row justify-center items-center gap-5 pt-8 pb-10">
        <div className="flex flex-col md:flex-row items-center gap-5 text-white">
          <Image
            alt="Popupsmar Logo"
            src="/assets/images/popupsmart-logo.webp"
            height={40}
            width={40}
          />
          <div className="flex items-center text-xs gap-4 h-6 text-white">
            <span>Copyright © 2024 by Albek Altay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
