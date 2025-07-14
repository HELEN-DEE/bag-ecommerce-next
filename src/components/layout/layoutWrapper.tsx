'use client'

import { usePathname } from 'next/navigation'
import Navbar from '../navigation/Navbar'
import SearchBar from '../navigation/SearchBar'
import Footer from '../footer/Footer'

export const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()

    // Hide SearchBar and Footer only on auth pages
    const isAuthPage = pathname.startsWith('/auth')

return (
        <>
        <Navbar />
        {!isAuthPage && <SearchBar />}
        <main>{children}</main>
        {!isAuthPage && <Footer />}
        </>
    )
}
