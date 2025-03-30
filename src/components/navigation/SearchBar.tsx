"use client";
import { useSearchParams, useRouter } from "next/navigation";

const buttonMain = [
  { label: "Men", type: "male" },
  { label: "Women", type: "female" },
  { label: "Children", type: "children" },
  { label: "Brand", type: "brand" },
  { label: "New", type: "new" },
  { label: "Popular", type: "popular" },
];

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentType = searchParams.get("type");

  const handleFilter = (type: string) => {
    const newUrl = type ? `/shop?type=${type}` : "/shop";
    router.push(newUrl);
  };

  return (
    <section className="mx-4">
      <div className="flex flex-col lg:flex-row lg:justify-between">
        {buttonMain.map((item) => (
          <button
            key={item.type}
            onClick={() => handleFilter(item.type)}
            className={`bg-[#F4F4F4] md:px-4 md:py-2 px-3 py-2 text-[12px] md:text-lg rounded-2xl 
              ${currentType === item.type ? "bg-black text-white" : ""}`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </section>
  );
};

export default SearchBar;
