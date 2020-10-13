import React from 'react';
import{makeStyles}from '@material-ui/styles'
import { 
  Grid
} from '@material-ui/core'

const useStyles = makeStyles(theme=>({
  root:{
    marginTop:theme.spacing(1),     
  },
  redSocialItem:{
    margin:theme.spacing(1),
    maxWidth: '50px',
    maxHeight: '50px',
  }
}))

const SocialButtons = () => {
  const classes = useStyles();
  const ListRedesSociales = [
    {
      id:'IconFacebook',
      path:'https://www.facebook.com/suizalab',
      image:'images/Login/icon-facebook.png',
      descripcion:'Facebook'
    },
    {
      id:'IconLinkedin',
      path:'https://www.linkedin.com/in/suiza-lab-89761971',
      image:'images/Login/icon-linkedin.png',
      descripcion:'Linkedin'
    },
    {
      id:'IconTwitter',
      path:'https://twitter.com/SuizaLab',
      image:'images/Login/icon-twitter.png',
      descripcion:'Twitter'
    },
    {
      id:'IconYoutube',
      path:'https://www.youtube.com/user/suizalabmarketing?feature=c4-feed-u',
      image:'images/Login/icon-youtube.png',      
      descripcion:'Youtube'
    }
  ]  
  return (
    <Grid 
      container
      spacing={1}       
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.root}
    >
    
    {
      ListRedesSociales&&ListRedesSociales.map(rs=>
        
          <a 
            href={rs.path}
            target="_blank"
            title={'Ir a '+rs.descripcion} 
            rel="noopener noreferrer"
          >
            <img                         
              className={classes.redSocialItem}
              src={rs.image} 
              alt={rs.id} 
            />
          </a>
        
      )
    }       
    </Grid>
  )
}

export default SocialButtons
