import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Divider,
  Drawer,
} from "@mui/material";
import { useShopStoreMenu } from "../../store/useShopStoreMenu";
import { useCartStore } from "../../store/useCartStor";
import ItemModal from "../../components/ItemModal/ItemModal";
import CartSidebar from "../Carts/cartSidbar";
import MobileCartBar from "../Carts/MobileCartBar";
import type { ShopMenuItem } from "../../types";

const ShopMenu = () => {
  const { id } = useParams();
  const shopId = Number(id);

  const init = useShopStoreMenu((s) => s.init);
  const shop = useShopStoreMenu((s) =>
    s.shops.find((x) => x.id === shopId)
  );

  useEffect(() => {
    init();
  }, [init]);

  const cart = useCartStore((s) => s.cart);
  const addItem = useCartStore((s) => s.addItem);
  const updateQty = useCartStore((s) => s.updateQty);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);

  const [selectedItem, setSelectedItem] =
    useState<ShopMenuItem | null>(null);
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!shop) return null;

  const total = cart.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  return (
    <Box maxWidth="1300px" mx="auto" p={4}>
      <Typography variant="h3">{shop.name}</Typography>
      <Divider sx={{ my: 4 }} />

      <Grid container spacing={4}>
        <Grid  size={{xs:12 ,md:8}}>
          <Grid container spacing={3}>
            {shop.menu.map((item) => (
              <Grid size={{xs:12 ,sm:6}} key={item.id}>
                <Card
                  sx={{ display: "flex", cursor: "pointer" }}
                  onClick={() => {
                    setSelectedItem(item);
                    setOpen(true);
                  }}
                >
                  <CardContent sx={{ flex: 1 }}>
                    <Typography fontWeight={700}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2">
                      {item.desc}
                    </Typography>
                    <Typography fontWeight={700}>
                      Rs. {item.price}
                    </Typography>
                  </CardContent>
                  <CardMedia
                    component="img"
                    image={item.img}
                    sx={{ width: 120 }}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid size={{xs:12 ,md:4}} sx={{ display: { xs: "none", md: "block" } }}>
          <CartSidebar
            cart={cart}
            total={total}
            onAdd={(id) => updateQty(id, 1)}
            onRemove={(id) => updateQty(id, -1)}
            clearCart={clearCart}
          />
        </Grid>
      </Grid>

      <MobileCartBar
        total={total}
        itemCount={cart.length}
        onOpen={() => setMobileOpen(true)}
      />

      <Drawer
        anchor="bottom"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      >
        <CartSidebar
          cart={cart}
          total={total}
          onAdd={(id) => updateQty(id, 1)}
          onRemove={(id) => updateQty(id, -1)}
          clearCart={clearCart}
        />
      </Drawer>

      <ItemModal
        item={selectedItem}
        open={open}
        onClose={() => setOpen(false)}
        onAddToCart={(item) =>
          addItem({ ...item, quantity: 1 })
        }
        onRemoveFromCart={removeItem}
      />
    </Box>
  );
};

export default ShopMenu;
