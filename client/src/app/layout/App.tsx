import { ThemeProvider } from "@emotion/react";
import { Container, CssBaseline, createTheme } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import { useStoreContext } from "../context/StoreContext";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import Loading from "./Loading";

const App: FC<{}> = () => {
  const { setBasket } = useStoreContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie("buyerId");
    if (buyerId) {
      agent.Basket.get()
        .then((basket) => setBasket(basket))
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [setBasket]);

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
