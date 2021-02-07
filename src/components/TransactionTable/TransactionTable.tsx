import React, { ChangeEvent } from "react"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Table, TableBody, TableCell,
  TableContainer,TableRow
} from '@material-ui/core';
import { Accordion, IconButton, AccordionDetails, AccordionSummary, AccordionActions } from "@material-ui/core"
import { BsDownload } from 'react-icons/bs';
import { Button, Typography, ButtonGroup, Box, TablePagination } from "@material-ui/core"
import { green, deepOrange, orange } from "@material-ui/core/colors"
import { AlertContext } from "../Snackbar/SnackContext"
import {ChatList} from "../../views/Chat"
import { ITransaction} from "../../core/models"
import { IoIosArrowDown } from 'react-icons/io';
import { AiFillDelete } from 'react-icons/ai';
import useCollection from "../../utils/useCollection"
import useDocument from "../../utils//useDocument"
import getUser from "../../utils/userAuth"
import { MdBurstMode } from "react-icons/md";
import { Dialog } from "../Dialog"
import { FirebaseContext } from "../../firebase";
import {formatDistanceToNow} from "date-fns"

const useStyles = makeStyles((theme: Theme) => (
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "end",
      backgroundColor: orange[200],
      borderRadius: ".4em",
      padding: "1em 1.5em",
      overflowX: "hidden",
      "& > button": {
        margin: '1em 0',
        padding: ".8em 1em"
      },
      "& > h3": {
        fontSize: "2em",
        fontWeight: 500,
        color: "rgba(0,0,0,.8)"
      },
      "& > div": {
        backgroundColor: orange[200]
      },
      [theme.breakpoints.down("md")]: {
        padding: "1em .5em"
      },
      
    },
    details: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      height: "100%",
      margin: theme.spacing(0, -.4),
      fontSize: "1.2em",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    table: {
      minWidth: 750,
      overflow: "hidden",
      [theme.breakpoints.down("md")]: {
        minWidth: 350,
      },
      [theme.breakpoints.down("sm")]: {
        minWidth: 200,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        "& > *": {
          width: "100%"
        }
      }
    },
    tableContainer: {
      borderLeft: "rgba(0,0,0,.5) solid 3px",
      borderRight: "rgba(0,0,0,.5) solid 3px",
      overflowX: "hidden",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      "& > *": {
        borderBottom: "rgba(0,0,0,.5) solid 3px",
        backgroundColor: "white",
        width: "100%"
      }
    },
    statusContainer: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "row",
      alignItems: "center",
      "& > svg": {
        backgroundColor: green[100],
        color: green[300],
        borderRadius: "50%",
        fontSize: "2em",
        marginLeft: ".4em",
        marginTop: ".2em"
      }
    },
    textHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: deepOrange["A200"],
      "& > *": {
        fontSize: "1.2em",
        textTransform: "uppercase",
        fontWeight: 600,
        color: "white",
        [theme.breakpoints.down("sm")]: {
          width: "min-content"
        }
      }
    },
    imageContainer: {
      height: "13em",
      width: "20em",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "fit",
      backgroundColor: "purple",
      borderRadius: "1em",
      [theme.breakpoints.down("xs")]: {
        width: "100%",
        height: "8em",
        backgroundColor: "blue"
      },
    },
    helper: {
      borderLeft: `2px solid black`,
      padding: theme.spacing(10, 2),
      width: "40%",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      [theme.breakpoints.down("md")]: {
        borderLeft: "none",
        padding: theme.spacing(0, 2),
        width: "100%",
        height: "40%"
      }
    },
    AccordionContainer: {},
    detailParagraph: {},
    accordionSummary: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      "& > div": {
        justifyContent: "space-between"
      }
    },
    paginationContainer: {
      display: "flex",
      margin: "1em 0",
      marginLeft: "50%",
      transform: "translateX(-50%)",
      justifyContent: "center",
      overflow: "hidden",
      borderRadius: "5em",
      backgroundColor: deepOrange["A200"],
      [theme.breakpoints.down("sm")]: {
        width: "100%"
      }
    },
    buttonContainer: {
      // backgroundColor: orange["A100"],
      margin: ".5em 0",
      padding: ".2em 1em",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      "& button": {
        color: "black"
      },
      "& button:first-child":{
        backgroundColor: "black",
        color: deepOrange["A200"]
      },
      "& button:last-child":{
        color: "black",
        backgroundColor: deepOrange["A200"]
      }    
    },
    image:{
      width:"100%"
    }
  })
))

const cardStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      "& > div:first-child":{
        "& img":{
          maxWidth:"5rem",
          maxHeight:"5rem",
          objectFit:"contain"
        }
      }
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    icon: {
      verticalAlign: 'bottom',
      height: 20,
      width: 20,
    },
    details: {
      alignItems: 'center',
      "& > div":{
        flex:1
      },
      [theme.breakpoints.down("sm")]:{
        display:"flex",
        flexDirection:"column"
      },
      "& > div:first-child":{
        "& img":{
          width:"100%"
        }
      },
      "& > div:nth-child(2)":{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        marginLeft:theme.spacing(2)
      }
    },
    column: {
      flexBasis: '33.33%',
    },
    // helper: {
    //   borderLeft: `2px solid ${theme.palette.divider}`,
    //   padding: theme.spacing(1, 2),
    // },
    link: {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    buttonContainer: {
      // backgroundColor: orange["A100"],
      margin: ".5em 0",
      padding: ".2em 1em",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      "& button": {
        color: "black"
      },
      "& button:first-child":{
        backgroundColor: "black",
        color: deepOrange["A200"]
      },
      "& button:last-child":{
        color: "black",
        backgroundColor: deepOrange["A200"]
      }    
    }
  }),
);

interface IDetail {
  limit: number;
  page: number;
  total: number;
  pages: number
}


interface CardDetailProps {
  transaction:ITransaction;
  isExpanded:boolean;
  handleChange:any
}

const CardDetails:React.FC<CardDetailProps> = ({isExpanded,transaction,handleChange}) => {

  const classes = cardStyles();
  const formattedDate = formatDistanceToNow((transaction.createdAt as any).toDate())
  const {updateDocument: updateTransaction} = useDocument({collectionName:"transactions",documentId:transaction.id})
  const {currentUser} = getUser()
  // For setting the transaction status by the admin
  const handleTransactionStatus = (type: string) => {
    return () => {
      updateTransaction({status:type})
    }
  }
  const approveTransaction = handleTransactionStatus("Approved")
  const rejectTransaction = handleTransactionStatus("Denied")
    
  return (
      <Accordion className={classes.root} expanded={isExpanded} onChange={handleChange} >
        <AccordionSummary
          expandIcon={<IoIosArrowDown />}
          aria-controls={transaction.id}
          id={transaction.id}
        >
          <div className={classes.column}>
            <Typography className={classes.heading}><span>{formattedDate} ago </span></Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              <span>{transaction.status}</span>
            </Typography>
          </div>
          <div className={classes.column}>
          {
            !isExpanded && 
            <img src={transaction.imageUrl} />
          }
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <div>
            <img src={transaction.imageUrl} />
          </div>
          <Box>
            <ChatList updateTransaction={updateTransaction}
              transactionId={transaction.id} chats={transaction.chats} />
          </Box>
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <ButtonGroup className={classes.buttonContainer}>
            <Button onClick={rejectTransaction}>Reject</Button>
            <Button onClick={approveTransaction}>
              Approve
            </Button>
          </ButtonGroup>
        </AccordionActions>
      </Accordion>
  );
}

interface createTransactionProps {
  createTransaction: (arg: ITransaction) => Promise<any>
  close: () => void
}


