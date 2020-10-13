import React, { useEffect,useState,forwardRef } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';

import MaterialTable ,{ MTableToolbar }from 'material-table';
//
 
import { ExportExcel } from '../../components';

import {  
  Pageview as PageviewIcon,
} from '@material-ui/icons';

//estilos para la tabla
import {
  ArrowDownward,Check,ChevronLeft,ChevronRight,Clear,
  FilterList,FirstPage, LastPage, Remove,SaveAlt , Search,ViewColumn
} from '@material-ui/icons'

//Importar componentes
//import {UsersToolbar } from '../../components'

const tableIcons = {
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),    
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  content: {
    padding: 0
  },
  actions: {
    justifyContent: 'flex-end'
  },
  title:{    
    backgroundColor:theme.palette.background.paper,
    '& *':{      
      color:theme.palette.secondary.dark,
      fontWeight:'600'
    }
  },  
  inline:{
    display:'flex',
    alignItems:'center',
    margin:theme.spacing(1)
  },
  sucursales:{
    display:'flex',
    alignItems:'flex-end',
    margin:theme.spacing(1)
  },
}));


const ListaAtenciones = props => {
  const { className } = props;
  const classes = useStyles();
  const { data,onSelect } = props;
  const [dataTable, setDataTable] = useState([])    
  //const [totalAtenciones, setTotalAtenciones] = useState([])  
  //const theme = useTheme();

  //const colors = [theme.palette.warning.main,theme.palette.primary.main,theme.palette.danger.main,theme.palette.success.main]

  const [columTable] = useState([
    { title: 'TICKET', field: 'ticket' },
    { title: 'ATENCIÓN', field: 'atencion', align:'center'  },
    { title: 'PACIENTE', field: 'paciente'},
    { title: 'CÓDIGO', field: 'codigo' },
    { title: 'COMPAÑIA', field: 'compania' }
  ]);

  const [actionTable] = useState([
    {
      icon: ()=><PageviewIcon color='secondary' />,
      tooltip: 'Ver',
      onClick: (event, rowData) => onSelect(rowData)
    }
  ]);

  const [optionsTable] = useState( {
    headerSelectionProps: {
      color: "primary",
    },
    headerStyle: {
      backgroundColor: '#707070',
      color: '#FFFFFF',
      textTransform:'uppercase',
    },
    rowStyle: {
      color: '#555555',
      fontSize: '14px',
    },
    exportButton: false,
    exportFileName: "LISTADO DE ATENCIONES",
    exportAllData:false,
    pageSize:10,
    pageSizeOptions:[10,20,50],
    showTitle:false
  })  
  
  const [localizationTable] = useState({    
    pagination: {
      labelDisplayedRows: '{from}-{to} de {count}',
      labelRowsSelect: 'Registros',
      labelRowsPerPage: 'Registro por Página:',
      firstAriaLabel:'Primera Página',
      firstTooltip:'Primera Página',
      previousAriaLabel:'Página Anterior',
      previousTooltip:'Página Anterior',
      nextAriaLabel:'Siguiente Página',
      nextTooltip:'Siguiente Página',
      lastAriaLabel:'Última Página',
      lastTooltip:'Última Página',
    },
    toolbar: {
      nRowsSelected: '{0} registro(s) seleccionados',
      exportTitle:'Exportar',
      exportAriaLabel:'Exportar',
      exportName:'Exportar Excel',
      searchTooltip:'Buscar',
      searchPlaceholder:'Buscar',
    },
    header: {
      actions: 'ACCIONES'
    },
    body: {
      emptyDataSourceMessage: 'No records to display',
      filterRow: {
        filterTooltip: "Filtro",
        filterPlaceHolder: "Filtrar",
      }
    }    
  });

  //configuramos la data de la tabla
  useEffect(()=>{
    if(data)
    {
      const dataRows =  data.map(c=> {      
        return {
          ticket: c.ticket+',',
          atencion:c.atencion,
          paciente: c.paciente,
          codigo: c.codigo,
          compania: c.compania,
        }
      })

      setDataTable(dataRows)
    }    
  },[data])

  return (
    <div className={clsx(classes.root, className)}>      
      <MaterialTable
          columns={columTable}
          data={dataTable}        
          actions={actionTable}
          icons={tableIcons}
          options={optionsTable}
          localization={localizationTable}
          components={{
            Toolbar: props => (
              <div>
                <MTableToolbar {...props} />
                <div style={{padding: '0px 10px', paddingBottom:'5px'}}>
                  <div className = {classes.inline}>
                    {
                      <ExportExcel 
                        fileName={"LISTADO DE ATENCIONES"} 
                        header={columTable} 
                        data = {dataTable}
                      />
                    }
                  </div>
                </div>
              </div>
            ),
            }
          }
      />

    </div>
  );
};

ListaAtenciones.propTypes = {
  className: PropTypes.string
};

export default ListaAtenciones;
