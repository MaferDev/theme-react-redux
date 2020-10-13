import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import {
  Typography,  
  Grid,
  Breadcrumbs,
  Link
} from '@material-ui/core';
import { PatientToolbar, PatientTable } from './components';
import mockData from './data';
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

const PatientList = () => {
  const classes = useStyles();

  const [users] = useState(mockData);
  const [compania] = useState("IAFAS DE LA MARINA DE GUERRA")
  const [selectAtencion,SetSelectAtencion]= useState(null)

  const handleClick=(event)=> {
    event.preventDefault();
    SetSelectAtencion(null);
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
        LISTA DE PACIENTES {compania}
      </Typography>
    </Grid>
    <Grid item>
      <Breadcrumbs aria-label="breadcrumb">
      {
        selectAtencion&&
        <Link color="inherit" to="/Atenciones" onClick={handleClick}>
          Lista Pacientes
        </Link>
      }
        <Typography color="textPrimary">{selectAtencion?'Paciente':'Lista Pacientes'}</Typography>
      </Breadcrumbs>
    </Grid>
  </Grid>
      <PatientToolbar />
      <div className={classes.content}>
        <PatientTable users={users} />
      </div>
    </div>
  );
};

export default PatientList;
