import React from 'react';
import { Outlet } from 'react-router';

const DashboardLayout = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content flex flex-col">
                {/* Top Navbar */}
                <div className="w-full navbar bg-base-300 lg:hidden">
                    <div className="flex-none">
                        <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M4 6h16M4 12h16M4 18h16"/>
                            </svg>
                        </label>
                    </div>
                    <div className="flex-1 px-2 text-2xl font-bold">Dashboard</div>
                </div>

                {/* Main Content */}
                <div className="p-4 mt-5 md:mt-0 bg-white min-h-screen">
                    <Outlet /> {/* 👈 route-based content এখানে দেখাবে */}
                </div>
            </div>

            {/* Sidebar */}
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    <li className="text-2xl font-bold mb-4 hidden lg:block">Dashboard</li>
                    <li><a href="#">Sidebar Item 1</a></li>
                    <li><a href="#">Sidebar Item 2</a></li>
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;
