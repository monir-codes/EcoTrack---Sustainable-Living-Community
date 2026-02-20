import React, { Suspense } from 'react';
import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Loader from '../../Components/Loader/Loader';

const PublicLayout = () => {
    return (
        <div className="font-sans bg-[#05070a] text-white">
            <Navbar />
            
            {/* min-h ব্যবহার করার ফলে ফুটার সবসময় নিচে থাকবে */}
            <main className="min-h-[calc(100vh-280px)] relative">
                <Suspense fallback={<Loader />}>
                    <Outlet />
                </Suspense>
            </main>

            <Footer />
        </div>
    );
};

export default PublicLayout;