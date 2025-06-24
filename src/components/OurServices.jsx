import React from 'react';
import {
    FaTruck,
    FaGlobeAsia,
    FaWarehouse,
    FaMoneyBillWave,
    FaBuilding,
    FaUndo,
} from 'react-icons/fa';

const services = [
    {
        title: 'Express & Standard Delivery',
        description:
            'We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.',
        icon: <FaTruck className="text-4xl mx-auto mb-4" />,
        animation: 'fade-up',
    },
    {
        title: 'Nationwide Delivery',
        description:
            'We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.',
        icon: <FaGlobeAsia className="text-4xl mx-auto mb-4" />,
        animation: 'fade-down',
    },
    {
        title: 'Fulfillment Solution',
        description:
            'We also offer customized service with inventory management support, online order processing, packaging, and after sales support.',
        icon: <FaWarehouse className="text-4xl mx-auto mb-4" />,
        animation: 'zoom-in',
    },
    {
        title: 'Cash on Home Delivery',
        description:
            '100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.',
        icon: <FaMoneyBillWave className="text-4xl mx-auto mb-4" />,
        animation: 'flip-left',
    },
    {
        title: 'Corporate Service / Contract In Logistics',
        description:
            'Customized corporate services which includes warehouse and inventory management support.',
        icon: <FaBuilding className="text-4xl mx-auto mb-4" />,
        animation: 'flip-right',
    },
    {
        title: 'Parcel Return',
        description:
            'Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.',
        icon: <FaUndo className="text-4xl mx-auto mb-4" />,
        animation: 'fade-up-right',
    },
];

const OurServices = () => {
    return (
        <section className="py-16 bg-[#003333] rounded-3xl text-white">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Our Services</h2>
                <p className="text-center text-sm md:text-base text-gray-200 max-w-2xl mx-auto mb-10">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to
                    business shipments — we deliver on time, every time.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((item, index) => (
                        <div
                            key={index}
                            data-aos={item.animation}
                            data-aos-duration="800"
                            className={`cursor-pointer rounded-lg p-6 h-full bg-white text-gray-800 shadow transition 
                                hover:bg-[#D3F36B] hover:text-black hover:shadow-lg duration-300`}
                        >
                            {item.icon}
                            <h3 className="text-lg font-semibold text-center mb-2">{item.title}</h3>
                            <p className="text-sm text-center">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurServices;
