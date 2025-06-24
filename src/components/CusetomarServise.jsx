import React from "react";
import bgImg from '../assets/be-a-merchant-bg.png';
import innerImg from '../assets/location-merchant.png';

const CusetomarServise = () => (
    <div
        style={{ backgroundImage: `url(${bgImg})` }}
        className="bg-cover bg-[#03373D] bg-center text-white p-28 rounded-xl"
    >
        <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Text Content */}
            <div data-aos="fade-right" data-aos-duration="1000">
                <h2 className="text-2xl font-semibold mb-4">
                    Merchant and Customer Satisfaction is Our First Priority
                </h2>
                <p className="text-sm mb-6 text-white">
                    We offer the lowest delivery charges with the highest value along with
                    100% safety of your product. Profast courier delivers your parcel to every
                    corner of Bangladesh right on time.
                </p>
                <div className="flex gap-4 flex-wrap">
                    <button className="text-[#D2FF4F] border px-5 py-2 rounded-full font-medium shadow hover:bg-[#D2FF4F] hover:text-gray-950">
                        Become a Merchant
                    </button>
                    <button className="text-[#D2FF4F] border px-5 py-2 rounded-full font-medium shadow hover:bg-[#D2FF4F] hover:text-gray-950">
                        Earn with Profast Courier
                    </button>
                </div>
            </div>

            {/* Image Content */}
            <div
                className="flex justify-center"
                data-aos="fade-left"
                data-aos-duration="1000"
            >
                <img src={innerImg} alt="box" className="w-64 h-auto object-contain" />
            </div>
        </div>
    </div>
);

export default CusetomarServise;
