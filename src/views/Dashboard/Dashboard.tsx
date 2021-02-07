import React, { ChangeEvent } from "react"
import {
    Box, TextField, Grow, Divider, ButtonGroup, Button,
    DialogActions, DialogContent, DialogTitle,Slider, Typography, Chip, Paper
} from "@material-ui/core"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"
import { MdMonetizationOn } from 'react-icons/md';
import { MdPlayArrow } from 'react-icons/md';
import { RatingCalculator } from "../../components/RatingCalculator"
import { orange, deepOrange } from "@material-ui/core/colors"
import { TransactionTable } from "../../components/TransactionTable"
import { AlertContext } from "../../components/Snackbar/SnackContext"
import { Dialog } from "../../components/Dialog"
import getUser from '../../utils/userAuth'
import useCollection from "../../utils/useCollection"
import { FirebaseContext } from "../../firebase";
import useInputState from "../../utils/useInputState";
import { IBlog, IRates, IPrice } from "../../core/models"
// import { SelectField } from "material-ui";

const useStyles = makeStyles((theme: Theme) => (
    createStyles({
        root: {
            height: "auto",
            padding: theme.spacing(1, 0),
            width: "98vw",
            margin: "2em 1vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column"
        },
        walletContainer: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "95%",
            "& > div": {
                borderRadius: ".5em",
            },
            [theme.breakpoints.down("sm")]: {
                flexDirection: "column-reverse",
                justifyContent: "center",
                "& > div": {
                    width: "95%",
                    margin: "1.5em 2.5%"
                }
            }
        },
        acctContainer: {
            width: "30%",
            backgroundColor: "whitesmoke",
            margin: theme.spacing(2, 0),
            padding: theme.spacing(4, 2.5),
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            "& div": {
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                width: "100%"
            },
            "& h3": {
                fontSize: "1.3em",
                fontWeight: "400",
                opacity: ".8",
                color: "black"
            },
            "& svg": {
                fontSize: "4em"
            },
            "& span": {
                fontSize: "1.25em"
            },
            [theme.breakpoints.down("sm")]: {
                padding: "10px 15px"
            }
        },
        amountContainer: {
            display: "flex",
            flexDirection: "column",
            width: "100%",
            justifyContent: "space-evenly",
            alignItems: "center",
            "& > div": {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
            }
        },
        btcContainer: {
            width: "60%",
            backgroundColor: "whitesmoke",
            padding: theme.spacing(2, 1),
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            "& h4": {
                fontSize: "1.4em",
                color: "black",
                fontWeight: "500",
                marginBottom: "20px"
            },
            "& > div": {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                margin: theme.spacing(0, 1.5),
                height: "100%",
                "& button": {
                    padding: ".8em 1em",
                    margin: "1em .5em",
                    "& svg": {
                        fontSize: "2.4em"
                    }
                }
            },
            "& > div:first-child": {
                width: "40%",
                "& h6": {
                    fontSize: "1.2em",
                    margin: "10px",
                    fontWeight: 500
                }
            },
            "& > div:nth-child(2)": {
                // width:"60%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: "50%"
            },
            [theme.breakpoints.down("sm")]: {
                flexDirection: "column-reverse",
                "& > div": {
                    width: "100% !important"
                }
            }
        },
        buttonHolder: {
            // [theme.breakpoints.down("sm")]:{
            //     display:"flex",
            //     flexDirection:"row"
            // }
        },
        priceContainer: {
            [theme.breakpoints.down("sm")]: {
                display: "flex",
                flexDirection: "row"
            }
        },
        transactionContainer: {
            width: "95%",
            padding: "1.5% 2.5%",
            display: "flex",
            justifyContent: "space-evenly",
            flexDirection: "row",
            "& > div:first-child": {
                flex:3,
                [theme.breakpoints.up("md")]: {
                    // marginRight:"3em",
                },
                [theme.breakpoints.down("md")]: {
                    width: "95vw",
                    padding: "1em .5em",
                }
            },
            "& > div:nth-child(2)": {
                flex:1,
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "column",
                [theme.breakpoints.down("md")]: {
                    width: "92vw",
                    padding: "1em .5em"
                }
            },
            [theme.breakpoints.down("md")]: {
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between"
            }
        }
    })
))

interface createBlogProps {
    createBlog: (arg: IBlog) => void
    close: () => void
}

interface createRatesProps {
    close: () => void
}

const addRatesStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        dialogContainer:{
            display: "flex",
            flexDirection: "column",
            "& > div":{
                margin:theme.spacing(2,0)
            }
        },
        input: {
            width: 42,
        },
        slideContainer:{
            display:"flex",
            width:"100%",
            flexDirection:"column",
            alignItems:"center",
            "& > span":{
                width:"90%"
            }
        },
        chipContainer: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            listStyle: 'none',
            padding: theme.spacing(0.5),
            margin: 0,
          },
          chip: {
            margin: theme.spacing(0.5),
          },
    }),
);

const CreateBlog: React.FC<createBlogProps> = ({ createBlog, close }) => {
    const [title, setTitle, resetTitle] = useInputState("")
    const firebaseClass = React.useContext(FirebaseContext)
    const [content, setContent, resetContent] = useInputState("")
    const [submitting, setSubmitting] = React.useState(false)

    const handleSubmit = async () => {
        setSubmitting(true)
        const newBlog: IBlog = {
            content,
            title,
            createdAt: firebaseClass.createTimeStamp()
        }
        await createBlog(newBlog)
        resetTitle()
        resetContent()
        setSubmitting(false)
        close()
    }

    return (
        <>
            <DialogTitle id="simple-dialog-title">Create A New Transaction</DialogTitle>
            <DialogContent style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
            }}>
                <TextField
                    id="outlined-multiline-static"
                    label="Title of Blog Post" name="title"
                    onChange={setTitle}
                    value={title}
                    defaultValue="Input Any Content You would like us to know"
                    variant="standard"
                    style={{
                        margin: "1em .5em"
                    }}
                />
                <TextField
                    id="outlined-multiline-static"
                    label="Post" name="content"
                    onChange={setContent} multiline
                    value={content}
                    rows={10}
                    defaultValue="Input the content of the post"
                    variant="outlined"
                    style={{
                        margin: "1em .5em"
                    }}
                />
            </DialogContent>
            <DialogActions style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <ButtonGroup>
                    <Button disabled={submitting} onClick={close} style={{
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
                        }}>Submit</Button>
                </ButtonGroup>
            </DialogActions>
        </>
    )
}

const AddRates: React.FC<createRatesProps> = ({ close }) => {
    const classes = addRatesStyles()
    const [title, setTitle, resetTitle] = useInputState("")
    const alert = React.useContext(AlertContext)
    const [rates, setRates] = React.useState<IPrice[]>([])
    const [currentPriceDetail, setCurrentPriceDetail] = React.useState({
        name: "",
        price: 25
    })
    const [submitting, setSubmitting] = React.useState(false)
    // Listener for the rates collections
    const { createDocument: createCardRates } = useCollection({
        collectionName: "cardRates"
    })
    
    const handleSliderChange = (event: any, newValue: number | number[]) => {
        setCurrentPriceDetail({
            ...currentPriceDetail,
            price: newValue as number
        });
    };

    const priceMarks = [
        {
            value: 10,
            label: '1000 naira',
        },
        {
            value: 25,
            label: '2500 naira',
        },
        {
            value: 50,
            label: '5000 naira',
        },
        {
            value: 75,
            label: '7,500 naira',
        },
        {
            value: 100,
            label: '10,000 naira',
        }
    ];
    // React.useEffect(() => {
    //     loadCardRates();
    // }, [])

    const handleSubmit = async () => {
        setSubmitting(true)
        const newCardRates = {
            name: title,
            rates:{
                ...rates
            }
        }

        await createCardRates(newCardRates)
        alert.handleOpen({
            message:"new Card rates created successful",
            type:"success"
        })
        resetTitle()
        setSubmitting(false)
        close()
    }
    const setCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget
        setCurrentPriceDetail({
            ...currentPriceDetail,
            [name]: value
        })
    };
    const handleDelete = (chipToDelete: any) => () => {
        setRates((chips) => chips.filter((chip) => chip.name !== chipToDelete.name));
    };

    const handleAddToRates = () => {
        setRates([...rates,{
            name:currentPriceDetail.name,
            price:Number(`${currentPriceDetail.price}00`)
        }])
        setCurrentPriceDetail({
            name:"",
            price:25
        })
    }


    return (
        <>
            <DialogTitle id="simple-dialog-title">Manage Your Rates Here</DialogTitle>
            <DialogContent className={classes.dialogContainer}>
            <Paper component="ul" className={classes.chipContainer}>
                {rates.map((data,idx) => {
                    
                    return (
                    <li key={`${data.name}-${idx}`}>
                        <Chip
                        label={`${data.name}-₦${data.price}00`}
                        onDelete={handleDelete(data)}
                        className={classes.chip}
                        />
                    </li>
                    );
                })}
                </Paper>
                <TextField disabled={Boolean(rates.length)}
                    id="outlined-multiline-static"
                    label="Name" name="title"
                    onChange={setTitle}
                    value={title}
                    defaultValue="Input Any Content You would like us to know"
                    variant="outlined"
                />
                <Box>
                    <div className={classes.slideContainer}>
                        <Typography id="input-slider" gutterBottom>
                            Price: {`#${currentPriceDetail.price}00`}
                        </Typography>
                        <Slider min={10}
                            value={currentPriceDetail.price}
                            onChange={handleSliderChange}
                            step={5} marks={priceMarks}
                            aria-labelledby="input-slider"
                        />
                    </div>
                    <TextField
                        id="outlined-multiline-static"
                        label="card sub category Name" name="name"
                        onChange={setCategory}
                        value={currentPriceDetail.name}
                        defaultValue="Input the name of the card subcategory"
                        variant="outlined"
                    />
                </Box>
                    <Button onClick={handleAddToRates} style={{
                        color: "black",
                        backgroundColor: deepOrange[700]
                    }}> 
                        Add
                    </Button>
            </DialogContent>
            <DialogActions style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <ButtonGroup>
                    <Button disabled={submitting} onClick={close} style={{
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
                        }}>Submit</Button>
                </ButtonGroup>
            </DialogActions>
        </>
    )
}


