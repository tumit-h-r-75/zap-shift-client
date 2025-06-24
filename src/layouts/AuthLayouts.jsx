import React from 'react';
import AuthImg from '../assets/authImage.png';
import { Outlet } from 'react-router';
import ProfirstLogo from '../components/ProfirstLogo';

const AuthLayouts = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col  px-4 py-6">
      <div className="">
        <ProfirstLogo />
      </div>
      <div className="max-w-7xl mx-auto flex  w-full bg-white rounded-xl overflow-hidden">
        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 p-10 flex items-center justify-center">
          <div className="w-full max-w-sm">
            <Outlet />
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="w-full lg:w-1/2 bg-[#FAFDF0] flex items-center justify-center px-8">
          <img
            src={AuthImg}
            alt="Delivery"
            className="max-w-[300px] lg:max-w-[400px]"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayouts;
