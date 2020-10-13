import React,{useState,useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Grid,
  Button,
} from '@material-ui/core';

import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers'

import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';

//Dependencias para la fecha
//import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import esLocale from "date-fns/locale/es"
import format from "date-fns/format"

import {connect} from 'react-redux'

const useStyles = makeStyles(theme=>({
  root: {
    width: '100%',
  },
  paper: {
    position: 'absolute',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  margin:{
    margin: theme.spacing(2),
  },
  grid:{
    margin: theme.spacing(1),
    marginTop:0,
    width: '100%',
  },
  fecha:{
    marginTop:0,
    width:'100%',
  },
  text:{
    color:theme.palette.text.secondary,
    '& *':{
      color:theme.palette.text.secondary
    }
  },
  btnSearch:{    
    marginBottom:theme.spacing(1),
  },

}))
/* Función que suma o resta días a una fecha, si el parámetro
   días es negativo restará los días*/
function operarFecha(fecha, dias){
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
}

const FilterAtenciones = ({onSave,sistema,data})=> {  
  const classes = useStyles();
  const [filtroOpen, setFiltroOpen] = React.useState(true);
  const Finicial = operarFecha(new Date(), -7)
  const FinFinal = operarFecha(new Date(), -1)
  const [selectedDateIni, setSelectedDateIni] = useState(Finicial)
  const [selectedDateFin, setSelectedDateFin] = useState(FinFinal)
  const [fInicio, setFinicio] = React.useState(null);
  const [fFin, setFfin] = React.useState(null);

  //Función para cambiar fecha iniicio
  const handleChangeFechaInicio = (date) => {
    setSelectedDateIni(date)
  }
  const handleChangeFechaFin= (date) => {
    setSelectedDateFin(date)
  }
  useEffect(()=>{
    setFinicio(format(selectedDateIni, "dd/MM/yyyy", { locale: esLocale }))
  },[selectedDateIni])
  
  useEffect(()=>{
    setFfin(format(selectedDateFin, "dd/MM/yyyy", { locale: esLocale }))
  },[selectedDateFin])
    
  const handleFind  = event=> {
    onSave({ 
      FechaInicial: fInicio, 
      FechaFinal: fFin
    })
  }

  useEffect(()=>{
    if(fInicio&&fFin&&!data)
    {
      onSave({ 
        FechaInicial: fInicio, 
        FechaFinal: fFin
      })
    }
  },[fInicio,fFin,onSave,data])

  return (
    <Paper className={classes.root}>
      <div>
        <Button size="medium" className={clsx([classes.margin,classes.text])}  
            startIcon={<FilterListIcon/>}
            onClick={
              ()=>setFiltroOpen(!filtroOpen)
        }
            >
            Filtro
        </Button>
      </div>
      
       {
        filtroOpen&&        
        <Grid
          container
          spacing={3} 
          className={classes.grid}  
          alignItems='flex-end'
        >
          <Grid item xs={6} sm={3}>
                <MuiPickersUtilsProvider 
                  utils={DateFnsUtils}
                  locale={esLocale}
                >
                  <KeyboardDatePicker
                    className={clsx([classes.fecha,classes.text])}
                    name="fInicio"
                    label="Fecha de Inicio"
                    margin="normal"
                    format="dd/MM/yyyy"               
                    variant="inline"
                    disableToolbar
                    autoOk
                    value={selectedDateIni}
                    onChange={handleChangeFechaInicio}
                    KeyboardButtonProps={{
                      'aria-label': 'Cambiar fecha',
                    }}
                  />
                </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={6} sm={3}>
                <MuiPickersUtilsProvider 
                  utils={DateFnsUtils}
                  locale={esLocale}
                >
                  <KeyboardDatePicker
                    className={clsx([classes.fecha,classes.text])}
                    name="fFin"
                    label="Fecha de Fin"
                    margin="normal"
                    format="dd/MM/yyyy"              
                    variant="inline"
                    disableToolbar
                    autoOk
                    value={selectedDateFin}
                    onChange={handleChangeFechaFin}
                    KeyboardButtonProps={{
                      'aria-label': 'Cambiar fecha',
                    }}
                  />
                </MuiPickersUtilsProvider>
           </Grid>
          <Grid item xs={6} sm={3}>
            <Button
              variant="contained"
              color="primary"
              type="submit"  
              endIcon={<SearchIcon />}
              onClick={handleFind}
              className={classes.btnSearch}  
              //disabled={sistema.isLoading}
            >
              Buscar
            </Button>
          </Grid>                 
        </Grid>
    }
    </Paper>
  );
}

const mapToStateProps = state=>({
  sistema:state.sistema
})

export default connect(mapToStateProps,{})(FilterAtenciones)