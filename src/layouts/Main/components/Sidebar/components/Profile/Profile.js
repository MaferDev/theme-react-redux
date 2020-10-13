import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';
import {connect} from 'react-redux'
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 120,
    height: 120
  },
  name: {
    marginTop: theme.spacing(1)
  },
  compania:{
    textAlign: 'center',
  }
}));

const Profile = props => {
  const { className, ...rest } = props;
  //const {usuario:{data}} = rest
  const classes = useStyles();

    const user = {type:'USER',user:'ADMIN', nombreCompleto:"ADMIN ADMIN", compania:"IAFAS DE LA MARINA DE GUERRA DE LA NAVAL",permisos:{preliquidacion:true,admin:true,gestionUsuarios:true,actualizarDatosPaciente:true}}
    

  
  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={'/images/avatars/iconBoot.png'}
        to="/account"
      />
      
      <Typography
        className={classes.name}
        variant="h4"
      >
        {user.nombreCompleto}
      </Typography>
      <Typography variant="overline" className={classes.compania}>{user.compania}</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
}

const mapToStateProps=state=>({
  usuario:state.usuario
})

export default connect(mapToStateProps,{})(Profile);
