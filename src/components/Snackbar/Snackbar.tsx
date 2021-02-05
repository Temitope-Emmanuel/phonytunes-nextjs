import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import {Alert} from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import {IAlert,AlertContext} from "./SnackContext"


export const SnackConsumer = <P extends object>(Component:React.ComponentType<P>) => (
  ({...props}) => (
  <AlertContext.Consumer>
    {(context) => (
        <Component context={context} {...props as P} />
    )}
</AlertContext.Consumer>)
)

function MuiAlert(props:any) {
  return <Alert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));


const SnackbarComponent:React.FC<IAlert> = ({open,payload:{type,message},...props}) => {
  const classes = useStyles();


  const alertMessage = () => {
    switch(type){
      case "error":
        return <MuiAlert severity="error">{message}</MuiAlert>;
      case "warning":
        return <MuiAlert severity="warning">{message}</MuiAlert>;
      case "info":
        return <MuiAlert severity="info">{message}</MuiAlert>;
      case "success":
        return <MuiAlert severity="success">{message}</MuiAlert>;
      default:
        return <MuiAlert severity="info">{message}</MuiAlert> 
    }
  }
  
  return (
      <Snackbar open={open} autoHideDuration={5000} >
        {
          alertMessage()
        }
      </Snackbar>
  );
}


export default SnackConsumer(SnackbarComponent)