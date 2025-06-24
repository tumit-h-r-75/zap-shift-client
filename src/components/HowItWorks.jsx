import React from 'react';
import {
  FaTruckPickup,
  FaMoneyBillWave,
  FaWarehouse,
  FaBriefcase
} from 'react-icons/fa';

const features = [
  {
    icon: <FaTruckPickup className="text-3xl text-green-600" />,
    title: 'Booking Pick & Drop',
    desc: 'From personal packages to business shipments — we deliver on time, every time',
    animation: 'fade-up',
  },
  {
    icon: <FaMoneyBillWave className="text-3xl text-green-600" />,
    title: 'Cash On Delivery',
    desc: 'From personal packages to business shipments — we deliver on time, every time',
    animation: 'fade-down',
  },
  {
    icon: <FaWarehouse className="text-3xl text-green-600" />,
    title: 'Delivery Hub',
    desc: 'From personal packages to business shipments — we deliver on time, every time',
    animation: 'zoom-in',
  },
  {
    icon: <FaBriefcase className="text-3xl text-green-600" />,
    title: 'Booking SME & Corporate',
    desc: 'From personal packages to business shipments — we deliver on time, every time',
    animation: 'flip-left',
  },
];

const HowItWorks = () => {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
          How it Works
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((item, index) => (
            <div
              key={index}
              data-aos={item.animation}
              data-aos-duration="800"
              className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition"
            >
              <div className="mb-4 flex justify-center">{item.icon}</div>
              <h3 className="text-lg font-semibold mb-2 text-gray-700">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
