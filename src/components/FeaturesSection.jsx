import React from "react";
import liveTracking from '../assets/live-tracking.png';
import safeDelevery from '../assets/safe-delivery.png';
import callCenterSupport from '../assets/Call-Center-Support.avif';

const features = [
    {
        img: liveTracking,
        title: "Live Parcel Tracking",
        description:
            "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
        anumation: "flip-left"
    },
    {
        img: safeDelevery,
        title: "100% Safe Delivery",
        description:
            "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
        anumation: "slide-right"
    },
    {
        img: callCenterSupport,
        title: "24/7 Call Center Support",
        description:
            "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
        anumation: "flip-left"
    },
];

const FeaturesSection = () => (
    <div >
        {features.map((feature, index) => (
            <div
            data-aos={feature.anumation}
                className="bg-white p-6 md:p-10 rounded-2xl my-8 shadow-md"
                key={index}>
                <div className="flex justify-center md:flex-row flex-col gap-6 items-start md:items-center">
                    <img
                        src={feature.img}
                        alt={feature.title}
                        className="w-28 min-w-[7rem] h-auto object-contain"
                    />

                    <div className="hidden md:flex h-24 mx-4 border-l border-dashed border-gray-400"></div>

                    <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {feature.title}
                        </h3>
                        <p className="text-[15px] text-gray-600 leading-relaxed max-w-2xl">
                            {feature.description}
                        </p>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

export default FeaturesSection;
