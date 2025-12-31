import { useEffect, useMemo } from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import RestaurantCard from "../components/RestaurantCard";
import { useRestaurantStore } from "../store/useRestaurantStore";

const PickUp = () => {
  const { restaurants, init } = useRestaurantStore();

  useEffect(() => {
    init();
  }, [init]);

  // ✅ Alphabetical sort (A–Z) – PickUp ONLY
  const sortedRestaurants = useMemo(() => {
    return [...restaurants].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }, [restaurants]);

  return (
    <Box bgcolor="#F7F7F7" minHeight="100vh" py={6}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="baseline"
          mb={4}
        >
          <Typography variant="h4" fontWeight={600}>
            Pick-up Restaurants
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {sortedRestaurants.length} Restaurants available
          </Typography>
        </Box>

        {/* Grid */}
        <Grid container spacing={4}>
          {sortedRestaurants.map((res) => (
            <Grid key={res.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <RestaurantCard restaurant={res} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default PickUp;
