import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Container, Grid, Box, TextField, InputAdornment, Typography, Drawer, Paper } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

import { motion, AnimatePresence } from "framer-motion";

import { useMartStore } from "../store/useMartStore";
import MartData from "../components/MartData/MartData";
import type { Product } from "../types";

// Cart Imports
import CartSidebar from "../pages/Carts/cartSidbar";
import MobileCartBar from "../pages/Carts/MobileCartBar";

// 
import type { MenuItem } from "../types";
import { useCartStore } from "../store/useCartStor";
const PandaMart: React.FC = () => {

  // Zustand cart store
  const cart = useCartStore((state) => state.cart);
  const addItem = useCartStore((state) => state.addItem);
  const updateQty = useCartStore((state) => state.updateQty);
  const clearCart = useCartStore((state) => state.clearCart);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  (item: MenuItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
    });
  };

  const { products, init } = useMartStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [mobileCartOpen, setMobileCartOpen] = useState(false);

  useEffect(() => { init(); }, [init]);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery.trim().toLowerCase()), 250);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredProducts = useMemo(() => {
    if (!debouncedQuery) return products;
    return products.filter((p) =>
      p.name.toLowerCase().includes(debouncedQuery) ||
      p.quieantity?.toLowerCase().includes(debouncedQuery)
    );
  }, [products, debouncedQuery]);

  const handleAddToCart = useCallback((product: Product) => {
    const priceString = product.price.replace(/Rs\.?/i, "").trim();
    const priceNumber = Math.round(parseFloat(priceString));
    addItem({
      id: product.id,
      name: product.name,
      price: priceNumber,
      quantity: 1,
    });
  }, [addItem]);

  // Container Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <Box sx={{
      background: "linear-gradient(to bottom, #fdfdfd, #f4f4f4)",
      minHeight: "100vh",
      py: 4,
      pb: { xs: 10, md: 4 }
    }}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* LEFT: Products Section */}
          <Grid size={{ xs: 12, md: 8 }}>
            {/* 🎯 Polished Search Bar */}
            <motion.div initial={{   opacity: 0 }} animate={{ opacity: 1 }}>
              <TextField
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search premium products..."
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#D70F64" }} />
                    </InputAdornment>
                  )
                }}
                sx={{
                  mb: 5,
                  bgcolor: "white",
                  borderRadius: "16px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "16px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
                    border: "1px solid #eee",
                    "&:hover fieldset": { borderColor: "#D70F64" },
                    "&.Mui-focused fieldset": { borderColor: "#D70F64" }
                  }
                }}
              />
            </motion.div>

            {/* 🎯 Professional Grid Layout */}
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <Grid container spacing={2}> {/* Spacing kam rakhi hai taake cards bade dikhen */}
                {/* <AnimatePresence> */}
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((p) => (
                      <Grid
                        key={p.id}
                        size={{xs:12 ,sm: 6, md: 4, lg: 4 }}
                         
                      >
                        <motion.div
                          variants={itemVariants}
                          layout
                          style={{ width: "100%" }}
                        >
                          <MartData product={p} onAdd={handleAddToCart} />

                        </motion.div>
                      </Grid>
                    ))
                  ) : (
                    <Grid size={{ xs: 12 }}>
                      <Typography textAlign="center" py={10}>No products found</Typography>
                    </Grid>
                  )}
              </Grid>
            </motion.div>
          </Grid>

          {/* RIGHT: Desktop Cart Sidebar */}
          <Grid size={{ xs: 12, md: 4 }} sx={{ display: { xs: "none", md: "block" } }}>
            <Box sx={{ position: "sticky", top: 24 }}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: "24px",
                  overflow: "hidden",
                  border: "1px solid #eee",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.06)"
                }}
              >
                <Box sx={{ p: 2, bgcolor: "#D70F64", color: "white" }}>
                  <Typography variant="h6" fontWeight={700} textAlign="center">My Basket</Typography>
                </Box>
                <CartSidebar
                  cart={cart}
                  total={total}
                  onAdd={(id) => updateQty(id, 1)}
                  onRemove={(id) => updateQty(id, -1)}
                  clearCart={clearCart}
                />
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* --- MOBILE UI ELEMENTS --- */}

      {/* 1. Mobile Bottom Bar */}
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            style={{ position: "fixed", bottom: 20, left: 0, right: 0, zIndex: 1000, padding: "0 16px" }}
          >
            <MobileCartBar
              total={total}
              itemCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
              onOpen={() => setMobileCartOpen(true)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Mobile Bottom Sheet */}
      <Drawer
        anchor="bottom"
        open={mobileCartOpen}
        onClose={() => setMobileCartOpen(false)}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            maxHeight: "85vh",
            boxShadow: "0 -10px 40px rgba(0,0,0,0.1)"
          }
        }}
      >
        <Box sx={{ p: 3, pb: 4 }}>
          <Box sx={{ width: 50, height: 5, bgcolor: "#e0e0e0", borderRadius: 10, mx: "auto", mb: 3 }} />
          <Typography variant="h5" fontWeight={800} sx={{ mb: 3, color: "#333" }}>Order Summary</Typography>

          <Box sx={{ maxHeight: "60vh", overflowY: "auto" }}>
            <CartSidebar
              cart={cart}
              total={total}
              onAdd={(id) => updateQty(id, 1)}
              onRemove={(id) => updateQty(id, -1)}
              clearCart={clearCart}
            />
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default PandaMart;

