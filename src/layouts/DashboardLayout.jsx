import React from 'react';
import { NavLink, Outlet } from 'react-router';
import {
    FaHome,
    FaUser,
    FaBox,
    FaMoneyCheckAlt,
    FaSignOutAlt,
    FaMapMarkedAlt,
    FaPlusSquare,
    FaCreditCard,
    FaHistory,
    FaComments,
    FaCog,
    FaBiking,
    FaUserClock
} from 'react-icons/fa';
import ProfirstLogo from '../components/ProfirstLogo';
import useAuth from '../hooks/useAuth';

const DashboardLayout = () => {
    const { user, signOutUser } = useAuth();

    const handleLogout = () => {
        signOutUser();
    };

    const navLinkClass = ({ isActive }) =>
        isActive
            ? 'flex items-center gap-2 px-3 py-2 rounded bg-lime-400 text-white font-medium'
            : 'flex items-center gap-2 px-3 py-2 rounded text-gray-700 hover:bg-lime-200 transition';

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />

            {/* Top Navbar */}
            <div className="drawer-content flex flex-col">
                <div className="w-full navbar bg-base-300 lg:hidden px-4 justify-between">
                    <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </label>
                    <ProfirstLogo />
                    <button onClick={handleLogout} className="btn btn-sm bg-red-500 text-white flex items-center gap-1">
                        <FaSignOutAlt /> Logout
                    </button>
                </div>

                {/* Main Content */}
                <div className="p-4 mt-5 md:mt-0 bg-white min-h-screen">
                    <Outlet />
                </div>
            </div>

            {/* Sidebar */}
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content space-y-1">
                    <ProfirstLogo />

                    {/* User Info */}
                    <div className="mt-4 mb-2 text-sm">
                        <p><strong>Name:</strong> {user?.displayName}</p>
                        <p><strong>Email:</strong> {user?.email}</p>
                        <p><strong>Role:</strong> {user?.role || 'User'}</p>
                    </div>

                    {/* Navigation Links */}
                    <li><NavLink to='/' className={navLinkClass}><FaHome /> Home</NavLink></li>
                    <li><NavLink to='/coverage' className={navLinkClass}><FaMapMarkedAlt /> Coverage</NavLink></li>
                    <li><NavLink to='/dashboard/myParcels' className={navLinkClass}><FaBox /> My Parcels</NavLink></li>
                    <li><NavLink to='/pricing' className={navLinkClass}><FaPlusSquare /> Add Parcel</NavLink></li>
                    <li><NavLink to='/dashboard/tracking' className={navLinkClass}><FaMapMarkedAlt /> Tracking</NavLink></li>
                    <li><NavLink to='/dashboard/manageParcels' className={navLinkClass}><FaBox /> Manage Parcels</NavLink></li>
                    <li><NavLink to='/dashboard/paymentHistory' className={navLinkClass}><FaHistory /> Payment History</NavLink></li>
                    <li><NavLink to='/dashboard/settings' className={navLinkClass}><FaCog /> User Settings</NavLink></li>

                    {/*New Added Links */}
                    <li><NavLink to='/dashboard/activeRiders' className={navLinkClass}><FaBiking /> Active Riders</NavLink></li>
                    <li><NavLink to='/dashboard/pendingRiders' className={navLinkClass}><FaUserClock /> Pending Riders</NavLink></li>

                    <li>
                        <button onClick={handleLogout} className="btn btn-sm bg-red-500 text-white mt-3 w-full flex items-center gap-2 justify-center">
                            <FaSignOutAlt /> Logout
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;
