import Axios from "axios"

export const actionState= {
  NEW_REQUEST :'NEW_REQUEST',
  RESPONSE_ERROR :'RESPONSE_ERROR',
  RESPONSE_SUCCESS :'RESPONSE_SUCCESS',
  RESPONSE_SEDE :'RESPONSE_SEDE',
  RESPONSE_CITAS_MES :'RESPONSE_CITAS_MES',
  RESPONSE_CITAS_DIA :'RESPONSE_CITAS_DIA',
  RESPONSE_UBIGEO :'RESPONSE_UBIGEO',
  RESPONSE_DOCPAGO :'RESPONSE_DOCPAGO', 
  
  //Reportes
  RESPONSE_REP_GENERAL :'RESPONSE_REP_GENERAL', 
  RESPONSE_REP_ATENCIONES_DIA :'RESPONSE_REP_ATENCIONES_DIA', 
  RESPONSE_REP_LIST_ATENCIONES :'RESPONSE_REP_LIST_ATENCIONES', 
}

const initialState = {}

const urlAPI = "api/sistema/"

export const actionCreators={
  getDistritos: () =>  (dispatch)=>{ 
    dispatch({type:actionState.NEW_REQUEST})
    Axios.get(urlAPI+"distritos").then(res=>{
      const distritos=res.data
      dispatch({type:actionState.RESPONSE_UBIGEO,distritos})
      dispatch({type:actionState.RESPONSE_SUCCESS})
    })
    .catch(err=>{
        const message="Lo sentimos, tenemos problemas con el Servidor."
      dispatch({type:actionState.RESPONSE_ERROR,message})
    })
  },
  getSucursales: () =>  (dispatch)=>{ 
    dispatch({type:actionState.NEW_REQUEST})
    Axios.get(urlAPI+"sedes").then(res=>{
      const sedes=res.data
     // console.log(sedes)
      dispatch({type:actionState.RESPONSE_SEDE,sedes})
      dispatch({type:actionState.RESPONSE_SUCCESS})
    })
    .catch(err=>{
        const message="Lo sentimos, tenemos problemas con el Servidor."
      dispatch({type:actionState.RESPONSE_ERROR,message})
    })
  },
  getListCitasMes: data =>  (dispatch)=>{ 
    dispatch({type:actionState.NEW_REQUEST})
    Axios.post(urlAPI+'cita-mes',data).then(res=>{
      const citas=res.data
      dispatch({type:actionState.RESPONSE_CITAS_MES,citas})
      dispatch({type:actionState.RESPONSE_SUCCESS})
    })
    .catch(err=>{
      console.log(err)
    })
  },
  getListCitasDia: data =>  (dispatch)=>{ 
    dispatch({type:actionState.NEW_REQUEST})
    Axios.post(urlAPI+'cita-dia',data).then(res=>{
      const citas=res.data
      dispatch({type:actionState.RESPONSE_CITAS_DIA,citas})
      dispatch({type:actionState.RESPONSE_SUCCESS})
    })
    .catch(err=>{
      console.log(err)
    })
  },
  GetListDocPago: () =>  (dispatch)=>{ 
    dispatch({type:actionState.NEW_REQUEST})
    Axios.get(urlAPI+"documento-pago").then(res=>{
      const docpagos=res.data 
      
      dispatch({type:actionState.RESPONSE_DOCPAGO,docpagos})
      dispatch({type:actionState.RESPONSE_SUCCESS})
    })
    .catch(err=>{
        const message="Lo sentimos, tenemos problemas con el Servidor."
      dispatch({type:actionState.RESPONSE_ERROR,message})
    })
  },

  //REPORTES  
  GetReportGeneral: () =>  (dispatch)=>{ 
    dispatch({type:actionState.NEW_REQUEST})
    Axios.get(urlAPI+"reporte/general").then(res=>{
      const reporte=res.data
      dispatch({type:actionState.RESPONSE_REP_GENERAL,reporte})
      dispatch({type:actionState.RESPONSE_SUCCESS})
    })
    .catch(err=>{
        const message="Lo sentimos, tenemos problemas con el Servidor."
      dispatch({type:actionState.RESPONSE_ERROR,message})
    })
  },
  GetReportAtcDia: () =>  (dispatch)=>{ 
    dispatch({type:actionState.NEW_REQUEST})
    Axios.get(urlAPI+"reporte/atc/7").then(res=>{
      const reporte=res.data
      dispatch({type:actionState.RESPONSE_REP_ATENCIONES_DIA,reporte})
      dispatch({type:actionState.RESPONSE_SUCCESS})
    })
    .catch(err=>{
        const message="Lo sentimos, tenemos problemas con el Servidor."
      dispatch({type:actionState.RESPONSE_ERROR,message})
    })
  },
  GetReportListAtc: data =>  (dispatch)=>{ 
    dispatch({type:actionState.NEW_REQUEST})
    Axios.post(urlAPI+"reporte/listatc",data).then(res=>{
      const reporte=res.data
      dispatch({type:actionState.RESPONSE_REP_LIST_ATENCIONES,reporte})
      dispatch({type:actionState.RESPONSE_SUCCESS})
    })
    .catch(err=>{
      const message="Lo sentimos, tenemos problemas con el Servidor."
      dispatch({type:actionState.RESPONSE_ERROR,message})
    })
  },
}

export const reducer = (state,action)=>{
  state = state||initialState

  switch(action.type)
  {
    case actionState.NEW_REQUEST :
      return {
        ...state,
        isLoading:true,
        isShowAlert:false
      }
    case actionState.RESPONSE_ERROR :
      return {
        ...state,
        isRequestError:true,
        requestMessage:action.message,
        isLoading:false
      }
    case actionState.RESPONSE_SUCCESS :
      return {
        ...state,
        isRequestError:false,
        requestMessage:action.message||null,
        isLoading:false
      }
    case actionState.RESPONSE_UBIGEO :
      return {
        ...state,
        distritos:action.distritos
      }
    case actionState.RESPONSE_CITAS_MES :
      return {
        ...state,
        listCitasMes:action.citas
      }
    case actionState.RESPONSE_CITAS_DIA :
      return {
        ...state,
        listCitasDia:action.citas
      }
    case actionState.RESPONSE_SEDE :
      return {
        ...state,
        sedes:action.sedes
      }
    case actionState.RESPONSE_DOCPAGO :
      return {
        ...state,
        docPagos:action.docpagos
      }
    case actionState.RESPONSE_REP_GENERAL :
      return {
        ...state,
        reporte:{
          ...state.reporte,
          ventaTotal:action.reporte.ventaTotal,
          ventaTotalPresencial:action.reporte.ventaTotalPresencial,
          citaTotal:action.reporte.citaTotal,
          citaSede:action.reporte.citaSede,
        }
      }
    case actionState.RESPONSE_REP_ATENCIONES_DIA :
      return {
        ...state,
        reporte:{
          ...state.reporte,
          grupAtenciones:action.reporte
        }
      }
    case actionState.RESPONSE_REP_LIST_ATENCIONES :
      return {
        ...state,
        reporte:{
          ...state.reporte,
          listAtenciones:action.reporte
        }
      }
    default:
      return state
  }
}
