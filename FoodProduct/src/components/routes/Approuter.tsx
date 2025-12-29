import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../../pages/Home";
import PickUp from "../../pages/PickUp";
import PandaMart from "../../pages/PandaMart";
import PandaShop from "../../pages/PandaShop";
import CateringCard from "../../pages/Caterers";
import AuthPage from "../../Auth/AuthForm";
// Agar ye pages abhi nahi banaye toh temporary empty div use kar sakte hain
// const Placeholder = ({ name }: { name: string }) => <div style={{padding: '20px'}}><h1>{name} Page Coming Soon</h1></div>;

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pickup" element={<PickUp />} />
        <Route path="/pandamart" element={<PandaMart />} />
        <Route path="/shops" element={<PandaShop/>} />
        <Route path="/caterers" element={<CateringCard/>} /> 
        {/* Baki routes ko placeholder de diya hai takay navigation crash na ho */}
        
        
        {/* Cart aur Login ke routes bhi yahan add honge */}
        <Route path="/cart" element={<Home />} />
        <Route path="/login" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;