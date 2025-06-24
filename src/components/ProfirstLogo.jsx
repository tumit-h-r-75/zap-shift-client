import React from 'react';
import navLogo from "../assets/logo.png";
import { Link } from 'react-router';

const ProfirstLogo = () => {
    return (
        <div>
            <Link to={'/'}>
                <div className="flex items-center -space-x-4 md:-space-x-5 ">
                    <img
                        src={navLogo}
                        alt="Profast Logo"
                        className="w-8 h-8 -mt-1  md:w-10 md:h-10 md:-mt-3 object-contain"
                    />
                    <span className="text-lg md:text-2xl font-bold text-gray-800 tracking-tight mt-1">
                        Profast
                    </span>
                </div>
            </Link>
        </div>
    );
};

export default ProfirstLogo;