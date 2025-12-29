import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PickUp from "./pages/PickUp";
import RestaurantMenu from "./pages/Details/RestaurantsMenu";
import Footer from "./pages/Footer";
import AuthPage from "./Auth/AuthForm";
import PandaMart from "./pages/PandaMart";
import PandaShop from "./pages/PandaShop";
import CateringPage from "./pages/Caterers";
function App() {
  return (
    <BrowserRouter>
      {/* Ab Provider ki zaroorat nahi, Zustand globally kaam karta hai */}
      <Navbar />
<Routes> 
  <Route path="/" element={<Home />} />
  <Route path="/home" element={<Home />} />
  <Route path="/pickup" element={<PickUp />} />
  
  {/* Yahan ghalti thi, inko sahi karein 👇 */}
  <Route path="/pandamart" element={<PandaMart />} />
  <Route path="/shops" element={<PandaShop />} />
  <Route path="/caterers" element={<CateringPage />} />
  
  <Route path="/restaurant/:id" element={<RestaurantMenu />} />
  <Route path="/login" element={<AuthPage />} />
  <Route path="/cart" element={<Home />} /> 
</Routes>
      
      <Footer/>
    </BrowserRouter>
  );
}

export default App;