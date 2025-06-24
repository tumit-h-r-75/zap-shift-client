import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa";

const faqs = [
    {
        question: "How does this posture corrector work?",
        answer:
            "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine...",
    },
    {
        question: "Is it suitable for all ages and body types?",
        answer:
            "Yes, the posture corrector is adjustable and designed to fit individuals of various ages and body types...",
    },
    {
        question: "Does it really help with back pain and posture improvement?",
        answer:
            "Absolutely. Regular use of the posture corrector trains your muscles and spine to align correctly...",
    },
    {
        question: "Does it have smart features like vibration alerts?",
        answer:
            "Some models come with vibration sensors that alert you when you slouch...",
    },
    {
        question: "How will I be notified when the product is back in stock?",
        answer:
            "You can subscribe to restock alerts on the product page...",
    },
    {
        question: "Can I wear it under my clothes?",
        answer:
            "Yes, the posture corrector is lightweight and discreet enough to wear under most types of clothing...",
    },
    {
        question: "How long should I wear it each day?",
        answer:
            "Start with 15–30 minutes a day and gradually increase the duration...",
    },
];

const FaqSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(index === openIndex ? null : index);
    };

    return (
        <section className="py-16 px-4 md:px-16">
            <div className="max-w-4xl mx-auto text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                    Frequently Asked Questions (FAQ)
                </h2>
                <p className="text-sm md:text-base text-gray-500">
                    Enhance posture, mobility, and well-being effortlessly with Posture Pro.
                </p>
            </div>

            {/* Accordion */}
            <div className="max-w-3xl mx-auto space-y-3">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className={`border rounded-xl px-6 py-4 transition-all duration-300 ${openIndex === index ? "bg-[#E7F7F6] border-[#45C6B5]" : "bg-white border-gray-200"
                            }`}
                    >
                        <div
                            onClick={() => toggleFAQ(index)}
                            className="cursor-pointer flex justify-between items-center text-left"
                        >
                            <h4 className="text-[15px] font-semibold text-gray-800">
                                {faq.question}
                            </h4>
                            <FiChevronDown
                                className={`text-xl transform transition-transform duration-300 ${openIndex === index ? "rotate-180 text-[#45C6B5]" : ""
                                    }`}
                            />
                        </div>
                        {openIndex === index && (
                            <p className="mt-3 text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                        )}
                    </div>
                ))}
            </div>

            {/* Button */}
            <div className="flex justify-center items-center mt-10">
                <button className="btn bg-lime-400 hover:bg-lime-500 text-black px-6 py-2 rounded-full flex items-center gap-2">
                    See More FAQ’s
                </button>
                <button className="bg-black text-white p-2 rounded-full -rotate-45 transition-transform -ml-4 ">
                    <FaArrowRight size={16} />
                </button>
            </div>
        </section>
    );
};

export default FaqSection;
