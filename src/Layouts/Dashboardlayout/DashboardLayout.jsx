import React, { useContext } from 'react';
import { AuthContext } from '../../Auth/AuthContext/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../../Components/Loader/Loader';

const DashboardLayout = ({ children }) => {
    const { user, loading } = useContext(AuthContext); // loading স্টেটটি যোগ করা জরুরি
    const location = useLocation();

    // ১. যদি ডেটা ফেচ হতে সময় নেয়, তবে একটি লোডিং স্পিনার দেখানো উচিত
    if (loading) {
        return <Loader></Loader>
    }

    // ২. যদি ইউজার থাকে, তবে চিলড্রেন দেখাও
    if (user) {
        return children;
    }

    // ৩. ইউজার না থাকলে লগইন পেজে রিডাইরেক্ট করো এবং বর্তমান লোকেশন সেভ রাখো
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default DashboardLayout;