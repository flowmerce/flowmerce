'use client';
import { useEffect, useState, type FC } from 'react';
import Image, { type StaticImageData } from 'next/image';
import { motion } from 'framer-motion';
import { cn } from 'src/utils/tailwind';

// @ts-ignore
import rozetkaImageSrc from 'public/images/rozetka.svg?url';
// @ts-ignore
import epicenterImageSrc from 'public/images/epicenter.svg?url';
// @ts-ignore
import promImageSrc from 'public/images/prom.svg?url';
// @ts-ignore
import kastaImageSrc from 'public/images/kasta.svg?url';
// @ts-ignore
import pinterestImageSrc from 'public/images/pinterest.svg?url';
// @ts-ignore
import instagramImageSrc from 'public/images/instagram.png';

const SERVICES = [
    { name: 'Rozetka', logo: rozetkaImageSrc, className: '-mt-18' },
    { name: 'Instagram', logo: instagramImageSrc, className: 'mr-[25vw] h-14' },
    { name: 'Epicenter', logo: epicenterImageSrc, className: 'mr-[12vw]' },
    { name: 'Prom Ua', logo: promImageSrc, className: 'mr-[2vw]' },
    { name: 'Kasta', logo: kastaImageSrc, className: 'mr-[25vw] h-14' },
    {
        name: 'Pinterest',
        logo: pinterestImageSrc,
        className: 'mr-[10vw] -mb-15',
    },
];

interface ServiceLogoProps {
    index: number;
    isLastIndex: boolean;
    className?: string;
    image: StaticImageData;
    name: string;
}

interface AnimatedPathProps {
    d: string;
    duration?: number;
}

const AnimatedPath: FC<AnimatedPathProps> = ({ d, duration = 5 }) => {
    const [pathElement, setPathElement] = useState<SVGPathElement | null>(null);
    const [pathLength, setPathLength] = useState(0);

    useEffect(() => {
        if (pathElement) {
            setPathLength(pathElement.getTotalLength());
        }
    }, [pathElement]);

    return (
        <>
            <path
                ref={setPathElement}
                stroke="#fff"
                strokeOpacity=".1"
                strokeWidth="2"
                d={d}
            />

            <motion.path
                stroke="var(--color-primary)"
                strokeWidth="2"
                strokeLinecap="round"
                fill="transparent"
                d={d}
                strokeDasharray={`10 ${pathLength}`}
                strokeDashoffset={0}
                animate={{ strokeDashoffset: -pathLength }}
                transition={{ duration, repeat: Infinity, ease: 'linear' }}
            />
        </>
    );
};

const Service: FC<ServiceLogoProps> = ({
    index,
    isLastIndex,
    image,
    name,
    className,
}) => {
    return (
        <motion.div
            className="flex items-center"
            key={name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
        >
            {!index && (
                <svg
                    className="scale-x-[1] scale-y-[-1]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 1200 102"
                >
                    <AnimatedPath
                        d="M0 1h567.693C620 2 660-4.124 660 16.68v69.031c0 18.913 50.236 14.942 100.507 14.942H1200"
                        duration={12}
                    />
                </svg>
            )}

            {isLastIndex && (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 1200 102"
                >
                    <AnimatedPath
                        d="M0 1h567.693C620 2 660-4.124 660 16.68v69.031c0 18.913 50.236 14.942 100.507 14.942H1200"
                        duration={10}
                    />
                </svg>
            )}

            {!!index && !isLastIndex && (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 1200 2"
                >
                    <AnimatedPath d="M0 1h1200" duration={index + 6} />
                </svg>
            )}

            <div
                className={cn(
                    'flex-center shrink-0 h-10 max-w-40 p-2 bg-white rounded-lg shadow-lg',
                    className
                )}
            >
                <Image
                    className="h-full w-auto"
                    src={image.src}
                    width={image.width}
                    height={image.height}
                    alt={name}
                />
            </div>
        </motion.div>
    );
};

const Services = () => {
    return (
        <div className="flex flex-col grow gap-5">
            {SERVICES.map((service, index) => (
                <Service
                    index={index}
                    isLastIndex={index === SERVICES.length - 1}
                    key={service.name}
                    className={service.className}
                    image={service.logo}
                    name={service.name}
                />
            ))}
        </div>
    );
};

export default Services;
