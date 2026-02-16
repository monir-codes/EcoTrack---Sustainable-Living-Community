import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Home from "../../pages/Home/Home";


const PublicLayout = () => {
    return (
        <div className="font-sans">
            <Navbar />
            <div className="min-h-[calc(100vh-280px)]">
               <Home></Home>
            </div>
            <Footer />
        </div>
    );
};

export default PublicLayout;