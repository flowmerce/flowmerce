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

/* ---------- DATA ---------- */
const SERVICES = [
  { name: 'Rozetka', logo: rozetkaImageSrc, className: 'mt-20 md:-mt-18' },
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

/* ---------- MOBILE DETECT ---------- */
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isMobile;
};

/* ---------- PATHS ---------- */
// изогнутый путь (крайние линии)
const DESKTOP_CURVED_PATH =
  'M0 1h567.693C620 2 660-4.124 660 16.68v69.031c0 18.913 50.236 14.942 100.507 14.942H1200';

// прямой путь (4 центральные линии)
const DESKTOP_STRAIGHT_PATH = 'M0 51 H1200';

// mobile paths
const MOBILE_PATHS = [
  'M100 0 V220',
  'M200 0 V160 H80',
  'M160 0 V200 H120',
  'M160 0 V240 H160',
  'M160 0 V280 H200',
  'M160 0 V320 H240',
];

// какие линии считаем центральными (из 6 → 1–4)
const isCenterDesktopLine = (index: number) =>
  index >= 1 && index <= 4;

/* ---------- SVG PATH ---------- */
interface AnimatedPathProps {
  d: string;
  duration?: number;
}

const AnimatedPath: FC<AnimatedPathProps> = ({ d, duration = 6 }) => {
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
        d={d}
        stroke="var(--color-primary)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="transparent"
        strokeDasharray={`10 ${pathLength}`}
        animate={{ strokeDashoffset: -pathLength }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      />
    </>
  );
};

/* ---------- SERVICE ---------- */
interface ServiceProps {
  index: number;
  isLastIndex: boolean;
  className?: string;
  image: StaticImageData;
  name: string;
  isMobile: boolean;
}

const Service: FC<ServiceProps> = ({
  index,
  image,
  name,
  className,
  isMobile,
}) => {
  const path = isMobile
    ? MOBILE_PATHS[index]
    : isCenterDesktopLine(index)
    ? DESKTOP_STRAIGHT_PATH
    : DESKTOP_CURVED_PATH;

  return (
    <motion.div
      className="flex items-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox={isMobile ? '0 0 300 350' : '0 0 1200 102'}
        className={cn(
          isMobile
            ? 'absolute left-1/2 -translate-x-1/2 top-0'
            : !isCenterDesktopLine(index) && index === 0
            ? 'scale-y-[-1]'
            : ''
        )}
      >
        <AnimatedPath d={path} duration={6 + index} />
      </svg>

      <div
        className={cn(
          'relative z-10 flex-center shrink-0 h-10 max-w-40 p-2 bg-white rounded-lg shadow-lg',
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

/* ---------- MAIN ---------- */
const Services = () => {
  const isMobile = useIsMobile();

  return (
    <div className="relative flex justify-center flex-col grow gap-6">
      {SERVICES.map((service, index) => (
        <Service
          key={service.name}
          index={index}
          isLastIndex={index === SERVICES.length - 1}
          isMobile={isMobile}
          className={service.className}
          image={service.logo}
          name={service.name}
        />
      ))}
    </div>
  );
};

export default Services;
