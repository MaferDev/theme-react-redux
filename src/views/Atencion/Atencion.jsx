import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { 
  Grid,
  Typography,  
  Breadcrumbs,
} from '@material-ui/core';

import { AtencionDetalle, AtencionResultado } from './components';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  }
}));

const Atencion = () => {
  const classes = useStyles();

  const handleClick =()=>{
    
  }
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
            <Link color="inherit" to="/Atenciones" onClick={handleClick}>
              Lista Atenciones
            </Link>
            <Typography color="textPrimary">Atención</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          lg={4}
          md={6}
          xl={4}
          xs={12}
        >
          <AtencionDetalle />
        </Grid>
        <Grid
          item
          lg={8}
          md={6}
          xl={8}
          xs={12}
        >
          <AtencionResultado />
          
        </Grid>
      </Grid>
    </div>
  );
}

export default Atencion
