import RunningBorder from 'src/components/decorations/RunningBorder';
import { PRICING_SECTION } from 'src/constants/routes';

const PricingSection = () => {
    return (
        <div id={PRICING_SECTION} className="container mx-auto h-screen">
            <section className="relative overflow-hidden p-[1px] rounded-lg">
                <RunningBorder duration={10} />

                <div className="relative z-1 flex gap-5 rounded-lg w-full p-10 bg-bg">
                    <div className="flex-1 p-6 rounded-md border">
                        <h3 className="text-xl font-bold text-center">Free</h3>
                        <p className="text-sm text-muted py-6">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. A aperiam beatae culpa cum dignissimos, ex
                            ipsa iste laudantium nihil odio perferendis
                            praesentium sequi unde voluptas, voluptates! A
                            adipisci amet aperiam aspernatur cupiditate delectus
                            dolores doloribus enim facilis, harum hic illo
                            impedit, ipsum laboriosam laudantium maiores minima
                            minus natus nesciunt nihil nobis obcaecati odit
                            officiis pariatur perspiciatis quibusdam quidem quis
                            quo, rerum saepe tempore totam veniam voluptatibus.
                            Aliquam commodi debitis, dolore doloremque doloribus
                            ducimus, inventore maxime officiis, rerum sapiente
                            tenetur totam velit voluptatibus. A ab, aut
                            blanditiis cumque dolorum esse expedita, incidunt
                            iste itaque labore quae quasi recusandae sint sit
                            voluptatibus.
                        </p>
                    </div>
                    <div className="flex-1 p-4 rounded-md border">
                        <h3 className="text-xl font-bold text-center">
                            Buisines
                        </h3>
                        <p className="text-sm text-muted py-6">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. A aperiam beatae culpa cum dignissimos, ex
                            ipsa iste laudantium nihil odio perferendis
                            praesentium sequi unde voluptas, voluptates! A
                            adipisci amet aperiam aspernatur cupiditate delectus
                            dolores doloribus enim facilis, harum hic illo
                            impedit, ipsum laboriosam laudantium maiores minima
                            minus natus nesciunt nihil nobis obcaecati odit
                            officiis pariatur perspiciatis quibusdam quidem quis
                            quo, rerum saepe tempore totam veniam voluptatibus.
                            Aliquam commodi debitis, dolore doloremque doloribus
                            ducimus, inventore maxime officiis, rerum sapiente
                            tenetur totam velit voluptatibus. A ab, aut
                            blanditiis cumque dolorum esse expedita, incidunt
                            iste itaque labore quae quasi recusandae sint sit
                            voluptatibus.
                        </p>
                    </div>
                    <div className="flex-1 p-4 rounded-md border">
                        <h3 className="text-xl font-bold text-center">Pro</h3>
                        <p className="text-sm text-muted py-6">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. A aperiam beatae culpa cum dignissimos, ex
                            ipsa iste laudantium nihil odio perferendis
                            praesentium sequi unde voluptas, voluptates! A
                            adipisci amet aperiam aspernatur cupiditate delectus
                            dolores doloribus enim facilis, harum hic illo
                            impedit, ipsum laboriosam laudantium maiores minima
                            minus natus nesciunt nihil nobis obcaecati odit
                            officiis pariatur perspiciatis quibusdam quidem quis
                            quo, rerum saepe tempore totam veniam voluptatibus.
                            Aliquam commodi debitis, dolore doloremque doloribus
                            ducimus, inventore maxime officiis, rerum sapiente
                            tenetur totam velit voluptatibus. A ab, aut
                            blanditiis cumque dolorum esse expedita, incidunt
                            iste itaque labore quae quasi recusandae sint sit
                            voluptatibus.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PricingSection;
