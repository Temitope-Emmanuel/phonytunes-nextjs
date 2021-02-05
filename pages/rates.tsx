import React from "react"
import {Box} from "@material-ui/core"
import {makeStyles,createStyles,Theme} from "@material-ui/core/styles"
import {RatingCalculator} from "../src/components/RatingCalculator"

const useStyles = makeStyles((theme:Theme) => (
    createStyles({
        root:{
            display:"flex",
            justifyContent:"center",
            width:"90vw",
            margin:"0 5vw",
            height:"100vh",
            "& > div":{
                backgroundColor:"white !important"
            },
            [theme.breakpoints.down("sm")]:{
                margin:"0 3em",
                width:"auto"
            }
        }
    })
))

const Rating = () => {
    const classes = useStyles()
    return(
        <Box className={classes.root}>
            <RatingCalculator/>
        </Box>
    )
}

export default Rating