const Dashboard = () => {
    const classes = useStyles()
    const [BTC, setBTC] = React.useState({
        buy: 0,
        sell: 0
    })
    const [currentRates, setCurrentRates] = React.useState({
        buy: 0,
        sell: 0
    })
    const { currentUser } = getUser()
    // Listener for the rates collections
    const { createDocument: createRates, loadCollection: loadRates, documentsInCollection: rates } = useCollection({
        collectionName: "rates",
        addListener: true
    })
    // Listener for the transaction collections
    const { loadCollection: loadTransaction } = useCollection({
        collectionName: "transactions"
    })
    // Listener for the blog collections
    const { createDocument: createBlog } = useCollection({
        collectionName: "blogs"
    })
    const alert = React.useContext(AlertContext)
    const [open, setOpen] = React.useState(false)
    const [showRates, setShowRates] = React.useState(false)
    const [showDialog, setShowDialog] = React.useState(false)
    const firebaseClass = React.useContext(FirebaseContext)
    // const [date, setDate] = React.useState({
    //     referralStart: defaultStartTime,
    //     referralEnd: defaultEndTime
    // })

    React.useEffect(() => {
        loadRates()
        // loadTransaction()
    }, [])

    React.useEffect(() => {
        if (rates[0]) {
            setCurrentRates({
                buy: rates[0].buy,
                sell: rates[0].sell
            })
        }
    }, [rates])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBTC({ ...BTC, [e.target.name]: e.target.value })
    }
    const handleToggle = () => {
        setOpen(!open)
    }
    const handleShowDialog = () => {
        setShowDialog(!showDialog)
    }
    const handleRatesToggle = () => {
        handleShowDialog()
        setShowRates(true)
    }

    const handleShowBlog = () => {
        handleShowDialog()
        setShowRates(false)
    }

    const handleRatesSubmit = () => {
        createRates({
            ...BTC,
            createdAt: firebaseClass.createTimeStamp()
        })
        setBTC({
            buy: BTC.buy,
            sell: BTC.sell
        })
        handleToggle()
    }
    if (!currentUser) {
        return (<div>Loading...</div>)
    }


    return (
        <>
            <Dialog open={showDialog} handleToggle={handleShowDialog}>
                {
                    showRates ?
                        <AddRates close={handleShowDialog} /> :
                        <CreateBlog createBlog={createBlog} close={handleShowDialog} />
                }
            </Dialog>
            <Box className={classes.root}>
                <Box className={classes.walletContainer}>
                    <Box className={classes.acctContainer} style={{
                        backgroundColor: orange[200]
                    }} >
                        <Box style={{
                            padding: ".3em",
                            alignItems: "center",
                            justifyContent: "space-between",
                            backgroundColor: orange[100]
                        }}>
                            <MdMonetizationOn />
                            <Box style={{
                                alignItems: "center",
                                flexDirection: "column"
                            }}>
                                {
                                    currentUser ?
                                        <h3>Admin Mode</h3> :
                                        <>
                                            <h3>REFERRAL CODE</h3>
                                            {/* <span>{props.user.referral}</span> */}
                                        </>
                                }
                            </Box>
                        </Box>
                        <Box style={{
                            flexDirection: "column",
                        }}>
                            <h3>{currentUser ? "TOTAL TRANSACTION" : "TRANSACTION HISTORY"}</h3>
                            <Box className={classes.amountContainer}>
                                {currentUser && ["pendingTransaction",
                                    "successfulTransaction",
                                    "totalTransaction"]
                                    .map((item, idx) => (
                                        <Box>
                                            <span>{item.substring(0, item.indexOf("T"))}</span>
                                            {/* <span>{((userDetail as unknown as adapter)[item])}</span> */}
                                        </Box>
                                    ))}
                            </Box>
                        </Box>
                    </Box>
                    <Box className={classes.btcContainer} style={{
                        backgroundColor: orange[200]
                    }} >
                        <Box>
                            <h4>
                                BTC RATES TODAY
                    </h4>
                            <Box className={classes.priceContainer}>
                                <h6>BUY AT: {currentRates.buy}/$</h6>
                                <h6>SELL AT: {currentRates.sell}/$</h6>
                            </Box>
                        </Box>
                        <Divider orientation="vertical" flexItem />
                        <Box style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            width: "50%"
                        }}>
                            {!currentUser &&
                                <h4>Welcome to Phonytunes. Click below to begin</h4>
                            }
                            {open &&
                                <Grow in={open}>
                                    <>
                                        <TextField name="buy" label="BUY PRICE"
                                            value={BTC.buy} onChange={handleChange}
                                        />
                                        <TextField name="sell" label="SELL PRICE"
                                            value={BTC.sell} onChange={handleChange}
                                        />
                                        <Button onClick={handleRatesSubmit}
                                            style={{
                                                color: "rgba(0,0,0,.9)",
                                                backgroundColor: deepOrange["A200"]
                                            }}>
                                            <MdPlayArrow />
                                Submit
                            </Button>
                                    </>
                                </Grow>}
                            <Box className={classes.buttonHolder}>
                                {currentUser ?
                                    <Button onClick={handleToggle}
                                        style={{
                                            backgroundColor: "rgba(0,0,0,.9)",
                                            color: deepOrange["A200"]
                                        }}>
                                        <MdPlayArrow />
                                Change BTC rates
                            </Button> :
                                    <>
                                        <Button style={{ backgroundColor: "rgba(0,0,0,.9)", color: deepOrange["A200"] }}>
                                            <MdPlayArrow />
                                Start Trade
                            </Button>
                                        <Button style={{ color: "rgba(0,0,0,.9)", backgroundColor: deepOrange["A200"] }}>
                                            <MdPlayArrow />
                                Buy Airtime
                            </Button>
                                    </>
                                }
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box className={classes.transactionContainer}>
                    <Box>
                        <TransactionTable />
                    </Box>
                    <Box>
                        {!currentUser ? <RatingCalculator /> :
                            <>
                                {/* <ReferralTable/> */}
                                <Box style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "column"
                                }}>
                                    <ButtonGroup>
                                        <Button onClick={handleRatesToggle} style={{
                                            marginTop: "1em",
                                            color: "rgba(0,0,0,.9)",
                                            backgroundColor: deepOrange["A200"]
                                        }}>
                                            Add Rates
                                        </Button>
                                        <Button style={{
                                            marginTop: "1em",
                                            backgroundColor: "rgba(0,0,0,.9)",
                                            color: deepOrange["A200"]
                                        }}
                                            onClick={handleShowBlog}
                                        >
                                            Create New Blog
                                        </Button>
                                    </ButtonGroup>
                                    {/* <Grow in={showReferralForm} >
                                        <Box style={{
                                            display: "flex",
                                            marginTop: "1em",
                                            width: "100%",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            flexDirection: "column"
                                        }}>
                                            <TextField id="datetime-local"
                                                label="Referral Start Time" name="referralStart"
                                                type="datetime-local" onChange={handleDate}
                                                defaultValue={date.referralStart}
                                            />
                                            <TextField id="datetime-local-end"
                                                label="Referral End Time" name="referralEnd"
                                                type="datetime-local" onChange={handleDate}
                                                defaultValue={date.referralEnd} />
                                            <Button onClick={submitReferral} style={{
                                                color: "rgba(0,0,0,.9)",
                                                backgroundColor: deepOrange["A200"],
                                                marginTop: "1.5em"
                                            }}>
                                                Submit
                                            </Button>
                                        </Box>
                                    </Grow> */}
                                </Box>
                            </>}
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default Dashboard