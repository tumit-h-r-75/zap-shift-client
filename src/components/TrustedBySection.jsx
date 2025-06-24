import React from 'react';
import Marquee from 'react-fast-marquee';

// Dummy images – replace with your actual 7 images
import img1 from '../assets/brands/amazon.png';
import img2 from '../assets/brands/start.png';
import img3 from '../assets/brands/casio.png';
import img4 from '../assets/brands/amazon_vector.png';
import img5 from '../assets/brands/randstad.png';
import img6 from '../assets/brands/start-people 1.png';
import img7 from '../assets/brands/moonstar.png';

const TrustedBySection = () => {
  const logos = [img1, img2, img3, img4, img5, img6, img7];

  return (
    <section className="py-16 text-center">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl  font-semibold mb-20 text-gray-800">
          We've helped thousands of sales teams
        </h2>
        <Marquee direction="right" speed={60} pauseOnHover={true} gradient={false}>
          {logos.map((img, index) => (
            <div key={index} className="mx-20 ">
              <img
                src={img}
                alt={`brand-${index + 1}`}
                className="h-8 w-40 object-contain"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default TrustedBySection;
