import React from 'react'
import {
    Box, Grow, Button, Theme, Badge,
    FormControl, InputLabel, InputBase,
    createStyles, Select
} from "@material-ui/core"
import { makeStyles, withStyles } from "@material-ui/styles"
import { BiPlayCircle } from "react-icons/bi"
import { useState } from 'react'
import { deepOrange, orange } from "@material-ui/core/colors"
import useCollection from "../../utils/useCollection"

const BootstrapInput = withStyles((theme: Theme) => (
    createStyles({
        root: {
            'label + &': {
                marginTop: theme.spacing(3),
            },
            width: "100%"
        },
        input: {
            width: "100%",
            borderRadius: 4,
            position: 'relative',
            backgroundColor: theme.palette.background.paper,
            border: '1px solid #ced4da',
            fontSize: 16,
            padding: '10px 26px 10px 12px',
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            '&:focus': {
                borderRadius: 4,
                borderColor: orange["A200"],
                boxShadow: `0 0 0 0.2rem ${deepOrange["A200"]}`,
                backgroundColor: "whitesmoke"
            }
        }
    })
))(InputBase)


const StyledBadge = withStyles((theme: Theme) => (
    createStyles({
        badge: {
            right: 13,
            top: 1,
            border: `2px solid ${deepOrange[100]}`,
            padding: '8px',
            borderRadius: "50%",
            backgroundColor: deepOrange[500]
        }
    })
))(Badge)

const useStyles = makeStyles((theme: Theme) => (
    createStyles({
        root: {
            width: "100%",
            backgroundColor: orange[200],
            borderRadius: ".4em",
            padding: theme.spacing(1, 1.5),
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "2em",
            "& h3": {
                fontSize: "2em",
                margin: ".4em 0",
                fontWeight: "400",
                color: deepOrange["A700"]
            },
            "& p": {
                fontSize: "1.3em",
                color: deepOrange["A700"]
            }
        },
        buttonContainer: {
            width: "100%",
            display: "flex",
            "& button": {
                margin: theme.spacing(0, .8),
                padding: theme.spacing(1, 10, 1, .8),
                border: `${deepOrange["A700"]} 2px solid`,
                textTransform: "capitalize",
                fontSize: "1.2em",
                "& svg": {
                    marginRight: "0 .5em",
                    fontSize: "2.5em",
                    color: "rgba(0,0,0,.7)"
                },
                [theme.breakpoints.up("md")]: {
                    margin: theme.spacing(0, 1.5),
                },
            },
            [theme.breakpoints.down("md")]: {
                justifyContent: "center"
            }
        },
        formContainer: {
            "& > *": {
                padding: "0 .3em"
            },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        },
        margin: {
            width: "90%",
            margin: ".5em 0"
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
            width:"100%"
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    })
))


const RatingCalculator = () => {
    const classes = useStyles()
    const [active, isActive] = useState(false)
    const { loadCollection: loadAllCardRates, documentsInCollection: cardRates } = useCollection({
        collectionName: "cardRates"
    })
    const [currentCategory, setCurrentCategory] = React.useState("")
    const [currentSubCategoryList, setCurrentSubCategoryList] = React.useState([])
    const [currentSubCategory, setCurrentSubCategory] = React.useState({
        name:"",
        price:0
    })
    React.useEffect(() => {
        loadAllCardRates()
    }, [])

    React.useEffect(() => {
        if(cardRates.length){
            const foundCategory = cardRates.find(item => item.name === currentCategory)
            console.log("this is the foundCategory",...foundCategory.rates)
            setCurrentSubCategoryList([...foundCategory.rates])
            // console.log("this is the found Category",foundCategory)
        }
    },[currentCategory])
    // console.log("this is the card rates",cardRates)

    const handleChange = () => {
        isActive(!active)
    }
    const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentCategory(event.currentTarget.value)
      };

    const handleSubCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentSubCategory({
            name:event.currentTarget.value
        })
      };


      console.log("currentCategoryList",currentSubCategoryList)

    return (
        <Box className={classes.root}>
            <h3>Rate Calculator</h3>
            <p>Get the current value for your transaction</p>
            <Box>
                <Box className={classes.buttonContainer}>
                    {!active ?
                        <Grow in={!active} >
                            <Button onClick={handleChange} style={{ color: "rgba(0,0,0,.9)", backgroundColor: deepOrange["A200"] }}>
                                <BiPlayCircle />
                            Sell
                        </Button>
                        </Grow>
                        :
                        <Grow in={active} >
                            <StyledBadge color="primary" variant="dot">
                                <Button onClick={handleChange} style={{ color: "rgba(0,0,0,.9)", backgroundColor: deepOrange["A200"] }}>
                                    <BiPlayCircle />
                                Sell
                            </Button>
                            </StyledBadge>
                        </Grow>
                    }
                    {active ?
                        <Grow in={active} >
                            <Button onClick={handleChange} style={{ backgroundColor: "rgba(0,0,0,.9)", color: deepOrange["A200"] }}>
                                <BiPlayCircle style={{ color: deepOrange["A200"] }} />
                            Buy
                        </Button>
                        </Grow>
                        :
                        <Grow in={!active} >
                            <StyledBadge color="primary" variant="dot">
                                <Button onClick={handleChange} style={{ backgroundColor: "rgba(0,0,0,.9)", color: deepOrange["A200"] }}>
                                    <BiPlayCircle style={{ color: deepOrange["A200"] }} />
                                Buy
                            </Button>
                            </StyledBadge>
                        </Grow>
                    }
                </Box>
                <Box className={classes.formContainer}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel htmlFor="outlined-age-native-simple">Gift Card</InputLabel>
                        <Select
                            native
                            value={currentCategory}
                            onChange={handleCategoryChange}
                            label="Select Gift Card"
                            inputProps={{
                                name: 'mainCategory',
                                id: 'outlined-age-native-simple',
                            }}
                        >
                            <option disabled={true} aria-label="None" value="" />
                            {cardRates.map((item,idx) => (
                                <option key={item.id} value={item.name} >{item.name}</option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" className={classes.formControl}>
                        {/* <InputLabel htmlFor="subCategory">SubCategory</InputLabel> */}
                        <Select
                            native
                            value={currentSubCategory}
                            onChange={handleSubCategoryChange}
                            label="Select Gift Card Category"
                            inputProps={{
                                name: 'subCategory',
                                id: 'subCategory',
                            }}
                            
                            
                        >
                        <option defaultValue="true" aria-label="None" disabled={true} value="" />
                        {currentSubCategoryList.map((item,idx) => (
                            <option key={item.id} value={item.name} >{item.name}</option>
                        ))}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.margin}>
                        <InputLabel htmlFor="textbox">Amount</InputLabel>
                        <BootstrapInput id="textbox" />
                    </FormControl>
                </Box>
            </Box>
        </Box>
    )
}

export default RatingCalculator