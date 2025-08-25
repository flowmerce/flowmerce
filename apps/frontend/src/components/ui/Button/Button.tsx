import { forwardRef, type HTMLAttributes } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import RunningBorder from 'src/components/decorations/RunningBorder';
import GradientSubstrate from 'src/components/decorations/GradientSubstrate';

export const button = tv({
    slots: {
        root: 'relative flex-center min-w-30 h-fit overflow-hidden active:scale-95 rounded-full group cursor-pointer transition-all duration-300',
        inner: 'relative z-1 flex-center gap-2 w-full text-text font-medium rounded-full',
    },
    variants: {
        variant: {
            primary: {
                root: 'active:brightness-110 lg:hover:brightness-110',
            },
            highlighted: {
                root: 'p-[1px] lg:p-[2px]',
                inner: 'border bg-bg',
            },
        },
        size: {
            sm: {
                inner: 'h-[36px] px-5 text-xs',
            },
            md: {
                inner: 'h-[44px] px-6 text-sm',
            },
        },
        inline: {
            true: '',
            false: {
                root: 'w-full',
            },
        },
    },
    defaultVariants: {
        variant: 'primary',
        size: 'md',
        inline: false,
    },
});

interface ButtonProps
    extends HTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof button> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, size, variant = 'primary', inline, ...restProps }, ref) => {
        const buttonClasses = button({ size, variant, inline });

        return (
            <button className={buttonClasses.root()} ref={ref} {...restProps}>
                {variant === 'primary' && <GradientSubstrate />}
                {variant === 'highlighted' && (
                    <>
                        <RunningBorder />
                        <GradientSubstrate active hover />
                    </>
                )}
                <div className={buttonClasses.inner()}>{children}</div>
            </button>
        );
    }
);

Button.displayName = 'Button';

export default Button;
