// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";

// type Product = {
//   id: number;
//   name: string;
//   type: string;
// };

// const Shop = () => {
//   const router = useRouter();
//   const { type } = router.query; // Read 'type' from URL
//   const [products, setProducts] = useState<Product[]>([]);

//   // Example product list (replace with API call)
//   const allProducts: Product[] = [
//     { id: 1, name: "Men’s Bag", type: "male" },
//     { id: 2, name: "Women’s Bag", type: "female" },
//     { id: 3, name: "Unisex Backpack", type: "unisex" },
//   ];

//   useEffect(() => {
//     if (type) {
//       setProducts(allProducts.filter(p => p.type === type));
//     } else {
//       setProducts(allProducts);
//     }
//   }, [type]);

//   // Function to update the URL without refreshing
//   const handleFilter = (filterType?: string) => {
//     router.push(
//       {
//         pathname: "/shop",
//         query: filterType ? { type: filterType } : {},
//       },
//       undefined,
//       { shallow: true }
//     );
//   };

//   return (
//     <div>
//       <h1>Shop</h1>
//       <button onClick={() => handleFilter("male")}>Men</button>
//       <button onClick={() => handleFilter("female")}>Women</button>
//       <button onClick={() => handleFilter("unisex")}>Unisex</button>
//       <button onClick={() => handleFilter()}>Clear Filter</button>

//       <ul>
//         {products.map(p => (
//           <li key={p.id}>{p.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Shop;
