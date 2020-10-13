import React from 'react';
import{makeStyles}from '@material-ui/styles'
import { 
  Grid
} from '@material-ui/core'

const useStyles = makeStyles(theme=>({
  boxImage:{
    backgroundRepeat: 'repeat',
    width:'100%',    
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    overflow:'hidden'
  },
  image:{
    height:'100%'
  },
}))

const Slider = () => {
  const classes = useStyles()
  
  return (
    <Grid item sm={6} className={classes.boxImage}>
      <img className={classes.image} src='images/Login/medico-login.jpg' alt='Imagen portada' />
    </Grid>   
  )
}

export default Slider
