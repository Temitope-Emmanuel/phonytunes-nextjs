import React,{ChangeEvent} from "react"
import {makeStyles,createStyles,Theme} from "@material-ui/core/styles"
import {
  Table,TableBody,TableCell,
  TableContainer,TableHead,TableRow} from '@material-ui/core';
import {Accordion,IconButton,AccordionDetails,AccordionSummary,AccordionActions} from "@material-ui/core"
import {BiDownArrow} from 'react-icons/bi';
import {Button,Typography,ButtonGroup,Box,TablePagination} from "@material-ui/core"
import {Dialog} from '../Dialog'
import {BsCheckAll} from "react-icons/bs"
import {green,deepOrange,orange} from "@material-ui/core/colors"
import {AlertContext} from "../Snackbar/SnackContext"
// import CommentList from "../comment/CommentList"
import {IComment,ICard} from "../../core/models"
import {BsDownload} from 'react-icons/bs';
import {AiFillDelete} from 'react-icons/ai';
import useCollection from "../../utils/useCollection"
import useDocument from "../../utils//useDocument"
import getUser from "../../utils/userAuth"

const useStyles = makeStyles((theme:Theme) => (
    createStyles({
        root:{
            display:"flex",
            flexDirection:"column",
            justifyContent:"end",
            backgroundColor:orange[200],
            borderRadius:".4em",
            padding:"1em 1.5em",
            overflowX:"hidden",
            "& > button":{
              margin:'1em 0',
              padding:".8em 1em"
            },
            "& > h3":{
              fontSize:"2em",
              fontWeight:500,
              color:"rgba(0,0,0,.8)"
            },
            "& > div":{
              backgroundColor:orange[200] 
            },
            [theme.breakpoints.down("md")]:{
              padding:"1em .5em"
          }
        },
        details: {
          display:"flex",
          flexDirection:"row",
          justifyContent:"space-between",
          height:"100%",
          margin:theme.spacing(0,-.4),
          fontSize:"1.2em",
          [theme.breakpoints.down("md")]:{
            flexDirection:"column",
            alignItems:"center",
          }
        },
        table: {
          minWidth: 750,
          overflow:"hidden",
          [theme.breakpoints.down("md")]:{
            minWidth: 350,
          },
          [theme.breakpoints.down("sm")]:{
            minWidth:200,
            display:"flex",
            alignItems:"center",
            flexDirection:"column",
            "& > *":{
                width:"100%"
            }
          }
        },
        tableContainer:{
          borderLeft:"rgba(0,0,0,.5) solid 3px",
          borderRight:"rgba(0,0,0,.5) solid 3px",
          overflowX:"hidden",
          display:"flex",
          justifyContent:"center",
          flexDirection:"column",
          alignItems:"center",
          width:"100%",
          "& > *":{
            borderBottom:"rgba(0,0,0,.5) solid 3px",
            backgroundColor:"white",
            width:"100%"
          }
        },
        statusContainer:{
          display:"flex",
          justifyContent:"center",
          flexDirection:"row",
          alignItems:"center",
          "& > svg":{
            backgroundColor:green[100],
            color:green[300],
            borderRadius:"50%",
            fontSize:"2em",
            marginLeft:".4em",
            marginTop:".2em"
          }
        },
        textHeader:{
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center",
          backgroundColor:deepOrange["A200"],
          "& > *":{
            fontSize:"1.2em",
            textTransform:"uppercase",
            fontWeight:600,
            color:"white",
            [theme.breakpoints.down("sm")]:{
                 width:"min-content"
            }
          }
        },
        imageContainer:{
          height:"13em",
          width:"20em",
          backgroundPosition:"center",
          backgroundRepeat:"no-repeat",
          backgroundSize:"fit",
          backgroundColor:"purple",
          borderRadius:"1em",
          [theme.breakpoints.down("xs")]:{
          width:"100%",
          height:"8em",
          backgroundColor:"blue"
          },
        },
        helper: {
          borderLeft: `2px solid black`,
          padding: theme.spacing(10, 2),
          width:"40%",
          display:"flex",
          alignItems:"center",
          flexDirection:"column",
          [theme.breakpoints.down("md")]:{
            borderLeft:"none",
            padding:theme.spacing(0,2),
            width:"100%",
            height:"40%"
          }
        },
        AccordionContainer:{},
        detailParagraph:{},
        accordionSummary:{
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center",
          "& > div":{
            justifyContent:"space-between"
          }
        },
        paginationContainer:{
          display:"flex",
          margin:"1em 0",
          marginLeft:"50%",
          transform:"translateX(-50%)",
          justifyContent:"center",
          overflow:"hidden",
          borderRadius:"5em",
          backgroundColor:deepOrange["A200"],
          [theme.breakpoints.down("sm")]:{
            width:"100%"
          }
        },
        buttonContainer:{
          backgroundColor:orange["A100"],
          margin:".5em 0",
          padding:".2em 1em",
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center",
          "& button":{
            color:"black"
          }
        }
    })
))

interface IDetail {
    limit:number;
    page:number;
    total:number;
    pages:number
  }
  
interface IProps {
    admin:boolean;
}

interface CardDetailProps {
    card:ICard
}

