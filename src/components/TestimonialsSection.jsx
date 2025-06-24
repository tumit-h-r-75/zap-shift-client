import React, { useState, useEffect } from "react";
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CoustomerTop from "../assets/customer-top.png";

const testimonials = [
    {
        name: "Tanvir Arefin",
        title: "Content Writer",
        message: "Great support and professional attitude!",
        image: "https://i.ibb.co/M5Trd3W/user10.png",
    },
    {
        name: "Rumana Hossain",
        title: "E-commerce Seller",
        message: "Fast delivery and friendly service. Highly recommended!",
        image: "https://i.ibb.co/XCnYcQs/user1.png",
    },
    {
        name: "Farhan Islam",
        title: "Logistics Manager",
        message: "Very reliable and easy to work with!",
        image: "https://i.ibb.co/h9PMQ2G/user2.png",
    },
    {
        name: "Shaila Nahar",
        title: "Entrepreneur",
        message: "The delivery tracking system is super helpful!",
        image: "https://i.ibb.co/wr6Sn7w/user3.png",
    },
    {
        name: "Arif Mahmud",
        title: "Corporate Client",
        message: "Safe, secure, and always on time. Excellent service!",
        image: "https://i.ibb.co/VQXqkPh/user4.png",
    },
    {
        name: "Sadia Jahan",
        title: "Small Business Owner",
        message: "Their COD system helped me grow my sales!",
        image: "https://i.ibb.co/wN5zBDv/user5.png",
    },
    {
        name: "Nafis Rahman",
        title: "Online Shop Manager",
        message: "Super responsive support team. Solved my issue within minutes.",
        image: "https://i.ibb.co/T8YtCcz/user6.png",
    },
    {
        name: "Tania Afrin",
        title: "Clothing Brand Owner",
        message: "Loved their professional attitude and delivery network.",
        image: "https://i.ibb.co/mT1K2Sz/user7.png",
    },
    {
        name: "Rakibul Hasan",
        title: "Wholesaler",
        message: "Their nationwide coverage is truly impressive!",
        image: "https://i.ibb.co/G5rdcg9/user8.png",
    },
    {
        name: "Mitu Chowdhury",
        title: "Handicraft Seller",
        message: "Using Profast made my deliveries stress-free!",
        image: "https://i.ibb.co/9rGTRkj/user9.png",
    },
];

const TestimonialsSection = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    const prevIndex = (current - 1 + testimonials.length) % testimonials.length;
    const nextIndex = (current + 1) % testimonials.length;

    const goPrev = () => setCurrent(prevIndex);
    const goNext = () => setCurrent(nextIndex);

    return (
        <section className="relative py-16 px-4 md:px-16 text-center overflow-hidden">
            <div className="max-w-4xl mx-auto mb-12 z-8 relative">
                <img src={CoustomerTop} alt="icon" className="mx-auto mb-10" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                    What our customers are saying
                </h2>
                <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto">
                    Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
                </p>
            </div>

            {/* Carousel */}
            <div className="relative flex justify-center items-center space-x-6 max-w-6xl mx-auto">


                {/* Cards */}
                <div className="flex gap-4 items-center justify-center transition-all duration-500">
                    {/* Prev Card */}
                    <div className="hidden md:block opacity-40 scale-90 blur-sm transition-all duration-500">
                        <Card data={testimonials[prevIndex]} />
                    </div>

                    {/* Current Card */}
                    <div className="z-9 scale-100 transition-all duration-500">
                        <Card data={testimonials[current]} />
                    </div>

                    {/* Next Card */}
                    <div className="hidden md:block opacity-40 scale-90 blur-sm transition-all duration-500">
                        <Card data={testimonials[nextIndex]} />
                    </div>
                </div>


            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center items-center mt-6 gap-2">
                {/* Left Arrow */}
                <button
                    onClick={goPrev}
                    className="absolute left-76 z-9 bg-white p-2 rounded-full shadow hover:bg-gray-200 transition"
                >
                    <FaChevronLeft />
                </button>

                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-3 h-3 rounded-full border-2 transition ${index === current
                            ? "bg-lime-500 border-lime-500 scale-110"
                            : "border-gray-300"
                            }`}
                    ></button>
                ))}

                {/* Right Arrow */}
                <button
                    onClick={goNext}
                    className="absolute right-76 z-9 bg-white p-2 rounded-full shadow hover:bg-gray-200 transition"
                >
                    <FaChevronRight />
                </button>

            </div>
        </section>
    );
};

const Card = ({ data }) => {
    return (
        <div className="bg-white max-w-xs md:max-w-sm p-6 rounded-xl shadow-md text-left transition-all duration-300">
            <FaQuoteLeft className="text-2xl text-gray-400 mb-4" />
            <p className="text-gray-700 text-sm leading-relaxed mb-6">{data.message}</p>
            <div className="border-t border-gray-200 pt-4 flex items-center gap-4">
                <img
                    src={data.image}
                    alt={data.name}
                    className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                    <h4 className="font-semibold text-gray-800">{data.name}</h4>
                    <span className="text-xs text-gray-500">{data.title}</span>
                </div>
            </div>
        </div>
    );
};

export default TestimonialsSection;
