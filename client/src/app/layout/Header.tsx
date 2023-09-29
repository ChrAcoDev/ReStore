import { FC } from "react";
import { AppBar, Switch, Typography } from "@mui/material";

interface Props {
  toggleTheme: () => void;
  darkMode: boolean;
}

const Header: FC<Props> = ({ darkMode, toggleTheme }) => {
  return (
    <AppBar position="static" sx={{ p: 2, mb: 4 }}>
      <Typography variant="h6">
        ReStore <Switch checked={darkMode} onChange={toggleTheme} />
      </Typography>
    </AppBar>
  );
};

export default Header;
