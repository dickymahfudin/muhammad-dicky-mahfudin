import React from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid } from "@mui/material";
import { Box } from "@mui/system";
import RpFormat from "../utils/RpFormat";
import { useNavigate } from "react-router-dom";

const Product = ({ id, name, price, image, click }) => {
  const navigate = useNavigate();

  return (
    <Grid
      item
      xs={12}
      sm={4}
      md={3}
      justifyContent="center"
      alignItems="center"
    >
      <Card sx={{ borderRadius: 5, height: "100%" }}>
        <CardActionArea onClick={() => navigate(`/${id}`)}>
          <CardMedia component="img" height="300" src={image} alt="noimage" />
          <CardContent>
            <Box height={60}>
              <Typography variant="body2" component="label">
                {name}
              </Typography>
            </Box>
            <Typography variant="h6">{RpFormat(price)}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};
Product.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string,
  click: PropTypes.func,
};

export default Product;
