import { defineRouting } from 'next-intl/routing';

export const DEFAULT_LOCALE = 'uk';
export const LOCALES = [DEFAULT_LOCALE, 'ru', 'en'];

export const routing = defineRouting({
    locales: LOCALES,
    defaultLocale: DEFAULT_LOCALE,
});
