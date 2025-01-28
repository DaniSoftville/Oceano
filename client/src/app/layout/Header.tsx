import React, { useState } from "react";
import {
  AppBar,
  Badge,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, Menu as MenuIcon } from "@mui/icons-material";
import { useAppSelector } from "../store/configureStore";
import SignedInMenu from "./SignedInMenu";
import { useResponsive } from "../hooks/use-responsive"; // Import your custom hooks

const midLinks = [
  { title: "catalog", path: "/catalog" },
  { title: "about", path: "/about" },
  { title: "contact", path: "/contact" },
];

const rightLinks = [
  { title: "login", path: "/login" },
  { title: "register", path: "/register" },
];

const navLinkStyles = {
  color: "inherit",
  textDecoration: "none",
  typography: "h6",
  "&:hover": {
    color: "grey.500",
  },
  "&.active": {
    color: "text.secondary",
  },
};

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}

export default function Header({ handleThemeChange, darkMode }: Props) {
  const { basket } = useAppSelector((state) => state.basket);
  const { user } = useAppSelector((state) => state.account);
  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);

  const isMobile = useResponsive("down", "md"); // Use the `useResponsive` hook to detect mobile screens
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  console.log(user);
  const drawerContent = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        OCEANO
      </Typography>
      <List>
        {midLinks.map(({ title, path }) => (
          <ListItem component={NavLink} to={path} key={path} sx={navLinkStyles}>
            {title.toUpperCase()}
          </ListItem>
        ))}
        {user
          ? null
          : rightLinks.map(({ title, path }) => (
              <ListItem
                component={NavLink}
                to={path}
                key={path}
                sx={navLinkStyles}
              >
                {title.toUpperCase()}
              </ListItem>
            ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo and Theme Switch */}
        <Box display="flex" alignItems="center">
          <Typography
            variant="h6"
            component={NavLink}
            to="/"
            sx={navLinkStyles}
          >
            OCEANO
          </Typography>
          <Switch checked={darkMode} onChange={handleThemeChange} />
        </Box>

        {isMobile ? (
          // Render Drawer for mobile screens
          <>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={handleDrawerToggle}
            >
              {drawerContent}
            </Drawer>
          </>
        ) : (
          // Render navigation links for larger screens
          <>
            <List sx={{ display: "flex" }}>
              {midLinks.map(({ title, path }) => (
                <ListItem
                  component={NavLink}
                  to={path}
                  key={path}
                  sx={navLinkStyles}
                >
                  {title.toUpperCase()}
                </ListItem>
              ))}
              {user && user.roles?.includes("Admin") && (
                <ListItem
                  component={NavLink}
                  to={"/inventory"}
                  sx={navLinkStyles}
                >
                  INVENTORY
                </ListItem>
              )}
            </List>
            <Box display="flex" alignItems="center">
              <IconButton
                component={Link}
                to="/basket"
                size="large"
                edge="start"
                color="inherit"
                sx={{ mr: 2 }}
              >
                <Badge badgeContent={itemCount} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
              {user ? (
                <SignedInMenu />
              ) : (
                <List sx={{ display: "flex" }}>
                  {rightLinks.map(({ title, path }) => (
                    <ListItem
                      component={NavLink}
                      to={path}
                      key={path}
                      sx={navLinkStyles}
                    >
                      {title.toUpperCase()}
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
