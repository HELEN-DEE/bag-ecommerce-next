"use client";
import { useState, useEffect, Suspense } from "react";
import { FiSearch, FiFilter, FiX, FiCheck } from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";
import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

const SearchBar = () => {
    return <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <SearchBarInner />
    </Suspense>
  }


const buttonMain = [
  { label: "Men", type: "men" },
  { label: "Women", type: "women" },
  { label: "Children", type: "children" },
  { label: "Brand", type: "brand" },
  { label: "New", type: "new" },
  { label: "Popular", type: "popular" },
];

const buttonSub = [
  { label: "About", type: "about", link: "/about" },
  { label: "FAQs", type: "faqs", link: "/faqs" },
];

// Inner component that actually uses useSearchParams
const SearchBarInner = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentType = searchParams.get("type");

  
  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Escape key closes modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFilterOpen(false);
    };

    if (isFilterOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isFilterOpen]);

  const handleFilter = (type: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (type === currentType) {
      params.delete("type");
    } else {
      params.set("type", type);
    }
    router.push(`/?${params.toString()}`);
    if (isMobile) setIsFilterOpen(false);
  };

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery) {
      params.set("search", searchQuery);
    } else {
      params.delete("search");
    }
    router.push(`/?${params.toString()}`);
  };

  const clearAllFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("type");
    params.delete("search");
    router.push(`/?${params.toString()}`);
    setSearchQuery("");
    setIsFilterOpen(false);
  };

  const getActiveFilterLabel = () => {
    if (!currentType) return "All Categories";
    return buttonMain.find((item) => item.type === currentType)?.label || "All Categories";
  };

  const activeFiltersCount = currentType ? 1 : 0;

  return (
    <>
      <section className="mx-4">
        {/* Mobile Layout */}
        {isMobile ? (
          <div className="flex flex-col space-y-4">
            {/* Search Bar + Mobile Filter Button */}
            <div className="flex gap-3 items-center">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="bg-[#F4F4F4] rounded-2xl p-3 hover:bg-black hover:text-white transition-colors relative"
              >
                <FiFilter size={18} />
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {/* Search Input */}
              <div className="bg-[#F4F4F4] rounded-2xl flex items-center flex-1 max-w-[460px]">
                <input
                  type="search"
                  placeholder="Search products..."
                  className="px-4 py-3 flex-grow bg-transparent outline-none text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <button
                  onClick={handleSearch}
                  className="bg-white rounded-full p-2 mx-2 hover:bg-black hover:text-white transition-colors"
                >
                  <FiSearch size={18} />
                </button>
              </div>
            </div>

            {/* Filter Label + Clear Button */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center gap-2 bg-[#F4F4F4] px-4 py-2 rounded-full text-sm hover:bg-gray-200 transition-colors"
              >
                <span>{getActiveFilterLabel()}</span>
                <MdKeyboardArrowDown size={18} />
              </button>

              {activeFiltersCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Sub Buttons */}
            <div className="flex gap-3 flex-wrap">
              {buttonSub.map((item) => (
                <Link key={item.type} href={item.link}>
                  <button className="bg-[#F4F4F4] px-3 py-2 text-xs rounded-2xl hover:bg-black hover:text-white transition-colors">
                    {item.label}
                  </button>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          /* Desktop Layout */
          <div className="flex items-center gap-3 flex-wrap">
            {buttonMain.map((item) => (
              <button
                key={item.type}
                onClick={() => handleFilter(item.type)}
                className={`bg-[#F4F4F4] px-4 py-2 text-sm lg:text-lg hover:bg-black hover:text-white rounded-2xl transition-all duration-200
                  ${currentType === item.type ? "bg-black text-white" : ""}`}
              >
                {item.label}
              </button>
            ))}

            <div className="bg-[#F4F4F4] rounded-2xl flex items-center max-w-[460px] flex-1">
              <input
                type="search"
                placeholder="Search products..."
                className="px-4 py-3 flex-grow bg-transparent outline-none text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <button
                onClick={handleSearch}
                className="bg-white rounded-full p-2 mx-2 hover:bg-black hover:text-white transition-colors"
              >
                <FiSearch size={18} />
              </button>
            </div>

            {buttonSub.map((item) => (
              <Link key={item.type} href={item.link}>
                <button className="bg-[#F4F4F4] px-4 py-2 text-sm lg:text-base rounded-2xl hover:bg-black hover:text-white transition-colors">
                  {item.label}
                </button>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Mobile Filter Modal */}
      {isMobile && isFilterOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsFilterOpen(false)}
          />
          <div className="fixed inset-x-0 bottom-0 bg-white rounded-t-3xl z-50 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Filter & Sort</h2>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-medium mb-4">Categories</h3>
              <button
                onClick={() => handleFilter("")}
                className={`w-full flex items-center justify-between p-4 rounded-lg border-2 mb-3 transition-all
                  ${!currentType ? "border-black bg-gray-50" : "border-gray-200 hover:border-gray-300"}`}
              >
                <span className="font-medium">All Categories</span>
                {!currentType && <FiCheck size={20} className="text-black" />}
              </button>

              <div className="space-y-3">
                {buttonMain.map((item) => (
                  <button
                    key={item.type}
                    onClick={() => handleFilter(item.type)}
                    className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all
                      ${currentType === item.type ? "border-black bg-gray-50" : "border-gray-200 hover:border-gray-300"}`}
                  >
                    <span className="font-medium">{item.label}</span>
                    {currentType === item.type && <FiCheck size={20} className="text-black" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50 flex gap-3">
              <button
                onClick={clearAllFilters}
                className="flex-1 py-3 px-4 border-2 border-gray-300 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="flex-1 py-3 px-4 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};



export default SearchBar;
