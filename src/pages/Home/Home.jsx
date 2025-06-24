import React from 'react';
import BannerCarousel from '../../components/BannerCarousel';
import HowItWorks from '../../components/HowItWorks';
import OurServices from '../../components/OurServices';
import TrustedBySection from '../../components/TrustedBySection';
import FeaturesSection from '../../components/FeaturesSection';
import CusetomarServise from '../../components/CusetomarServise';
import TestimonialsSection from '../../components/TestimonialsSection';
import FaqSection from '../../components/FaqSection';


const Home = () => {
    return (
        <div>
            <section className='max-w-7xl mx-auto mt-10 mb-24 '>
                <BannerCarousel ></BannerCarousel>
            </section>
            <section className='max-w-7xl mx-auto my-24'>
                <HowItWorks></HowItWorks>
            </section>
            <section className='max-w-7xl mx-auto my-24'>
                <OurServices></OurServices>
            </section>
            <section className='max-w-7xl mx-auto my-24'>
                <TrustedBySection></TrustedBySection>
            </section>
            <section className='max-w-7xl mx-auto my-24'>
                <FeaturesSection></FeaturesSection>
            </section>
            <section className='max-w-7xl mx-auto my-24'>
                <CusetomarServise></CusetomarServise>
            </section>
            <section className='max-w-7xl mx-auto my-24'>
                <TestimonialsSection></TestimonialsSection>
            </section>
            <section className='max-w-7xl mx-auto my-24'>
                <FaqSection></FaqSection>
            </section>
            
        </div>
    );
};

export default Home;