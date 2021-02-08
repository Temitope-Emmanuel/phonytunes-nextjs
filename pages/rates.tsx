import React from "react"
import {Box} from "@material-ui/core"
import {makeStyles,createStyles,Theme} from "@material-ui/core/styles"
import {RatingCalculator} from "../src/components/RatingCalculator"
import {Navbar} from "../src/views/Navbar"
import {Footer} from "../src/views/Footer"
import useCollection from "../src/utils/useCollection"

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
        <>
        <Navbar/>
        <Box className={classes.root}>
            <RatingCalculator/>
        </Box>
        <Footer/>
        </>
    )
}

export default Rating