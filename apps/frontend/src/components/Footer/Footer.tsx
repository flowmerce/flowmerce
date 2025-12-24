import { Link } from 'src/i18n/navigation';
import Logo from 'public/images/logo.svg';
import {
    HOME,
    CONTACTS,
    DEVELOPERS,
    PRIVACY_POLICY,
    TERMS_OF_SERVICE,
    COOKIE_POLICY,
} from 'src/constants/routes';
import { Facebook, Twitter, LinkedIn, Instagram } from 'src/components/icons/SocialIcons';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-[var(--color-bg)] border-t border-[var(--color-border)]">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    
                    <div className="space-y-4">
                        <Link href={HOME} className="inline-block">
                            <Logo className="h-8 text-[var(--color-text)]" />
                        </Link>
                        <p className="text-[var(--color-muted)] text-sm max-w-xs">
                            Create, manage, and scale your business with our solutions.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" aria-label="Facebook" className="text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" aria-label="Twitter" className="text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" aria-label="LinkedIn" className="text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors">
                                <LinkedIn className="h-5 w-5" />
                            </a>
                            <a href="#" aria-label="Instagram" className="text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors">
                                <Instagram className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                  
                    <div>
                        <h3 className="font-semibold text-[var(--color-text)] mb-4">Navigation</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href={HOME}
                                    className="text-[var(--color-muted)] hover:text-[var(--color-text)] text-sm transition-colors"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={CONTACTS}
                                    className="text-[var(--color-muted)] hover:text-[var(--color-text)] text-sm transition-colors"
                                >
                                    Contacts
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={DEVELOPERS}
                                    className="text-[var(--color-muted)] hover:text-[var(--color-text)] text-sm transition-colors"
                                >
                                    Developers
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="#pricing"
                                    className="text-[var(--color-muted)] hover:text-[var(--color-text)] text-sm transition-colors"
                                >
                                    Pricing
                                </a>
                            </li>
                        </ul>
                    </div>

                   
                    <div>
                        <h3 className="font-semibold text-[var(--color-text)] mb-4">Support</h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="text-[var(--color-muted)] hover:text-[var(--color-text)] text-sm transition-colors"
                                >
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-[var(--color-muted)] hover:text-[var(--color-text)] text-sm transition-colors"
                                >
                                    Documentation
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-[var(--color-muted)] hover:text-[var(--color-text)] text-sm transition-colors"
                                >
                                    Community
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-[var(--color-muted)] hover:text-[var(--color-text)] text-sm transition-colors"
                                >
                                    Blog
                                </a>
                            </li>
                        </ul>
                    </div>

                  
                    <div>
                        <h3 className="font-semibold text-[var(--color-text)] mb-4">Contact Us</h3>
                        <ul className="space-y-2">
                            <li className="text-[var(--color-muted)] text-sm">
                                Email: info@flowmerce.com
                            </li>
                            <li className="text-[var(--color-muted)] text-sm">
                                Phone: +38 (057) 123-4567
                            </li>
                            <li className="text-[var(--color-muted)] text-sm">
                                Address: Kharkiv, Sergeya Oreshkova Street, building 5, apartment 6 
                            </li>
                        </ul>
                    </div>
                </div>

    

                <div className="border-t border-[var(--color-border)] my-8"></div>

         
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-[var(--color-muted)] text-sm mb-4 md:mb-0">
                        © {currentYear} Your Company. All rights reserved.
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                        <Link
                            href={PRIVACY_POLICY}
                            className="text-[var(--color-muted)] hover:text-[var(--color-text)] text-sm transition-colors"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href={TERMS_OF_SERVICE}
                            className="text-[var(--color-muted)] hover:text-[var(--color-text)] text-sm transition-colors"
                        >
                            Terms of Service
                        </Link>
                        <Link
                            href={COOKIE_POLICY}
                            className="text-[var(--color-muted)] hover:text-[var(--color-text)] text-sm transition-colors"
                        >
                            Cookie Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;