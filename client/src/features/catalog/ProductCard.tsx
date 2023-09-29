import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { Product } from "../../app/models/products";

interface Props {
  product: Product;
}

const ProductCard: FC<Props> = ({
  product: { id, pictureUrl, name, price, brand, type },
}) => {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            {name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={name}
        titleTypographyProps={{
          sx: { fontWeight: "bold", color: "primary.main" },
        }}
      />
      <CardMedia
        sx={{
          height: 140,
          backgroundSize: "contain",
          bgcolor: "primary.light",
        }}
        image={pictureUrl}
        title={name}
      />
      <CardContent>
        <Typography gutterBottom color="secondary" variant="h5" component="div">
          ${(price / 100).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {brand} / {type}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Add to cart</Button>
        <Button size="small">View</Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;