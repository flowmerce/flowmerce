'use client';
import { useEffect } from 'react';
import Image, { type StaticImageData } from 'next/image';
import { motion, useCycle } from 'framer-motion';
import bagletImageSrc from 'public/images/baglet.png';
import nikeImageSrc from 'public/images/nike.png';

const PRODUCTS = [
    {
        imageSrc: bagletImageSrc,
        name: 'Сумка BG117',
        brand: 'Baglet',
        price: '₴6100',
    },
    {
        imageSrc: nikeImageSrc,
        name: 'Giannis Freak 7 Ignition',
        brand: 'Nike',
        price: '€ 114,99',
    },
];

interface ProductCardProps {
    imageSrc: StaticImageData;
    name: string;
    brand: string;
    price: string;
}

const ProductCard = ({ imageSrc, name, brand, price }: ProductCardProps) => {
    return (
        <motion.div
            key={`${brand}-${name}`}
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="flex flex-col gap-3 w-[300px] h-[460px] p-3 bg-white rounded-lg shadow-2xl"
        >
            <Image
                className="rounded-md"
                src={imageSrc.src}
                width={imageSrc.width}
                height={imageSrc.height}
                alt={`${brand} | ${name}`}
            />
            <div className="flex flex-col gap-1 text-black">
                <div className="font-bold text-xl text-gray-800">{brand}</div>
                <div className="text-sm text-gray-600 leading-tight">
                    {name}
                </div>
                <div className="font-semibold text-lg text-primary">
                    {price}
                </div>
            </div>
        </motion.div>
    );
};

const ProductCards = () => {
    const [currentProductIndex, cycleProduct] = useCycle(0, 1);

    useEffect(() => {
        const interval = setInterval(() => {
            cycleProduct();
        }, 6000);

        return () => clearInterval(interval);
    }, [cycleProduct]);

    const currentProduct = PRODUCTS[currentProductIndex];

    return (
        <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
        >
            <ProductCard {...currentProduct} />
        </motion.div>
    );
};

export default ProductCards;
