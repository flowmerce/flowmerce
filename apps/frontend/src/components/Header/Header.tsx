import { useTranslations } from 'next-intl';
import { Link } from 'src/i18n/navigation';
import Button from 'src/components/ui/Button';
import Logo from 'public/images/logo.svg';
import {
    HOME,
    CONTACTS,
    DEVELOPERS,
    PRICING_SECTION,
} from 'src/constants/routes';

const Header = () => {
    const t = useTranslations();

    return (
        <header className="fixed top-0 z-10 w-full h-header bg-bg">
            <div className="container flex justify-between items-center mx-auto h-full">
                <Link href={HOME}>
                    <Logo className="h-6" />
                </Link>

                <nav className="absolute-center max-md:hidden flex gap-4 text-muted text-sm">
                    <Link
                        className="py-2 px-3 rounded-full lg:hover:text-text transition-colors"
                        href={CONTACTS}
                    >
                        {t('contacts')}
                    </Link>
                    <Link
                        className="py-2 px-3 rounded-full lg:hover:text-text transition-colors"
                        href={DEVELOPERS}
                    >
                        {t('developers')}
                    </Link>
                    <Link
                        className="py-2 px-3 rounded-full lg:hover:text-text transition-colors"
                        href={`#${PRICING_SECTION}`}
                    >
                        {t('pricing')}
                    </Link>
                </nav>

                <div className="flex gap-5">
                    <Button inline size="sm" variant="highlighted">
                        {t('tryForFree')}
                    </Button>
                    <Button inline size="sm">
                        {t('signIn')}
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;
