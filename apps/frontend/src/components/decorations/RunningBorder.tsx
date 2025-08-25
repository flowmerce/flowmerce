'use client';
import type { FC } from 'react';
import { motion } from 'framer-motion';

interface RunningBorderProps {
    duration?: number;
}

const RunningBorder: FC<RunningBorderProps> = ({ duration = 5 }) => {
    return (
        <motion.div
            className="absolute z-0 size-full flex-none inset-0 overflow-hidden rounded-[inherit]"
            style={{
                background:
                    'radial-gradient(20% 50% at 50% 10%, var(--color-primary) 0%, rgba(30, 144, 255, 0) 100%)',
            }}
            animate={{
                background: [
                    'radial-gradient(20% 50% at 50% 10%, var(--color-primary) 0%, rgba(30, 144, 255, 0) 100%)',
                    'radial-gradient(20% 50% at 90% 10%, var(--color-primary) 0%, rgba(30, 144, 255, 0) 100%)',
                    'radial-gradient(20% 50% at 90% 90%, var(--color-primary) 0%, rgba(30, 144, 255, 0) 100%)',
                    'radial-gradient(20% 50% at 50% 90%, var(--color-primary) 0%, rgba(30, 144, 255, 0) 100%)',
                    'radial-gradient(20% 50% at 10% 90%, var(--color-primary) 0%, rgba(30, 144, 255, 0) 100%)',
                    'radial-gradient(20% 50% at 10% 10%, var(--color-primary) 0%, rgba(30, 144, 255, 0) 100%)',
                    'radial-gradient(20% 50% at 50% 10%, var(--color-primary) 0%, rgba(30, 144, 255, 0) 100%)',
                ],
            }}
            transition={{
                repeat: Infinity,
                ease: 'linear',
                duration,
            }}
        />
    );
};

export default RunningBorder;
