import React from "react";
import { Card, CardMedia, CardContent, Typography, Box, Chip, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import type { Product } from "../../types";

interface Props {
  product: Product;
  onAdd: (product: Product) => void;
}

const MartCard: React.FC<Props> = ({ product, onAdd }) => {
  return (
    <Card sx={{  borderRadius: "12px", border: "1px solid #eee", position: "relative", boxShadow: "none" }}>
      <IconButton 
        onClick={() => onAdd(product)}
        sx={{ position: "absolute", top: 110, right: 10, bgcolor: "white", boxShadow: 2, "&:hover": { bgcolor: "#f5f5f5" } }}
        size="small"
      >
        <AddIcon sx={{ color: "#D70F64" }} />
      </IconButton>

      <Box sx={{ bgcolor: "#f8f8f8", borderRadius: "12px", m: 1, p: 1 }}>
        {/* <CardMedia component="img" image={product.image} sx={{ height: 100, objectFit: "contain" }} /> */}
      <CardMedia
        component="img"
        image={product.image}
        loading="lazy"
        sx={{ height: 100, objectFit: "contain" }}
      />

      </Box>

      <CardContent sx={{ pt: 1 }}>
        <Typography variant="body2" color="#D70F64" fontWeight="bold">{product.price}</Typography>
        <Chip label={product.priceOff} size="small" sx={{ bgcolor: "#FFE4EC", color: "#D70F64", fontSize: "10px", height: "20px" }} />
        <Typography variant="body2" sx={{ fontSize: "13px", mt: 1 }}>{product.name}</Typography>
      </CardContent>
    </Card>
  );
};

export default React.memo(MartCard);
