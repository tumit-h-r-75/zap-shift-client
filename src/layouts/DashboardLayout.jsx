import React from 'react';
import { Link, Outlet } from 'react-router';
import ProfirstLogo from '../components/ProfirstLogo';
import useAuth from '../hooks/useAuth';

const DashboardLayout = () => {
    const { user, signOutUser } = useAuth();

    const handleLogout = () => {
        signOutUser();
    };

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content flex flex-col">
                {/* Top Navbar */}
                <div className="w-full navbar bg-base-300 lg:hidden px-4 justify-between">
                    <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                    </label>
                    <ProfirstLogo />
                    <button onClick={handleLogout} className="btn btn-sm bg-red-500 text-white">Logout</button>
                </div>

                {/* Main Content */}
                <div className="p-4 mt-5 md:mt-0 bg-white min-h-screen">
                    <Outlet />
                </div>
            </div>

            {/* Sidebar */}
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    <ProfirstLogo />

                    {/* User Info */}
                    <div className="mt-4 mb-2 text-sm">
                        <p><strong>Name:</strong> {user?.displayName}</p>
                        <p><strong>Email:</strong> {user?.email}</p>
                        <p><strong>Role:</strong> {user?.role || 'User'}</p>
                    </div>

                    {/* Navigation Links */}
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/coverage'>Coverage</Link></li>
                    <li><Link to='/dashboard/userHome'>User Home</Link></li>
                    <li><Link to='/dashboard/myParcels'>My Parcels</Link></li>
                    <li><Link to='/dashboard/addParcel'>Add Parcel</Link></li>
                    <li><Link to='/dashboard/parcelsToPay'>Parcels To Pay</Link></li>
                    <li><Link to='/dashboard/tracking'>Tracking</Link></li>
                    <li><Link to='/dashboard/manageParcels'>Manage Parcels</Link></li>
                    <li><Link to='/dashboard/paymentHistory'>Payment History</Link></li>
                    <li><Link to='/dashboard/discussion'>Discussion</Link></li>
                    <li><Link to='/dashboard/settings'>User Settings</Link></li>
                    <li><button onClick={handleLogout} className="btn btn-sm bg-red-500 text-white mt-2">Logout</button></li>
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;
