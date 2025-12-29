 
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import React, { useEffect, useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   Box,
//   InputBase,
//   Badge,
//   Button,
//   Tabs,
//   Tab
// } from "@mui/material";
// import {
//   ShoppingCart,
//   LocationOn,
//   Search,
//   TwoWheeler,
//   DirectionsRun,
//   LocalMall,
//   Storefront,
//   Restaurant,
//   PersonOutline
// } from "@mui/icons-material"; 
// import { useCartStore } from "../store/useCartStor"; // Zustand Store

// const Navbar = () => { 
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [value, setValue] = useState(0);

//   // Zustand store se cart count lein
//   const cart = useCartStore((state) => state.cart);
//   const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

//   // URL ke mutabiq Tabs ko highlight karne ke liye
//   useEffect(() => {
//     const paths = ["/home", "/pickup", "/pandamart", "/shops", "/caterers"];
//     const index = paths.indexOf(location.pathname);
//     if (index !== -1) setValue(index);
//   }, [location.pathname]);

//   const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
//     setValue(newValue);
//     const paths = ["/home", "/pickup", "/pandamart", "/shops", "/caterers"];
//     navigate(paths[newValue]);
//   };

//   return (
//     <AppBar position="sticky" elevation={1} sx={{ backgroundColor: "#ffffff", color: "#000", width: "100%" }}>
//       <Toolbar sx={{ 
//         display: "flex", 
//         justifyContent: "space-between", 
//         gap: { xs: 1, md: 2 },
//         px: { xs: 1, sm: 2 } 
//       }}>
        
//         {/* 1. Logo */}
//         <Typography 
//           component={Link} 
//           to="/home" 
//           sx={{ 
//             textDecoration: "none", 
//             fontWeight: 700, 
//             fontSize: { xs: "18px", md: "24px" }, 
//             color: "#D70F64",
//             flexShrink: 0 
//           }}
//         >
//           TastyCart
//         </Typography>

//         {/* 2. Search Bar (Location) */}
//         <Box sx={{ 
//           display: { xs: "none", md: "flex" }, 
//           alignItems: "center", 
//           backgroundColor: "#f5f5f5", 
//           borderRadius: "999px", 
//           px: 2, py: 0.5, 
//           flex: 1, 
//           maxWidth: "500px" 
//         }}>
//           <LocationOn sx={{ color: "#D70F64", mr: 1 }} />
//           <InputBase placeholder="Enter your location" sx={{ flex: 1, fontSize: "14px" }} />
//           <Search sx={{ color: "#777" }} />
//         </Box>

//         {/* 3. Actions Area (Cart & Login) */}
//         <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
//           <IconButton component={Link} to="/cart">
//             <Badge badgeContent={cartCount} color="error" sx={{ "& .MuiBadge-badge": { backgroundColor: "#D70F64" } }}>
//               <ShoppingCart />
//             </Badge>
//           </IconButton>

//           <Button 
//             component={Link} 
//             to="/login" 
//             variant="outlined"
//             sx={{ 
//               textTransform: "none", 
//               fontWeight: 600, 
//               color: "#333", 
//               borderColor: "#ddd",
//               ml: { xs: 0.5, sm: 2 },
//               minWidth: "auto",
//               px: { xs: 1, sm: 2 }
//             }}
//           >
//             <PersonOutline sx={{ display: { xs: "block", sm: "none" } }} />
//             <Box component="span" sx={{ display: { xs: "none", sm: "block" } }}>Log in</Box>
//           </Button>
//         </Box>
//       </Toolbar>

//       {/* 4. Navigation Tabs (Delivery, Pickup, etc.) */}
//       <Box sx={{ borderTop: "1px solid #f0f0f0", backgroundColor: "#fff" }}>
//         <Tabs
//           value={value}
//           onChange={handleChange}
//           variant="scrollable" 
//           scrollButtons="auto" 
//           allowScrollButtonsMobile
//           sx={{
//             "& .MuiTabs-indicator": { backgroundColor: "#D70F64", height: "3px" },
//             "& .MuiTab-root": { 
//               textTransform: "none", 
//               minWidth: { xs: "80px", sm: "120px" }, 
//               fontWeight: 600, 
//               color: "#707070",
//               fontSize: "14px"
//             },
//             "& .Mui-selected": { color: "#D70F64 !important" }
//           }}
//         >
//           <Tab icon={<TwoWheeler sx={{ fontSize: 18 }} />} iconPosition="start" label="Delivery" />
//           <Tab icon={<DirectionsRun sx={{ fontSize: 18 }} />} iconPosition="start" label="Pick-up" />
//           <Tab icon={<LocalMall sx={{ fontSize: 18 }} />} iconPosition="start" label="pandamart" />
//           <Tab icon={<Storefront sx={{ fontSize: 18 }} />} iconPosition="start" label="Shops" />
//           <Tab icon={<Restaurant sx={{ fontSize: 18 }} />} iconPosition="start" label="Caterers" />
//         </Tabs>
//       </Box>
//     </AppBar>
//   );
// };

// export default Navbar;

import { Link, useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  InputBase,
  Badge,
  Button,
  Tabs,
  Tab
} from "@mui/material";
import {
  ShoppingCart,
  LocationOn,
  Search,
  TwoWheeler,
  DirectionsRun,
  LocalMall,
  Storefront,
  Restaurant,
  PersonOutline,
  LogoutOutlined 
} from "@mui/icons-material"; 
import { useCartStore } from "../store/useCartStor";
import { auth } from "../DataBase/fireBase"; // Aapki firebase file
import { onAuthStateChanged } from "firebase/auth";
import { logoutUser } from "../DataBase/auth.service"; // Aapka export kiya hua function
import Swal from "sweetalert2";

const Navbar = () => { 
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 1. Check if user is logged in or not
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // 2. Handle Logout
// 2. Handle Logout with Confirmation Warning
  const handleLogout = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#D70F64", // Foodpanda theme color
      cancelButtonColor: "#6e7881",
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "Cancel"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await logoutUser();
          Swal.fire({
            title: "Logged Out!",
            text: "You have been logged out successfully.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false
          });
          navigate("/home");
        } catch (error) {
          Swal.fire("Error", "Logout failed. Please try again.", "error");
        }
      } else {
        // Agar user cancel kar de toh
        console.log("Logout cancelled by user");
      }
    });
  };

  const cart = useCartStore((state) => state.cart);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const paths = ["/home", "/pickup", "/pandamart", "/shops", "/caterers"];
    const index = paths.indexOf(location.pathname);
    if (index !== -1) setValue(index);
  }, [location.pathname]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    const paths = ["/home", "/pickup", "/pandamart", "/shops", "/caterers"];
    navigate(paths[newValue]);
  };

  return (
    <AppBar position="sticky" elevation={1} sx={{ backgroundColor: "#ffffff", color: "#000", width: "100%" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", gap: { xs: 1, md: 2 }, px: { xs: 1, sm: 2 } }}>
        
        {/* Logo */}
        <Typography component={Link} to="/home" sx={{ textDecoration: "none", fontWeight: 700, fontSize: { xs: "18px", md: "24px" }, color: "#D70F64", flexShrink: 0 }}>
          TastyCart
        </Typography>

        {/* Search Bar */}
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", backgroundColor: "#f5f5f5", borderRadius: "999px", px: 2, py: 0.5, flex: 1, maxWidth: "500px" }}>
          <LocationOn sx={{ color: "#D70F64", mr: 1 }} />
          <InputBase placeholder="Enter your location" sx={{ flex: 1, fontSize: "14px" }} />
          <Search sx={{ color: "#777" }} />
        </Box>

        {/* Actions (Cart & Auth) */}
        <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          <IconButton component={Link} to="/cart">
            <Badge badgeContent={cartCount} color="error" sx={{ "& .MuiBadge-badge": { backgroundColor: "#D70F64" } }}>
              <ShoppingCart />
            </Badge>
          </IconButton>

          {/* Login/Logout Button Logic */}
          {isLoggedIn ? (
            <Button 
              onClick={handleLogout}
              variant="outlined"
              color="error"
              sx={{ textTransform: "none", fontWeight: 600, ml: { xs: 0.5, sm: 2 }, minWidth: "auto", px: { xs: 1, sm: 2 } }}
            >
              <LogoutOutlined sx={{ mr: { sm: 1 } }} fontSize="small" />
              <Box component="span" sx={{ display: { xs: "none", sm: "block" } }}>Log out</Box>
            </Button>
          ) : (
            <Button 
              component={Link} 
              to="/login" 
              variant="outlined"
              sx={{ textTransform: "none", fontWeight: 600, color: "#333", borderColor: "#ddd", ml: { xs: 0.5, sm: 2 }, minWidth: "auto", px: { xs: 1, sm: 2 } }}
            >
              <PersonOutline sx={{ mr: { sm: 1 } }} fontSize="small" />
              <Box component="span" sx={{ display: { xs: "none", sm: "block" } }}>Log in</Box>
            </Button>
          )}
        </Box>
      </Toolbar>

      {/* Tabs */}
      <Box sx={{ borderTop: "1px solid #f0f0f0", backgroundColor: "#fff" }}>
        <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" allowScrollButtonsMobile
          sx={{
            "& .MuiTabs-indicator": { backgroundColor: "#D70F64", height: "3px" },
            "& .MuiTab-root": { textTransform: "none", minWidth: { xs: "80px", sm: "120px" }, fontWeight: 600, color: "#707070", fontSize: "14px" },
            "& .Mui-selected": { color: "#D70F64 !important" }
          }}
        >
          <Tab icon={<TwoWheeler sx={{ fontSize: 18 }} />} iconPosition="start" label="Delivery" />
          <Tab icon={<DirectionsRun sx={{ fontSize: 18 }} />} iconPosition="start" label="Pick-up" />
          <Tab icon={<LocalMall sx={{ fontSize: 18 }} />} iconPosition="start" label="pandamart" />
          <Tab icon={<Storefront sx={{ fontSize: 18 }} />} iconPosition="start" label="Shops" />
          <Tab icon={<Restaurant sx={{ fontSize: 18 }} />} iconPosition="start" label="Caterers" />
        </Tabs>
      </Box>
    </AppBar>
  );
};

export default Navbar;