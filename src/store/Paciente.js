import Axios from "axios"

export const actionState= {
    NEW_REQUEST :'NEW_REQUEST',    
    RESET_STATE :'RESET_STATE', 
    RESPONSE_ERROR :'RESPONSE_ERROR',
    RESPONSE_SUCCESS :'RESPONSE_SUCCESS',    
    PATITENT_REGISTERED :'PATITENT_REGISTERED',
    PATITENT_NOT_REGISTERED :'PATITENT_NOT_REGISTERED',
    VALIDATE_MAIL :'VALIDATE_MAIL',
    CHANGE_MAIL :'CHANGE_MAIL' 
}

const initialState = {isPatientSearched:false,isShowAlert:false}

const urlAPI = 'api/RegistroPaciente/'
export const actionCreators={
    getDatos: docIdentidad => (dispatch)=>{        
        dispatch({type:actionState.NEW_REQUEST})
        Axios.post(urlAPI+"Search",docIdentidad)
        .then(res=>{
          //Se obtiene la data de la data de la respuesta 
          if(res.status===200)
          {
            const paciente = res.data
            dispatch({type:actionState.PATITENT_REGISTERED,paciente})   
          }       
          else{ 
            const paciente = {
              tipoDocumento:docIdentidad.TipoDocumento,
              numeroDocumento:docIdentidad.NumeroDocumento
            }
            dispatch({type:actionState.PATITENT_NOT_REGISTERED,paciente})
          }
          //Despacha la siguiente acción
          dispatch({type:actionState.RESPONSE_SUCCESS})
        }).catch(err=>{
          //const message=err.message
          const message="Lo sentimos no tenemos conexión con el servidor. Intentelo más tarde."
          dispatch({type:actionState.RESPONSE_ERROR,message})
        });
    },
    registerNewPaciente: newPaciente => async(dispatch)=>{
      dispatch({type:actionState.NEW_REQUEST})
      console.log(newPaciente)
      Axios.post(urlAPI+"Nuevo",newPaciente)
      .then(res=>{            
          //Despacha la siguiente acción
          let paciente = res.data
          dispatch({type:actionState.PATITENT_REGISTERED,paciente})
          dispatch({type:actionState.RESPONSE_SUCCESS})
      }).catch(err=>{
        const message="Lo sentimos no se pudo registrar el paciente. Error del Servidor."
        dispatch({type:actionState.RESPONSE_ERROR,message})
      })
    },
    validateMail:()=>(dispatch)=>dispatch({type:actionState.VALIDATE_MAIL}),
    changeContactPaciente: datosContact => async(dispatch)=>{
        dispatch({type:actionState.NEW_REQUEST})
        Axios.post(urlAPI+"ActualizarContacto",datosContact)
        .then(res=>{            
            //Despacha la siguiente acción
            console.log(datosContact)
            dispatch({type:actionState.CHANGE_MAIL,datosContact})
            dispatch({type:actionState.VALIDATE_MAIL})
            dispatch({type:actionState.RESPONSE_SUCCESS})
        }).catch(err=>{
          const message="Lo sentimos no se pudo cambiar el email. Error del Servidor."
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
    case actionState.PATITENT_REGISTERED :
      return {
          ...state,
          data:action.paciente,
          isPatientSearched:true,
          isPatientRegistered:true,
          isMailValidated:false,
      }
    case actionState.PATITENT_NOT_REGISTERED :
      return {
          ...state,
          data:action.paciente,
          isPatientSearched:true,
          isPatientRegistered:false
      }
    case actionState.CHANGE_MAIL :
      return {
        ...state,
        data:{
          ...state.data,
          email:action.datosContact.Email
        }
      }
    case actionState.VALIDATE_MAIL :
      return {
        ...state,
        isMailValidated:true,
        isShowAlert:true,
        requestMessage:"Email Validado!"
      }
    case actionState.RESET_STATE :
        return initialState
        
    default:
        return state
  }
}
