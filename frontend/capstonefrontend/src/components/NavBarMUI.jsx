
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { NavLink } from 'react-router-dom';
import { pages } from '../data/pages';


// see https://mui.com/material-ui/react-app-bar/
function NavBarMUI() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#C13A3A'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* desktop menu logo and icon */}
         
          <Typography
            variant="h5"
            noWrap
            component={NavLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
           
          </Typography>

          {/* mobile menu items in a flexbox */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                >
              <MenuIcon />
            </IconButton>            
            <Menu id="menu-appbar" anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.link} component={NavLink} to={page.link}>{page.label}</MenuItem>
              ))}
            </Menu>
          </Box>

         
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          
          </Typography>

          {/* desktop menu items are here, grouped into a flex box */}
          <Box sx={{ flexGrow: 2, display: { xs: 'none', md: 'flex' } }}>
            {/* render our menu items as NavLinks to make sure we maintain state */}
            {pages.map((page) => (
                <MenuItem key={page.link} component={NavLink} to={page.link}>{page.label}</MenuItem>
            ))}
          </Box>

          <Box sx={{ flexGrow: 1, justifySelf: 'flex-end', textAlign: 'right' }}>
                   
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBarMUI;