'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import ProductCards from 'src/components/sections/HeroSection/ProductCards';
import Services from 'src/components/sections/HeroSection/Services';

const HeroSection = () => {
    const t = useTranslations('hero');

    return (
        <div className="container mx-auto h-screen">
            <motion.div
                className="text-center text-white pt-20"
                initial={{ opacity: 0, y: -300 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
            >
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    {t('title')}
                </h1>
                <p className="text-xl md:text-xl text-muted max-w-2xl mx-auto px-10">
                    {t('subtitle')}
                </p>
            </motion.div>

            <div className="relative flex items-center justify-between m-20">
                <ProductCards />
                <Services />
            </div>
        </div>
    );
};

export default HeroSection;
