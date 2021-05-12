import React from "react"
import Link from "next/link"
import {useRouter} from "next/router"
import {
    createStyles, makeStyles, Box, Button, 
    Collapse, Paper, IconButton, Grid, 
    Typography
} from "@material-ui/core"
import { Table, TableRow } from "components/Table"
import {Transaction} from "core/models/Transaction"
import { IoIosArrowForward, IoMdSend } from "react-icons/io"
import { NormalInput } from "components/Input"
import { Formik, FormikProps } from "formik"
import { BsImageFill } from "react-icons/bs"
import { AppState } from "store"
import { useAlertService } from "core/utils/Alert/AlertContext"
import { useFirestoreConnect } from "react-redux-firebase"
import { useAppSelector } from "store/hooks"
import useTableService from "components/Table/TableContext"
import {DashboardLayout} from "layouts/DashboardLayout"
import { useBreakpoints, downloadFile } from "utils/functions"
import {useImageTransformation} from "utils/useCustomHooks"


const useStyles = makeStyles(theme => createStyles({
    root: {
        padding: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        "& button": {
            width: "max-content"
        },
        [theme.breakpoints.up("md")]: {
            padding: theme.spacing(4)
        }
    },
    mapContainer: {
        height: "50rem",
    },
    status: {
        width: "fit-content",
        color: "white",
        padding: "2px .5rem",
        borderRadius: "4px",
        margin: theme.spacing(.25, 0)
    },
    label: {
        "& svg": {
            backgroundColor: theme.palette.primary.main,
            color: "black",
            borderRadius: "50%",
            fontSize: "2em",
            padding: ".3em"
        }
    },
    image: {
        width: "100%",
        maxHeight: "15rem",
        objectFit: "contain"
    }
}))

const initialValues = {
    address: {
        placeId: "",
        description: ""
    },
    company: "",
    locationName: "",
    organization:""
}

type FormType = typeof initialValues

type TransactionKey = keyof Transaction
const filterOptions:TransactionKey[] = ["comment","createdAt","status","type"]

const DashboardIndex = () => {
    const currentUser = useAppSelector((state: AppState) => state.firebase.profile)
    useFirestoreConnect([
        {
            collection: `users/${currentUser.id}/transactions`,
            storeAs: "transactions",
            orderBy:[["createdAt","asc"]]
        }
    ])

    const {
        input:{
            text
        },
        filter:{
            selectedFilter
        }
    } = useTableService()
    const router = useRouter()
    const { baseOnBreakpoints,currentBreakpoints } = useBreakpoints()
    const {handleImageReset,handleImageTransformation,image} = useImageTransformation()
    const dialog = useAlertService()
    const transaction = useAppSelector(state => state.firestore.ordered.transactions) || []
    const [displayTransaction,setDisplayTransaction] = React.useState<Transaction[]>([])
    
    React.useEffect(() => {
        const testString = new RegExp(text, "i")
        const newDisplay = transaction?.filter(item => testString.test(item[filterOptions[selectedFilter]] as any))
        setDisplayTransaction([...newDisplay])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text,selectedFilter])

    const classes = useStyles()
    console.log({transaction})

    const [openDialog, setOpenDialog] = React.useState(false)
    const [checked, setChecked] = React.useState(false)
    const handleCheck = () => {
        setChecked(!checked)
    }
    const handleToggle = () => {
        setOpenDialog(!openDialog)
    }
    const showGoogleMap = () =>  {
        handleToggle()
    }

    const handleSubmit = async (values: FormType, { ...actions }: any) => {
    }

    const handleFileDownload = React.useMemo(() => {
       return () => {
            downloadFile(displayTransaction.map(item => {
                const createdAt = ((item.createdAt as any)?.toDate() as Date).toLocaleDateString().substring(0).replaceAll("/", " ")
                return ({
                    id: item.id,
                    createdAt,
                    company: currentUser.company
                })
            }),"location")
        }
    },[displayTransaction,currentUser])


    return (
        <DashboardLayout>
            <Box className={`${classes.root} space-y-5`}>
                <Button variant="contained" color="primary"
                    onClick={handleCheck} className="self-end">
                    {
                        checked ? "Close Form" : "Create New Transaction"
                    }
                </Button>
                <Collapse in={checked}>
                    <Grid container component={Paper} className="p-2 md:py-6 max-w-6xl">
                        <Formik onSubmit={handleSubmit} 
                            initialValues={initialValues} 
                        >
                            {(formikProps: FormikProps<FormType>) => {
                                return (
                                    <>
                                        <Grid item lg={6} md={6} sm={12} xs={12} className="space-y-3 ml-0">
                                            <Box className="flex justify-between space-x-2 w-full">
                                                <NormalInput name="locationName" className="mb-8 w-1/2"
                                                    label="Location Name"
                                                />
                                                {/* <Select name="organization" className="w-1/2"
                                                    label="Select Organization" options={companyOrganization.map(item => (item.organizationName))}
                                                /> */}
                                            </Box>
                                                {
                                                    formikProps.values.address.placeId 
                                                    &&
                                                    <Button variant="contained"
                                                        color="secondary" onClick={showGoogleMap} >
                                                        View Location
                                                    </Button>
                                                }
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={12} xs={12}>
                                            <Box className="flex flex-col items-center justify-center space-y-2">
                                                <input accept="image/jpeg;image/png" name="image" onChange={handleImageTransformation}
                                                    type="file" style={{ display: "none" }}
                                                    id="Image-input" />
                                                <label htmlFor="Image-input" className={classes.label}>
                                                    {image.file ?
                                                        <img className={classes.image} src={image.base64} /> :
                                                        <Button component="span">
                                                            <BsImageFill />
                                                        </Button>
                                                    }
                                                </label>
                                                <Typography style={{
                                                    fontSize: "1.4em"
                                                }} variant="subtitle2" >
                                                    {image.name ? image.name : "Upload Location Image"}
                                                </Typography>
                                                <Button color="primary" variant="outlined" className="ml-8"
                                                    disabled={!formikProps.dirty || !formikProps.isValid || formikProps.isSubmitting}
                                                    type="submit" onClick={formikProps.handleSubmit as any} >
                                                    <IoMdSend />
                                                    <span className="pl-4 capitalize">
                                                        {formikProps.isSubmitting ? "Creating new Location" : "Send"}
                                                    </span>
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </>
                                )
                            }}

                        </Formik>
                    </Grid>
                </Collapse>
                <Table filterOptions={filterOptions} download={handleFileDownload}
                 rowLength={displayTransaction.length} title="Transactions"
                    heading={[
                        ...baseOnBreakpoints("base", [""]),
                        "Date","Comment",
                        "remarks", ""]}>
                    {displayTransaction.map((item, idx) => (
                        <TableRow key={`${item.id}-${idx}` || idx} isLoaded={Boolean(true)}
                        link={currentBreakpoints === "base" ? () => router.push(`/user/${router.query.userId}/location/${item.id}`) : undefined}
                            fields={[
                                ((item?.createdAt as any)?.toDate() as Date).toLocaleTimeString(),
                                item.comment,
                                item.status,
                                <Link href={`/user/${router.query.userId}/location/${item.id}`} >
                                    <IconButton>
                                        <IoIosArrowForward />
                                    </IconButton>
                                </Link>
                            ]}
                        />
                    ))}
                </Table>
            </Box>
        </DashboardLayout>
    )
}

export default DashboardIndex