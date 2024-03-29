import { Button, Container, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container component={Paper} sx={{ height: 400 }}>
      <Typography gutterBottom variant="h3">
        Page is not found
      </Typography>

      <Button fullWidth component={Link} to="/catalog">
        Go back
      </Button>
    </Container>
  );
};

export default NotFound;
