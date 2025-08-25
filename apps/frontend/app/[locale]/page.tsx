import HeroSection from 'src/components/sections/HeroSection';
import PricingSection from 'src/components/sections/PricingSection';

const Home = () => {
    return (
        <div className="grid gap-40">
            <HeroSection />
            <PricingSection />
        </div>
    );
};

export default Home;
