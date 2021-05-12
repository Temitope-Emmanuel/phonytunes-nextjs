import React from 'react';
import { withStyles, Theme, createStyles, makeStyles} from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from "./TableCell"

interface IProps{
  fields:any[];
  className?:object
  isLoaded:boolean;
  link?:any;
  error?:boolean
}

const useStyles = makeStyles((theme) => createStyles({
  root:(props:Partial<IProps>) => ({
    backgroundColor:props.error ? theme.palette.warning.light : "transparent"
  })
}))



const StyledRow:React.FC<IProps> = ({fields,className,link,error}) => {
  const classes = useStyles({error})

  return(
    <TableRow className={`${classes.root} ${link ? "cursor-pointer" : ""}`} onClick={link ? link : null}>
      {fields.map((item,idx) => (
        <TableCell key={idx} >
          {item}
        </TableCell>
      ))}
    </TableRow>
  )
}

export default StyledRow