const CardDetails:React.FC<CardDetailProps> = ({card}) => {
    const {document,updateDocument:updateCard,deleteDocument:deleteCard} = useDocument("card",card.id)
    const classes = useStyles()
    const {currentUser:{currentUser}} = getUser()

    // For setting the transaction status by the admin
    const handleCardStatus = (type:string,id:string) => () => {
        // const token = {
        //   token:(jwt as IToken).token,
        //   cardId:id
        // }
  
        // const foundIdx = cards?.findIndex((card,idx) => card._id === id)
        //   const updatedCard = {...(cards as ICard[])[(foundIdx as number)],status:type}
        //   newCardSet((foundIdx as number),updatedCard)
        
        // updateCardStatus(token,{status:type}).then(data => {
        //   if(data){
        //     if(data.message){
        //       context.handleOpen!({type:"success",message:`Transaction of id ${id} has been updated`})
        //     }else{
        //       context.handleOpen!({type:"error",message:data.error || "Somehting went wrong"})  
        //     }
        //   }else{
        //     context.handleOpen!({type:"info",message:`Something went wrong`})
            
        //   }
        // })
      }
  

    return(
        <>
        <AccordionSummary className={classes.accordionSummary} id={card.id}
                   expandIcon={<BiDownArrow />} aria-controls={card.id}>
                    <TableCell align="right"><span>{new Date(card.createdAt).toLocaleDateString()}</span></TableCell>
                    <TableCell className={classes.statusContainer}
                    align="right"><span>{card.status === "Success" ? "Success"
                      : card.status === "Failed" ? "Failed" : "Pending"}</span>
                      {/* <BsCheckAll/> */}
                    </TableCell>
                  </AccordionSummary>
                  <AccordionDetails className={classes.details}>
                      <div className={classes.imageContainer} style={{
                          borderRadius:".5em",
                          backgroundImage:`url(${card.image})`
                      }} />
                      {/* <img src={card.image} height={240} width={240} /> */}
                      <ButtonGroup className={classes.buttonContainer}>
                          <a href={card.image} download>
                            <IconButton>
                                <BsDownload/>
                            </IconButton>
                          </a>
                        <IconButton onClick={deleteCard}>
                          <AiFillDelete/>
                        </IconButton>
                      </ButtonGroup>
                    <Box className={classes.helper}>
                      {/* <CommentList handleCardUpdate={handleCardUpdate}
                       transactionId={card.id} comments={card.comments} /> */}
                    </Box>
                  </AccordionDetails>
                  {currentUser.uid &&
                  <AccordionActions>
                    {
                      card.status === "Pending" ?
                      <ButtonGroup>
                        <Button onClick={handleCardStatus("Success",card.id)} style={{
                          backgroundColor:"black",
                          color:deepOrange["A200"]
                        }}>
                          Complete Transaction
                        </Button>
                        <Button onClick={handleCardStatus("Failed",card.id)} style={{
                          backgroundColor:deepOrange["A200"],
                          color:"black"
                        }}>
                          Reject Transaction
                        </Button>
                      </ButtonGroup> : 
                      card.status === "Failed" && 
                      <Button onClick={handleCardStatus("Success",card.id)} style={{
                        backgroundColor:"black",
                        color:deepOrange["A200"]
                      }}>
                        Complete Transaction
                      </Button>
                    }
                  </AccordionActions>
}
        </>
    )
}

const TransactionTable = () => {
    const classes = useStyles()
    const context = React.useContext(AlertContext)
    const [expanded, setExpanded] = React.useState<string | boolean>(false);
    const [open,setOpen] = React.useState(false)
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const {documentsInCollection:cards,error,loadCollection} = useCollection("cards")
    const {currentUser} = getUser()
    const [detail,setDetail] = React.useState<IDetail>({
      limit:5,
      page:0,
      total:0,
      pages:0
    })
    const handleChangeRowsPerPage = (event:ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 5));
        // setPage(0);
      };
    
      const handleToggle = () => {
          setOpen(!open)
      }
      const handleChange = (panel:string) => (event:any, isExpanded:boolean) => {
        setExpanded(isExpanded ? panel : false);
      };
      const loadNewCardSet = (e:any,page:number) => {
        // if(jwt){
        //   getUserCard({token:(jwt as IToken).token
        //     ,userId:(jwt as IToken).user._id},{
        //       limit:detail.limit,
        //       // page:detail.pages > 0 ? page+1 :  page
        //       page:0
        //     }).then((data) => {
        //     if(data.docs){
        //       setCard(data.docs)
        //       setDetail({limit:data.limit,total:data.total,page:data.page,pages:data.pages})
        //     }
        //   })
        // }
      }

      const updateCardList = (card:ICard) => {
        // const newCard = cards
        // newCard?.unshift(card)
        // setCard(newCard)
      }
  
    
      
    
    return (
        <Box className={classes.root}>
          <h3>Most Recent Transaction</h3>
          {cards && cards.length > 0 ?
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow className={classes.textHeader}>
                <TableCell align="center"><span>Date</span></TableCell>
                <TableCell ><span>Status</span></TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={classes.tableContainer}>
              {cards && cards.map((card,idx) => (
              <TableRow key={card.id}>
                <Accordion className={classes.AccordionContainer}
                key={card.id} expanded={expanded === card.id}
                onChange={handleChange((card.id as string))}
                >
                  <CardDetails card={card} />
                </Accordion>
              </TableRow>
              ))}
            </TableBody>
          </Table>
            <TablePagination defaultValue={["5","10","15","20","25","30"]}
             className={classes.paginationContainer} onChangeRowsPerPage={handleChangeRowsPerPage}
              page={detail!.page -1} onChangePage={loadNewCardSet}
              count={detail!.total} rowsPerPage={detail!.limit} />
        </TableContainer>
         :  <Typography variant="h5" >No Transaction available</Typography>}
          <Button onClick={handleToggle} style={{
            color:"rgba(0,0,0,.9)",
            backgroundColor:deepOrange["A200"]
            }}>Create New Transaction</Button>
          {/* <Dialog open={open} blog={false}
           updateCardList={updateCardList}
           handleToggle={handleToggle} /> */}
        </Box>
      );
}

export default TransactionTable