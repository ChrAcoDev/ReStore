import { ThemeProvider } from "@emotion/react";
import { Container, CssBaseline, createTheme } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setBasket } from "../../features/basket/basketSlice";
import agent from "../api/agent";
import { useAppDispatch } from "../store/configureStore";
import { getCookie } from "../util/util";
import Header from "./Header";
import Loading from "./Loading";

const App: FC<{}> = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie("buyerId");
    if (buyerId) {
      agent.Basket.get()
        .then((basket) => dispatch(setBasket(basket)))
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [dispatch]);

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? "dark" : "light";

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: darkMode ? "#121212" : "#eaeaea",
      },
    },
  });

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  if (isLoading) return <Loading message="initializing app..." />;

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />

      <CssBaseline />
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
};

export default App;
