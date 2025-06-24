import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CarouselImg1 from '../assets/banner/banner1.png'
import CarouselImg2 from '../assets/banner/banner2.png'
import CarouselImg3 from '../assets/banner/banner3.png'

const BannerCarousel  = () => {
    return (
        <div>
            <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false}>
                <div>
                    <img src={CarouselImg1} />
                    {/* <p className="legend">Legend 1</p> */}
                </div>
                <div>
                    <img src={CarouselImg2} />
                    {/* <p className="legend">Legend 2</p> */}
                </div>
                <div>
                    <img src={CarouselImg3} />
                    {/* <p className="legend">Legend 3</p> */}
                </div>
            </Carousel>
        </div>
    );
};

export default BannerCarousel ;