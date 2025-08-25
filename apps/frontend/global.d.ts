import { routing } from 'src/i18n/routing';
import { formats } from 'src/i18n/request';
import messages from 'src/i18n/messages/en.json';

declare module 'next-intl' {
    interface AppConfig {
        Locale: (typeof routing.locales)[number];
        Messages: typeof messages;
        Formats: typeof formats;
    }
}

declare module '*.svg' {
    import { FC, SVGProps } from 'react';
    const content: FC<SVGProps<SVGElement>>;
    export default content;
}

declare module '*.svg?url' {
    const content: never;
    export default content;
}
