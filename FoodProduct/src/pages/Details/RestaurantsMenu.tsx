import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Restaurant, MenuItem } from "../../types";
import restaurantsData from "../../data/restaurants.json";
import menusData from "../../data/menus.json";
import ItemModal from "../../components/ItemModal/ItemModal";
import { Drawer, Box, Typography, Card, CardMedia, CardContent, Divider, Grid } from "@mui/material";
import CartSidebar from "../Carts/cartSidbar";
import MobileCartBar from "../Carts/MobileCartBar";
import Swal from "sweetalert2";
import { useCartStore } from "../../store/useCartStor";
import { auth } from "../../DataBase/fireBase";

const RestaurantsMenu = () => {
  const { id } = useParams<{ id: string }>();
  const restaurantId = Number(id);
  const navigate = useNavigate();

  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileCartOpen, setMobileCartOpen] = useState(false);

  // Zustand cart store
  const cart = useCartStore((state) => state.cart);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQty = useCartStore((state) => state.updateQty);
  const clearCart = useCartStore((state) => state.clearCart);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const restaurant = (restaurantsData as Restaurant[]).find(r => r.id === restaurantId);
  const menuInfo = menusData.find(m => m.id === restaurantId);

  const handleCheckout = () => {
    if (auth.currentUser) {
      Swal.fire("Success", "Order placed successfully!", "success");
      clearCart();
    } else {
      navigate("/login");
    }
  }; 

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleAddToCart = (item: MenuItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1, // always start with 1
    });
  };

  if (!restaurant || !menuInfo) {
    return <Typography textAlign="center" mt={6}>Loading...</Typography>;
  }

  return (
    <Box sx={{ maxWidth: "1300px", mx: "auto", p: { xs: 2, md: 4 } }}>
      <Grid container spacing={4}>
        <p onClick={handleCheckout} > </p>
        {/* LEFT - MENU */}
        <Grid size={{xs:12 ,md:7 }} >
          <Typography variant="h3" fontWeight={800} color="#D70F64" mb={1}>
            {restaurant.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            {restaurant.cuisine} • ⭐ {restaurant.rating} ({restaurant.reviews})
          </Typography>
          <Divider sx={{ mb: 4 }} />
          <Grid container spacing={3}>
            {menuInfo.menu.map((item: MenuItem) => (
              <Grid   size={{xs:12 , sm:6 }}  key={item.id}>
                <Card
                  onClick={() => handleItemClick(item)}
                  sx={{
                    cursor: "pointer",
                    borderRadius: "1rem",
                    display: "flex",
                    height: 140,
                    transition: "0.2s",
                    "&:hover": { boxShadow: 4, transform: "translateY(-2px)" }
                  }}
                >
                  <CardContent sx={{ flex: 1 }}>
                    <Typography fontWeight={700}>{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary" >{item.desc}</Typography>
                    <Typography fontWeight={700} mt={1}>Rs. {item.price}</Typography>
                  </CardContent>
                  <CardMedia component="img" image={item.img} sx={{ width: 140 }} />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* RIGHT SIDE – DESKTOP CART */}
        <Grid size={{xs:12 , md:4}}  sx={{ display: { xs: "none", md: "block" } }}>
          <CartSidebar
            cart={cart}
            total={total}
            onAdd={(id) => updateQty(id, 1)}
            onRemove={(id) => updateQty(id, -1)}
            clearCart={clearCart}
          />
        </Grid>

        {/* MOBILE CART BAR */}
        <MobileCartBar
          total={total}
          itemCount={cart.length}
          onOpen={() => setMobileCartOpen(true)}
        />

        {/* MOBILE CART DRAWER */}
        <Drawer anchor="bottom" open={mobileCartOpen} onClose={() => setMobileCartOpen(false)}>
          <Box sx={{ p: 2, pb: 4 }}>
            <CartSidebar
              cart={cart}
              total={total}
              onAdd={(id) => updateQty(id, 1)}
              onRemove={(id) => updateQty(id, -1)}
              clearCart={clearCart}
            />
          </Box>
        </Drawer>
      </Grid>

      {/* ITEM MODAL */}
      <ItemModal
        item={selectedItem}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={(id) => removeItem(id)}
      />
    </Box>
  );
};

export default RestaurantsMenu;
