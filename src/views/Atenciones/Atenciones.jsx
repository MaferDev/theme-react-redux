import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import {
  Typography,  
  Breadcrumbs,  
  Grid
} from '@material-ui/core';

import { 
  ListaAtenciones as ListaAtencionesView,
  FilterAtenciones as FilterAtencionesView,
} from './components'
import { useHistory } from 'react-router-dom'

import data from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  title:{
    margin: theme.spacing(2,0)
  }
}));

const Atenciones = () => {
  const classes = useStyles();
  const history = useHistory()

  const [users] = useState(data);
  const [filtro,setFiltro]= useState(null)
  const [selectAtencion,setSelectAtencion]= useState(null)
/*
  useEffect(()=>{
    history.push('/atenciones/view')
  },[selectAtencion])
  */
  return (
    <div className={classes.root}>      
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item>        
          <Typography variant='h4' component='h4' className={classes.title} >
            IAFAS DE LA MARINA DE GUERRA DEL PERU
          </Typography>
        </Grid>
        <Grid item>
          <Breadcrumbs aria-label="breadcrumb">
            <Typography color="textPrimary">Lista Atenciones</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>
      <div>
        <FilterAtencionesView onSave={setFiltro} />    
        <div className={classes.content}>
        {
          filtro&&
          <ListaAtencionesView data={users} filtro={filtro} onSelect={setSelectAtencion}  />
        }
        </div>
      </div>
    </div>
  );
};

export default Atenciones;
