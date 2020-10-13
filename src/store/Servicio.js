import Axios from "axios"

export const actionState= {
  NEW_REQUEST :'NEW_REQUEST',
  RESPONSE_ERROR :'RESPONSE_ERROR',
  RESPONSE_SUCCESS :'RESPONSE_SUCCESS',
  RESPONSE_SERVICE :'RESPONSE_SERVICE',
  RESET_STATE :'RESET_STATE'
}

const initialState = {isExistServices:false}

const urlAPI = 'api/Servicio/'

export const actionCreators={
  getServicios: () => (dispatch)=>{ 
    dispatch({type:actionState.NEW_REQUEST})

    Axios.get(urlAPI).then(res=>{
      const servicios=res.data
      if(servicios.length>0) {
        dispatch({type:actionState.RESPONSE_SERVICE,servicios})
        dispatch({type:actionState.RESPONSE_SUCCESS})
      }else{
        const message="Lo sentimos, tenemos problemas al obtener la lista de servicios. Error del Servidor."
        dispatch({type:actionState.RESPONSE_ERROR,message})
      }
    })
    .catch(err=>{
      const message="Lo sentimos, tenemos problemas al obtener la lista de servicios. Error del Servidor."
      dispatch({type:actionState.RESPONSE_ERROR,message})
    })
  },
  setInitialState: ()=>(dispatch)=>dispatch({type:actionState.RESET_STATE})
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
    case actionState.RESPONSE_SERVICE :
      return {
        ...state,
        data:action.servicios,
        isExistServices:true
      }
        
    case actionState.RESET_STATE :
      return initialState

    default:
      return state
  }
}
