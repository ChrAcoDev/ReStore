import { LoadingButton } from "@mui/lab";
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
import { Link } from "react-router-dom";
import { Product } from "../../app/models/products";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync } from "../basket/basketSlice";

interface Props {
  product: Product;
}

const ProductCard: FC<Props> = ({
  product: { id, pictureUrl, name, price, brand, type },
}) => {
  const dispatch = useAppDispatch();

  const { status } = useAppSelector((state) => state.basket);

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
        <LoadingButton
          loading={status.includes("pendingAddItem" + id)}
          onClick={() => dispatch(addBasketItemAsync({ productId: id }))}
          size="small"
        >
          Add to cart
        </LoadingButton>
        <Button component={Link} to={`/catalog/${id}`} size="small">
          View
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
