import Image from "next/image";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";
import BrandSupport from "../components/BrandSupport";
import Products from "../components/Products";

export default function Home() {
  return (
    <div>
      <Navbar />
      <SearchBar />
      <Header />
      <BrandSupport/>
      <Products/>

      
    </div>
  );
}