const CreateTransaction: React.FC<createTransactionProps> = ({ createTransaction, close }) => {
  const [image, setImage] = React.useState({
    base64:"",
    name:"",
    file:null
  })
  const firebaseClass = React.useContext(FirebaseContext)
  const alert = React.useContext(AlertContext)
  const {currentUser} = getUser()
  const classes = useStyles()
  const [submitting,setSubmitting] = React.useState(false)
  const handleSubmitToggle = () => {
    setSubmitting(!submitting)
  }
  const handleImageTransformation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]
    const { name } = e.currentTarget
    if (file) {
        const reader = new FileReader();
        reader.onloadend = function () {
            setImage({
                  base64: (reader.result as string),
                  name: file.name,
                  file:file
              })
        }
        reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async () => {
    handleSubmitToggle()
    try{
      const {filePath,imageUrl} = await firebaseClass.uploadMedia(currentUser.uid,image.file)
      const newTransaction:ITransaction = {
        imageUrl,
        filePath,
        author:currentUser.uid,
        createdAt:firebaseClass.createTimeStamp(),
        chats:[],
        status:"Pending"
      }
      const response = await createTransaction(newTransaction)
      if(response){
        handleSubmitToggle()
        alert.handleOpen({
          message:"New Transaction created successful",
          type:"success"
        })
        close()
      }
    }catch(err){
      handleSubmitToggle()
      alert.handleOpen({
        message:`Something went wrong:${err.message}`,
        type:"error"
      })
    }
  }

    return (
    <>
      <DialogTitle id="simple-dialog-title">Create A New Transaction</DialogTitle>
      <DialogContent style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}>
        <Box style={{
          display: 'flex',
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <Typography style={{
            fontSize: "1.4em"
          }} variant="subtitle2" >
            {image.name ? image.name : "Upload Image"}
          </Typography>
          <input accept="image/jpeg;image/png" name="image" onChange={handleImageTransformation}
            type="file" style={{ display: "none" }}
            id="Image-input" />
          <label htmlFor="Image-input">
            {image.file ? 
            <img className={classes.image} src={image.base64} /> : 
            <Button component="span">
            <MdBurstMode style={{
              backgroundColor: deepOrange["A700"],
              color: "black",
              borderRadius: "50%",
              fontSize: "2em",
              padding: ".3em"
            }} />
          </Button>
          }
          </label>
        </Box>
      </DialogContent>
      <DialogActions style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <ButtonGroup>
          <Button onClick={close} disabled={submitting} style={{
            backgroundColor: "black",
            color: deepOrange[900],
            padding: '.5em 1.5em'
          }}>Cancel</Button>
          <Button disabled={submitting}
            onClick={handleSubmit}
            style={{
              backgroundColor: deepOrange[900],
              color: "black",
              padding: '.5em 1em'
            }}>{ submitting ? "Creating New Transaction" : "Submit"}</Button>
        </ButtonGroup>
      </DialogActions>
    </>
  )
}


const TransactionTable = () => {
  const classes = useStyles()
  const {currentUser} = getUser()
  const [open, setOpen] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };
  const {
    documentsInCollection: transactions,
    loadCollection: loadTransaction,
    createDocument: createTransaction } = useCollection({
      collectionName:"transactions",
      addListener:true,
      ...(currentUser?.uid && {
        query:{
          filter:"==",
          selectField:"author",
          selectValue:currentUser.uid
        }
      })
    })
  const [detail, setDetail] = React.useState<IDetail>({
    limit: 5,
    page: 0,
    total: 0,
    pages: 0
  })
  React.useEffect(() => {
    loadTransaction()
  },[])
  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    // setPage(0);
  };

  const handleToggle = () => {
    setOpen(!open)
  }
  const loadNewCardSet = () => {}
  return (
    <>
      <Box className={classes.root}>
        <h3>Most Recent Transaction</h3>
        {transactions.length ?
          <TableContainer>
            <Table className={classes.table} aria-label="simple table">
              {/* <TableHead>
                <TableRow className={classes.textHeader}>
                  <TableCell align="center"><span>Date</span></TableCell>
                  <TableCell ><span>Status</span></TableCell>
                </TableRow>
              </TableHead> */}
              <TableBody className={classes.tableContainer}>
                {transactions.map((transaction, idx) => (
                  <TableRow key={transaction.id} >
                      <CardDetails isExpanded={expanded === transaction.id}
                       transaction={transaction} handleChange={handleChange(transaction.id)} />
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination defaultValue={["5", "10", "15", "20", "25", "30"]}
              className={classes.paginationContainer} onChangeRowsPerPage={handleChangeRowsPerPage}
              page={detail!.page - 1} onChangePage={loadNewCardSet}
              count={detail!.total} rowsPerPage={detail!.limit} />
          </TableContainer>
           :
          <Typography variant="h5" >No Transaction available</Typography>}
        <Button onClick={handleToggle} style={{
          color: "rgba(0,0,0,.9)",
          backgroundColor: deepOrange["A200"]
        }}>Create New Transaction</Button>
      </Box>
      <Dialog open={open} handleToggle={handleToggle} >
        <CreateTransaction close={handleToggle} createTransaction={createTransaction} />
      </Dialog>
    </>
  )
}


export default TransactionTable