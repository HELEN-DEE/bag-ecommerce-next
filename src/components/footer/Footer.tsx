"use client";
import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { HiArrowRight, HiArrowUp } from "react-icons/hi2";
import {
  RiTwitterXFill,
  RiInstagramLine,
  RiLinkedinBoxLine,
} from "react-icons/ri";

import VisaLogo from "../../../public/footer-images/Visa.png";
import MasterCardLogo from "../../../public/footer-images/Mastercard.png";
import PayPalLogo from "../../../public/footer-images/paypal.png";

  const footerWrapper = () => {
  return <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
    <Footer />
  </Suspense>
}

const menuLinks = [
  { name: "Men", link: "/men" },
  { name: "Women", link: "/women" },
  { name: "Children", link: "/children" },
  { name: "Brand", link: "/brand" },
  { name: "New", link: "/new" },
  { name: "Popular", link: "/popular" },
];

const supportlinks = [
  { name: "Shipping & Returns", link: "/shipping-returns" },
  { name: "FAQs", link: "/faqs" },
  { name: "Help & Conditions", link: "/help-conditions" },
  { name: "About", link: "/about" },
  { name: "Contact", link: "/contact" },
];

const logoImage = [
  { image: MasterCardLogo, alt: "MasterCard Logo" },
  { image: PayPalLogo, alt: "PayPal Logo" },
  { image: VisaLogo, alt: "Visa Logo" },
];

const appIcons = [
  { icon: RiInstagramLine, link: "/instagram" },
  { icon: RiTwitterXFill, link: "/twitter" },
  { icon: RiLinkedinBoxLine, link: "/linkedin" },
];




const Footer = () => {

  const searchParams = useSearchParams();
  const router = useRouter();
  const currentType = searchParams.get("type");

  const handleFilter = (type: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (type === currentType) {
      params.delete("type");
    } else {
      params.set("type", type);
    }
    router.push(`/?${params.toString()}`);
  };

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section className="mx-4 my-8 bg-[#F4F4F4] rounded-2xl">
      <div className="p-4 md:p-6">
        <div className="flex flex-col lg:flex-row lg:justify-between">
          {/* Newsletter Section */}
          <div className="w-full lg:w-[50%]">
            <h1 className="uppercase text-base sm:text-lg md:text-xl w-full lg:w-[65%] pb-4 md:pb-5 leading-snug">
              Subscribe to our newsletter and be the first to know about our
              latest releases, offers and news from bagstore.com
            </h1>
            <span className="flex justify-between items-center border px-4 md:px-6 py-2 md:py-2 rounded-full w-full lg:w-[60%] bg-white">
              <input
                type="email"
                placeholder="Enter your email here"
                className="bg-transparent focus:outline-none text-sm md:text-lg flex-1 placeholder:text-gray-400"
              />
              <button className="flex-shrink-0">
                <HiArrowRight size={20} />
              </button>
            </span>
            <span className="flex gap-2 pt-3 items-center">
              <input
                type="radio"
                className="w-4 h-4 md:w-5 md:h-5 appearance-none border-2 rounded-full border-gray-400 checked:bg-black flex-shrink-0"
              />
              <label className="text-sm md:text-base">I agree to the bagstore privacy policy</label>
            </span>
          </div>

          {/* Menu & Support Links - Hidden on mobile */}
          <div className="hidden lg:flex justify-between w-[30%] mt-6 lg:mt-0">
            <div>
              <h1 className="capitalize text-2xl">Menu</h1>
              <ul>
                {menuLinks.map((menu, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleFilter(menu.name.toLowerCase())}
                      className="hover:underline text-left"
                    >
                      {menu.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h1 className="capitalize text-2xl">Support</h1>
              <ul>
                {supportlinks.map((support, index) => (
                  <li key={index}>
                    <a href={support.link}>{support.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between pt-6 md:pt-6 items-center gap-4 md:gap-0">
          {/* Payment Logos */}
          <div className="flex items-center gap-3 order-2 md:order-1">
            {logoImage.map((logo, index) => (
              <Image
                key={index}
                src={logo.image}
                alt={logo.alt}
                width={50}
                height={35}
                className="md:w-[60px] md:h-[40px]"
              />
            ))}
          </div>
          
          {/* Social Icons */}
          <div className="flex gap-3 order-3 md:order-2">
            {appIcons.map((app, index) => (
              <a key={index} href={app.link} className="hover:opacity-70 transition-opacity">
                <app.icon size={20} className="md:w-[20px] md:h-[20px]" />
              </a>
            ))}
          </div>
          
          {/* Back to Top Button */}
          <div className="order-1 md:order-3 w-full md:w-auto flex justify-center md:justify-end">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 bg-[#ffffff] px-4 py-3 rounded-full md:rounded-2xl border border-gray-400 hover:bg-black hover:text-white transition-colors text-sm md:text-base"
            >
              Back to top
              <HiArrowUp size={15} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default footerWrapper;
