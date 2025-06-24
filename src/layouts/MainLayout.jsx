import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
    return (
        <div>
            <header className='sticky top-0 left-0 z-20'>
                <Navbar></Navbar>
            </header>
            <main className='max-w-7xl mx-auto min-h-screen'>
                <Outlet></Outlet>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default MainLayout;