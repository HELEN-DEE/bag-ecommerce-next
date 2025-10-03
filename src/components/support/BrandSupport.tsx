
import Image from 'next/image'
import nikeLogo from '../../../public/logo-images/nike-logo.png';
import etsyLogo from '../../../public/logo-images/etsy-logo.png';
import reebokLogo from '../../../public/logo-images/reebok-logo.png';
import pumaLogo from '../../../public/logo-images/puma-logo.png';
import asosLogo from '../../../public/logo-images/asos-logo.png';
import ebayLogo from '../../../public/logo-images/ebay-logo.png';
import zaraLogo from '../../../public/logo-images/zara-logo.png';
import adidasLogo from '../../../public/logo-images/adidas-logo.png';

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
    <section className='mx-4 -my-10 '>
        <div className='text-center py-4'>
            <h1 className='text-4xl capitalize my-6 '>
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