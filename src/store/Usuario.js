//import Axios from "axios"

export const actionState= {
  NEW_REQUEST :'NEW_REQUEST',
  RESPONSE_ERROR :'RESPONSE_ERROR',
  RESPONSE_SUCCESS :'RESPONSE_SUCCESS',
  RESPONSE_LOGIN :'RESPONSE_LOGIN',
  RESET_STATE :'RESET_STATE'
}

const initialState = {isLogin:false}

//const urlAPI = 'api/Login/'

export const actionCreators={
  LoginUser: data => (dispatch)=>{ 
    console.log("User",data)
    dispatch({type:actionState.NEW_REQUEST})
    const user = {type:'USER',user:'ADMIN', nombreComplet:"ADMIN", compania:"IAFAS DE LA MARINA DE GUERRA DE LA NAVAL",permisos:{preliquidacion:true,admin:true,gestionUsuarios:true,actualizarDatosPaciente:true}}
    localStorage.setItem('user',JSON.stringify(user.token))
    dispatch({type:actionState.RESPONSE_LOGIN,user})
    dispatch({type:actionState.RESPONSE_SUCCESS})
    /*
    Axios.post(urlAPI,data).then(res=>{
      const user=res.data
      console.log(user)
      if(servicios.length>0) {
        dispatch({type:actionState.RESPONSE_LOGIN,servicios})
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
    */
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
    case actionState.RESPONSE_LOGIN :
      return {
        ...state,
        data:action.user,
        isLogin:true
      }
        
    case actionState.RESET_STATE :
      return initialState

    default:
      return state
  }
}
