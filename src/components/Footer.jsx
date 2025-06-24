import React from "react";
import { FaLinkedinIn, FaXTwitter, FaFacebookF, FaYoutube, } from "react-icons/fa6";
import footerLogo from "../assets/logo.png";

const Footer = () => {
    const footerLinks = [
        "Services",
        "Coverage",
        "About Us",
        "Pricing",
        "Blog",
        "Contact",
    ];

    return (
        <footer className="bg-black  text-white rounded-t-3xl mx-2 px-4 py-10 md:py-14">
            <div className=" text-center space-y-6">
                {/* Logo & Description */}
                <div className="flex justify-center items-center -space-x-4 md:-space-x-5">
                    <img
                        src={footerLogo}
                        alt="Profast Logo"
                        className="w-10 h-10 md:w-12 md:h-12 object-contain -mt-1"
                    />
                    <span className="text-xl md:text-3xl font-bold tracking-tight text-white mt-5">
                        Profast
                    </span>
                </div>
                <p className="max-w-xl mx-auto text-sm md:text-base text-gray-300 leading-relaxed">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time
                </p>

                {/* Divider */}
                <hr className="border-t border-dashed border-gray-600 mx-auto w-3/4" />

                {/* Navigation Links */}
                <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-sm md:text-base pt-2">
                    {footerLinks.map((item, index) => (
                        <a key={index} href="#" className="hover:text-lime-400 transition">
                            {item}
                        </a>
                    ))}
                </div>

                {/* Divider */}
                <hr className="border-t border-dashed border-gray-600 mx-auto w-3/4" />

                {/* Social Icons */}
                <div className="flex justify-center gap-5 pt-3 text-lg">
                    <a href="#" className="hover:text-lime-400 transition">
                        <FaLinkedinIn />
                    </a>
                    <a href="#" className="hover:text-lime-400 transition">
                        <FaXTwitter />
                    </a>
                    <a href="#" className="hover:text-lime-400 transition">
                        <FaFacebookF />
                    </a>
                    <a href="#" className="hover:text-lime-400 transition">
                        <FaYoutube />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
