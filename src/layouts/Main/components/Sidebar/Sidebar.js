import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { 
  Divider
  ,Drawer
  ,Hidden
  ,ListItemIcon
  ,Typography
  ,MenuItem
 } from '@material-ui/core';
 
import ArtTrack from '@material-ui/icons/ArtTrack';
import PeopleIcon from '@material-ui/icons/People';
import Lock from '@material-ui/icons/Lock';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';

import { Profile, SidebarNav } from './components';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(1, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  },
  image: {
    marginTop: 30,
    marginRight:'25px',
    display: 'inline-block',
    maxWidth: 180,
    width: '100%'
  },
  logout:{
    ...theme.typography.button,    
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    justifyContent: "center"
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const pages = [
    {
      title: 'Lista Atenciones',
      href: '/Atenciones',
      icon: <PeopleIcon />
    },
    {
      title: 'Lista Pacientes',
      href: '/pacientes',
      icon: <ArtTrack />
    },
    {
      title: 'Pre Liquidación',
      href: '/preliquidacion',
      icon: <Lock />
    },
    {
      title: 'Mi Cuenta',
      href: '/account',
      icon: <AccountBoxIcon />
    }
  ]

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav
          className={classes.nav}
          pages={pages}
          onClose={onClose}
        />
        <img
          alt="Logo SuizaLab"
          className={classes.image}
          src="/images/logos/Logo-xs.png"
        />        
      </div>
      <Divider className={classes.divider} />
      <Hidden lgUp>
        <MenuItem className={classes.logout}>
          <ListItemIcon color="inherit">
            <PowerSettingsNew />
            <Typography variant="inherit">Salir</Typography>
          </ListItemIcon>
        </MenuItem>
      </Hidden>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
