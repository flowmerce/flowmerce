import type { FC } from 'react';
import { cn } from 'src/utils/tailwind';

interface GradientSubstrateProps {
    hover?: boolean;
    active?: boolean;
    variant?: 'default' | 'accent';
}

const BACKGROUND_MAPPING: Record<
    NonNullable<GradientSubstrateProps['variant']>,
    string
> = {
    default: 'bg-gradient-to-br from-sky-500 to-indigo-700',
    accent: 'bg-gradient-to-br from-teal-400 via-violet-600 to-indigo-600',
};

const GradientSubstrate: FC<GradientSubstrateProps> = ({
    hover = false,
    active = false,
    variant = 'default',
}) => {
    return (
        <div
            className={cn(
                'absolute size-full inset-0 rounded-md',
                (hover || active) &&
                    'opacity-0 transition-opacity duration-300',
                hover && 'lg:group-hover:opacity-100',
                active && 'group-active:opacity-100',
                BACKGROUND_MAPPING[variant]
            )}
        />
    );
};

export default GradientSubstrate;
