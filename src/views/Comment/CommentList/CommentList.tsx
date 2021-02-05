import React from "react"
import {makeStyles,Theme,createStyles} from "@material-ui/core/styles"
import {Box,Slide,Collapse} from "@material-ui/core"
import {Comment} from "../Comment"
import {IComment} from "../../../core/models"
import {Button,Typography,IconButton,Input,FormControl,InputAdornment} from "@material-ui/core"
import UseInputState from "../../../utils/useInputState"
import {MdQuestionAnswer} from 'react-icons/md';
import {RiSendPlaneFill} from 'react-icons/ri';
import {GiCancel} from 'react-icons/gi';
import {AlertContext} from "../../../components/Snackbar/SnackContext"
import { deepOrange} from "@material-ui/core/colors"
import useCollection from "../../../utils/useCollection"


const useStyles = makeStyles((theme:Theme) => (
    createStyles({
        root:{
            width:"100%",
            position:"relative",
            maxHeight:"35em",
            display:"flex",
            "& svg":{
                color:"rgba(0,0,0,.9)",
                borderRadius:"50%",
                width:theme.spacing(3),
                height:theme.spacing(3),
                padding:theme.spacing(1),
                cursor:"pointer"
            }
        },
        commentContainer:{
            overflowY:"auto",
            maxHeight:"30em",
            minHeight:"10em",
            width:"100%",
            marginBottom:theme.spacing(7)
        },
        SlideContainer:{
            width:"100%",
            position:"absolute",
            borderRadius:"5.4em",
            bottom:".1em",
            display:"flex",
            flexDirection:"row",
            justifyContent:"center",
            alignItems:"center",
            backgroundColor:"transparent",
            overflowX:"hidden"
        },
        inputContainer:{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            flexDirection:"row",
            padding:theme.spacing(0,2)
        }
    })
))

interface IProps {
    comments:IComment[];
    transactionId:string;
    handleCardUpdate(comment:IComment,id:string):void
}


const CommentList:React.FC<IProps> = ({comments,handleCardUpdate,...props}) => {
    const classes = useStyles()
    // const {} = useCollection()
    const [isVisible,setIsVisible] = React.useState(false)
    const [text,handleText,resetText] = UseInputState("")
    const [showComment,setShowComment] = React.useState(false)
    const context = React.useContext(AlertContext)
    const [submit,setSubmitting] = React.useState(false)
    const [useComments,setUseComments] = React.useState<IComment[]>([])
    const handleVisible = () => {
        setIsVisible(!isVisible)
    }    
    const toggleComment = () => {
        setShowComment(!showComment)
    }
    const handleSubmit = (e:any) => {

    }
    
    return(
        <>
            <Button onClick={toggleComment} variant="outlined" style={{
                color:deepOrange["A200"],
                marginTop:"3px"
            }} >{showComment ? "Hide Comments" : "Show Comments"}</Button>
        <Box className={classes.root}>
        <Collapse style={{
            width:"100%"
        }} in={showComment}>
            <Box className={classes.SlideContainer}>
                <Slide direction="right" 
                 unmountOnExit mountOnEnter
                 timeout={800} in={isVisible}>
                <FormControl  style={{margin:".4em"}} className={classes.inputContainer}>
                     <Input name="comment"
                        required={true}
                        disabled={submit}
                      onChange={handleText}
                      onKeyPress={(e) => e.which === 13 && handleSubmit(e)}
                      value={text}
                      autoFocus={true}
                      placeholder="Input Comment"
                      style={{padding:".3em"}}
                      startAdornment={
                          <InputAdornment position="start">
                              <GiCancel 
                               style={{transform:"rotate(180deg)"}} 
                               onClick={handleVisible} />
                          </InputAdornment>
                      }
                      endAdornment={
                          <InputAdornment variant="filled" position="end">
                              <Button style={{borderRadius:"5em"}} onClick={handleVisible}>
                                <RiSendPlaneFill style={{color:"rgba(255,255,255,0.8)"}} />
                              </Button>
                          </InputAdornment>
                      }
                      />
                </FormControl>
                </Slide>
                <Slide direction="left"
                 unmountOnExit timeout={1200}
                 mountOnEnter in={!isVisible}>
                    <IconButton style={{fontSize:"50"}} 
                     onClick={handleVisible}>
                        <MdQuestionAnswer 
                        style={{backgroundColor:"rgba(255,255,255,.7)"}} />
                    </IconButton>
                </Slide>
            </Box>
            <Box className={classes.commentContainer}>
            {
            useComments && useComments!.length > 0 ? comments.map(m => (
                // <Box key={m._id}>
                    <Comment key={m._id} comment={m}/>
                // </Box>
            )) : 
            <Typography variant="body1">
                No comments available 
            </Typography> }
            </Box>
        </Collapse>
        </Box>
        </>
    )
}

export default CommentList