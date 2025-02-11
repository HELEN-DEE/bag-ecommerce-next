
import Image from 'next/image'
import nikeLogo from '../../public/nike-logo.png'
import etsyLogo from '../../public/etsy-logo.png'
import reebokLogo from '../../public/reebok-logo.png'
import pumaLogo from '../../public/puma-logo.png'
import asosLogo from '../../public/asos-logo.png'
import ebayLogo from '../../public/ebay-logo.png'
import zaraLogo from '../../public/zara-logo.png'
import adidasLogo from '../../public/adidas-logo.png'

const logos = [
    {src: nikeLogo, alt: 'Nike Logo'},
    {src: etsyLogo, alt: 'Etsy Logo'},
    {src: reebokLogo, alt: 'Reebok Logo'},
    {src: pumaLogo, alt: 'Puma Logo'},
    {src: asosLogo, alt: 'Asos Logo'},
    {src: ebayLogo, alt: 'Ebay Logo'},
    {src: zaraLogo, alt: 'Zara Logo'},
    {src: adidasLogo, alt: 'Adidas Logo'},
]

const BrandSupport = () => {
  return (
    <section className='mx-4'>
        <div className='text-center py-4'>
            <h1 className='text-4xl capitalize my-8'>
                We are supported by
            </h1>
            <div className='grid grid-cols-2  lg:grid-cols-4 gap-2 justify-items-center'>
                {logos.map((logo, index) => (
                    <div key={index} className='bg-[#F4F4F4] px-16 py-2 flex justify-center items-center rounded-xl'>
                        <Image src={logo.src} alt={logo.alt} className='lg:w-[80%]' />
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}

export default BrandSupport