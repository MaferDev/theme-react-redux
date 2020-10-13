import React from 'react';
import{makeStyles}from '@material-ui/styles'
import PropTypes from 'prop-types';
import { 
  Container, 
  Typography,
  Divider,
  Grid,
  Hidden
} from '@material-ui/core'
import {
  SocialButtons, 
  Slider,
  FormLogin
} from './Components'
const useStyles = makeStyles(theme=>({
  root:{    
    width: '100%',
    height: '100%',    
    backgroundColor:theme.palette.personalized.garylight,
    //backgroundImage: 'url(images/Login/fondo.jpg)',
    //backgroundPosition: 'center',
    //backgroundSize: 'cover', 
    minHeight:'100vh',
    display:'flex',
    flexWrap:'wrap',
    justifyContent:'center',
    alignItems:'center',
    padding:theme.spacing(2),
  },
  wrapLogin:{
    maxWidth:'876px',
    backgroundColor:theme.palette.primary.main,
    borderRadius:'10px',
    overflow:'hidden',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: '10px',
  },
  container:{
    backgroundColor:theme.palette.background.paper,
  },
  boxLogin:{
    maxWidth: '400px',
    left: 0,
    right: 0,
    margin:'auto',
  },
  logo:{
    height: '150px',
    margin: theme.spacing(2,0),
    textAlign:'center',
    [theme.breakpoints.down('sm')]:{
      height:'150px'
    }
  },
  logoImg:{
    height: '100%'
  },
  title:{
    marginTop: theme.spacing(1),
    textAlign:'center'
  }
}))

const SignIn = () => {

  const classes = useStyles();

  return (
      <Container maxWidth="xl"
        className={classes.root}
      >
        <div className={classes.wrapLogin}>        
          <Grid 
            container 
            className={classes.container}
          >
            <Hidden smDown>
              <Slider />
            </Hidden>

            <Grid item sx={12} md={6} className={classes.boxLogin}>
              <div className={classes.logo}>
                  <img className={classes.logoImg}  src="images/logos/Logo-xs.png" alt="logoEmpresa" />
              </div>
              <Typography className={classes.title} variant='h3' component='h2' color='primary'>
                <b>RESULTADOS COMPAÑIAS</b>
              </Typography>

              <div className={classes.contentBody}>
                <FormLogin />  
              </div>              
              <Divider />
              <SocialButtons />                         
            </Grid>
          </Grid>
        </div>

      </Container>
    )
}


SignIn.propTypes = {
  history: PropTypes.object
};

export default SignIn
