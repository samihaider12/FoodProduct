import { Card, CardMedia, CardContent, Typography, Box, } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import { memo } from "react";
import type { Shop } from "../../types";

const ShopCard = ({ shop }: { shop: Shop }) => {
  return (
    <Card
      elevation={0}
      sx={{
       
        border: "1px solid #eee",
         borderRadius: "1.5rem",
        boxShadow: 3,
        cursor: "pointer",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": { transform: "scale(1.03)", boxShadow: 6 },
      }}
    >
      <CardMedia
        component="img"
        height="170"
        image={shop.image}
        alt={shop.name}
      />

      <CardContent>
        <Typography fontWeight={700}>{shop.name}</Typography>

        <Box display="flex" alignItems="center" mt={1}>
          <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5 }} />
          <Typography variant="body2">{shop.deliveryTime}</Typography>

          <Box mx={1}>•</Box>

          <DeliveryDiningIcon
            sx={{ fontSize: 18, mr: 0.5, color: "#D70F64" }}
          />
          <Typography variant="body2" color="#D70F64">
            {shop.isFreeDelivery ? "Free delivery" : "Paid"}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default memo(ShopCard);
