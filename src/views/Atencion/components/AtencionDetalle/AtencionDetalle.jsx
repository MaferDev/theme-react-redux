import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
//import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Divider,
  LinearProgress,
  Grid  ,
  CardHeader
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex'
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  gridTable:{
    backgroundColor:theme.palette.primary.main,
    '& *':{
      color:theme.palette.background.paper
    }
  },
  titleTable: {
    fontWeight:'600',
    textAlign:'center',
  },
  title:{
    fontWeight:'600',
    textAlign:'right'
  }
}));

const AccountProfile = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const paciente = {
    ticket:'12345092053',
    nombreCompleto: 'Shen Zhi',
    dni: '29460566',
    sexo: 'MASCULINO',
    edad: '74',
    avatar: '/images/avatars/avatar_11.png'
  }

  const [listServicios] = React.useState([
    {
      codigo:'12345',
      examen:'COVID 19_TOMA DE MUESTRA_CARPA_NAVAL',
      estado: 'EN PROCESO'
    }
  ])

  const text=(name, valor)=>
    <React.Fragment>
      <Grid item xs={6} sm={3} >
        <Typography variant='h6' className={classes.title}>
          {name}:
        </Typography>
      </Grid>
      <Grid item xs={6} sm={3} >
        <Typography variant='body1'>
          {valor}
        </Typography>
      </Grid>
    </React.Fragment>
  
    
  return (
    <div 
      {...rest}
      className={clsx(classes.root, className)}
    > 
      <Card>
        <CardContent>
          <div className={classes.details}>
            <div>
              <Typography
                gutterBottom
                variant="h3"
              >
                Ticket N° {paciente.ticket}
              </Typography>
              <Typography
                className={classes.locationText}
                color="textSecondary"
                variant="body1"
              >
                <b>Paciente:</b> {paciente.nombreCompleto} ({paciente.edad} Años)
              </Typography>
              <Typography
                className={classes.locationText}
                color="textSecondary"
                variant="body1"
              >
                <b>DNI N°</b> {paciente.dni}
              </Typography>
              <Typography
                className={classes.dateText}
                color="textSecondary"
                variant="body1"
              >
                <b>SEXO:</b> {paciente.sexo}
              </Typography>
            </div>
            <Avatar
              className={classes.avatar}
              src={paciente.avatar}
            />
          </div>
          <div className={classes.progress}>
            <Typography variant="body1">Resultados: 80%</Typography>
            <LinearProgress
              value={80}
              variant="determinate"
            />
          </div>
        </CardContent>
      </Card>
      <Card>      
        <CardHeader
          title="DETALLES DE ATENCIÓN"
          color='primary'
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            {text("FECHA","17/09/2020")}
            {text("TOTAL","S/.179.02")}
            <Grid item xs={12} container >

            </Grid>
          </Grid>
          <Grid
            container
            spacing={3}
          >
              <Grid item xs={3} className={classes.gridTable}>
                <Typography variant='body1' className={classes.titleTable}>
                  CÓDIGO
                </Typography>
              </Grid>
              <Grid item xs={6} className={classes.gridTable}>
                <Typography variant='body1' className={classes.titleTable}>
                  EXÁMEN
                </Typography>
              </Grid>
              <Grid item xs={3} className={classes.gridTable}>
                <Typography variant='body1' className={classes.titleTable}>
                  ESTADO
                </Typography>
              </Grid>

          </Grid>
            {
              listServicios&&listServicios.map((s,index)=>
                <Grid
                  container
                  spacing={3}
                  key={index}
                >
                  <Grid item xs={3}>
                    <Typography variant='body1'>
                      {s.codigo}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='body1'>
                      {s.examen}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant='body1'>
                      {s.estado}
                    </Typography>
                  </Grid>
    
              </Grid>
              )
            }
        </CardContent>            
      </Card>
    </div>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string
};

export default AccountProfile;
