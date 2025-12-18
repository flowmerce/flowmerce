import type { FC, PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { Inter } from 'next/font/google';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import { cn } from 'src/utils/tailwind';
import type { PageProps } from 'src/types/route';
import './globals.css';

const interFont = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Flowmerce',
    description:
        'Flowmerce | Upload your products to marketplaces and social media platforms',
};

const LocaleLayout: FC<PropsWithChildren & PageProps> = async ({
    params,
    children,
}) => {
    const { locale } = await params;

    return (
        <html className="scroll-smooth" lang={locale}>
            <body className={cn('relative', interFont.className)}>
                <NextIntlClientProvider>
                    <Header />
                    <main className="pt-header">{children}</main>
                    <Footer />
                </NextIntlClientProvider>
            </body>
        </html>
    );
};

export default LocaleLayout;
