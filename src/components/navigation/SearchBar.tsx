"use client";
import { FiSearch } from "react-icons/fi";
import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {products} from "@/data/products"  

const buttonMain = [
  { label: "Men", type: "men" },
  { label: "Women", type: "women" },
  { label: "Children", type: "children" },
  { label: "Brand", type: "brand" },
  { label: "New", type: "new" },
  { label: "Popular", type: "popular" },
];

const buttonSub = [
  {label: "About", type: "about"},
  {label: "FAQs", type: "faqs"},
];

const SearchBar = () => {
  
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentType = searchParams.get("type");

  const handleFilter = (type: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (type === currentType) {
      params.delete("type"); // Toggle off
    } else {
      params.set("type", type);
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <section className="mx-4">
      <div className="flex flex-col lg:flex-row lg:justify-between">
        {buttonMain.map((item) => (
          <button
            key={item.type}
            onClick={() => handleFilter(item.type)}
            className={`bg-[#F4F4F4] md:px-4 md:py-2 px-3 py-2 text-[12px] md:text-lg rounded-2xl 
              // ${currentType === item.type ? "bg-black text-white" : ""}`}
          >
            {item.label}
          </button>
        ))}
        <div className='bg-[#F4F4F4] rounded-2xl flex items-center max-w-[460px] w-full '>
              <input type="search" name="" id="search" placeholder='Search...' className=' px-3 py-2 flex-grow bg-transparent outline-none '/>
              <div className='bg-white rounded-full p-2 inline-flex mx-2 hover:bg-black hover:text-white'>
                <FiSearch className='' size={15}/>
              </div>
        </div>
      <div className=" lg:flex gap-4">
        {buttonSub.map((item) => (
          <button
            key={item.type}
            // onClick={() => handleFilter(item.type)}
            className={`bg-[#F4F4F4] md:px-4 md:py-2 px-3 py-2 text-[12px] md:text-lg rounded-2xl`}
          >
            {item.label}
          </button>
        ))}
      </div>
      </div>
      
    </section>
  );
};

export default SearchBar;
