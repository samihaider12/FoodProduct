import { useEffect, useMemo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Stack,
  Chip,
  IconButton,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { motion, AnimatePresence } from "framer-motion";
import { useShopStore } from "../store/ShopStore";
import ShopCard from "../components/ShopCard/ShopCard";
import type { Shop } from "../types";

const PandaShop = () => {
  const navigate = useNavigate();
  const { shops, init } = useShopStore();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Stores");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    init();
  }, [init]);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const filteredShops = useMemo(() => {
    return shops.filter((shop: Shop) => {
      const matchesSearch = shop.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        selectedCategory === "All Stores" ||
        shop.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [shops, search, selectedCategory]);

  return (
    <Box sx={{ bgcolor: "#FDFDFD", minHeight: "100vh" }}>
      {/* Hero */}
      <Box
        sx={{
          background: "linear-gradient(135deg,#D70F64,#B00B52)",
          pt: 10,
          pb: 18,
          borderRadius: "0 0 40px 40px",
        }}
      >
        <Container>
          <Typography variant="h3" color="white" textAlign="center">
            Premium Stores
          </Typography>

          <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
            <TextField
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search shops..."
              sx={{ bgcolor: "white", borderRadius: 2 }}
            />
          </Box>
        </Container>
      </Box>

      {/* Categories */}
      <Container maxWidth="xl" sx={{ mt: -10 }}>
        <Box 
    sx={{ 
      position: "relative", 
      display: "flex", 
      alignItems: "center",
      px: { xs: 4, md: 0 } // Mobile par space taake arrows ke liye jagah ho
    }}
  >
    {/* Left Arrow */}
    <IconButton
      onClick={() => handleScroll("left")}
      sx={{ 
        position: "absolute", 
        left: 0, 
        zIndex: 2,
        bgcolor: "white",
        boxShadow: 2,
        "&:hover": { bgcolor: "#f5f5f5" },
        display: { xs: "flex", md: "none" } // Sirf mobile par dikhega
      }}
    >
      <ArrowBackIosNewIcon fontSize="small" />
    </IconButton>

    <Stack
      ref={scrollRef}
      direction="row"
      spacing={1.5}
      sx={{
        overflowX: "auto",
        py: 2,
        px: 1,
        width: "100%",
        // Main Fix: Center align items
        justifyContent: { xs: "flex-start", md: "center" }, 
        "&::-webkit-scrollbar": { display: "none" },
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
    >
      {[
        "All Stores",
        "Groceries",
        "Pharmacy",
        "Pet Supplies",
        "Vapes",
        "Electronics",
      ].map((cat) => (
        <Chip
          key={cat}
          label={cat}
          clickable
          onClick={() => setSelectedCategory(cat)}
          sx={{
            flexShrink: 0, // Prevent chips from squeezing
            bgcolor: selectedCategory === cat ? "#D70F64" : "white",
            color: selectedCategory === cat ? "white" : "#333",
            fontWeight: selectedCategory === cat ? "bold" : "normal",
            boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
            "&:hover": {
                bgcolor: selectedCategory === cat ? "#B00B52" : "#f0f0f0",
            }
          }}
        />
      ))}
    </Stack>

    {/* Right Arrow */}
    <IconButton
      onClick={() => handleScroll("right")}
      sx={{ 
        position: "absolute", 
        right: 0, 
        zIndex: 2,
        bgcolor: "white",
        boxShadow: 2,
        "&:hover": { bgcolor: "#f5f5f5" },
        display: { xs: "flex", md: "none" }
      }}
    >
      <ArrowForwardIosIcon fontSize="small" />
    </IconButton>
  </Box>

        {/* Shops */}
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <AnimatePresence>
            {filteredShops.map((shop) => (
              <Grid key={shop.id} size={{xs:12 ,sm:6 ,md:4 ,lg:3}}>
                <motion.div
                  onClick={() => navigate(`/shop/${shop.id}`)}
                  style={{ cursor: "pointer" }}
                  
                >
                  <ShopCard shop={shop} />
                </motion.div>
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>

        {filteredShops.length === 0 && (
          <Typography textAlign="center" mt={6}>
            No stores found
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default PandaShop;
