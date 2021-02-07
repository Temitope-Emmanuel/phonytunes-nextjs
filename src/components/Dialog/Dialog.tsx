import React from 'react';
import Dialog from '@material-ui/core/Dialog';



interface SimpleDialogProps {
  open: boolean;
  handleToggle:() => void
}

const SimpleDialog:React.FC<SimpleDialogProps> = ({open,handleToggle,children}) => {

  return (
    <Dialog onClose={handleToggle} aria-labelledby="simple-dialog-title"
     fullWidth={true} maxWidth="sm" open={open}>
        {children}
    </Dialog>
  );
}

export default SimpleDialog