import React, { useState, useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import{makeStyles}from '@material-ui/styles'
import validate from 'validate.js'
import { 
  TextField,
  Button,
} from '@material-ui/core'

import CircularProgress from '@material-ui/core/CircularProgress'
import WarningIcon from '@material-ui/icons/Warning'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { actionCreators } from '../../../../store/Usuario';

const useStyles = makeStyles(theme=>({
  form:{
    marginBottom:'0.5rem',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    },
    '& *':{
      textAlign:'left'
    }   
  },
  textField: {    
    marginTop: theme.spacing(2),
    '& *':{
      borderRadius:'1rem',
    },
    '& label':{
      color:theme.palette.text.secondary,
    },
  },
  signInButton: {
    margin: theme.spacing(1, 0),
    borderRadius:'1rem',    
  },
  mensajeLogin:{
    ...theme.typography.caption,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(2, 0),
    textAlign:'center',
    color:theme.palette.danger.main,
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    color: theme.palette.primary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  }

}))

const FormLogin = props => {
  const classes = useStyles()
  const history = useHistory()
  //funciones de usuario
  const {LoginUser } = props
  //Stores
  const { usuario } = props

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  })

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values])

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  }

  const hasError = field => formState.touched[field] && formState.errors[field] ? true : false;


  //Cuando el usuario se loggee
  useEffect(() => {
    if(usuario.isLogin){
      //Se guarda a nivel local el usuario
      
      history.push('/') // Se redirecciona a la principal
    }else{
      //Verificamos si existe el token del usuario a nivel local
      if(localStorage.getItem('token')){
        console.log('Existe un usuario')
      }
    }
  }, [usuario.isLogin,history])

  return (
    <form
      className={classes.form}
      onSubmit={event=>{event.preventDefault();LoginUser(formState.values)}}
    >
      <TextField
        className={classes.textField}
        error={hasError('user')}
        fullWidth
        helperText={
          hasError('user') ? formState.errors.user[0] : null
        }
        label="USUARIO"
        name="user"
        onChange={handleChange}
        type="text"
        value={formState.values.user || ''}
        variant="outlined"
        autoComplete="off"
      />
      <TextField
        className={classes.textField}
        error={hasError('password')}
        fullWidth
        helperText={
          hasError('password') ? formState.errors.password[0] : null
        }
        label="CONTRASEÑA"
        name="password"
        onChange={handleChange}
        type="password"
        value={formState.values.password || ''}
        autoComplete="off"
        variant="outlined"
      />

      {
        !usuario.isLoading&&usuario.requestMessage&&<div className={classes.mensajeLogin}><WarningIcon /> {usuario.requestMessage}</div> 
      }
      <div className={classes.wrapper}>
        <Button
          className={classes.signInButton}
          variant="contained"
          color="primary"
          type="submit"
          size="large"
          fullWidth
          disabled={!formState.isValid||usuario.isLoading}
          onClick={event=>{event.preventDefault();LoginUser(formState.values)}}
        >
          Iniciar Sesión
        </Button>
        {usuario.isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>

    </form>  
  )
}


const schema = {
  user: {
    presence: { allowEmpty: false, message: '. Su usuario es incorrecto!' },
    length: {
      maximum: 11,
      minimum: 5
    }
  },
  password: {
    presence: { allowEmpty: false, message: '. Su contraseña es incorrecta!' },
    length: {
      maximum: 15,
      minimum: 4,
    }
  }
}
const mapStateToProps = state =>({
  usuario:state.usuario
})

export default connect(mapStateToProps,
  dispatch=>bindActionCreators(actionCreators,dispatch))
  (FormLogin)
