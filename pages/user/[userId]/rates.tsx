import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useRouter } from "next/router"
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { DashboardLayout } from "layouts"
import { NormalInput } from "components/Input"
import { Formik, FormikProps } from "formik"
import { Button } from "components/Button"
import { useFirebase } from "react-redux-firebase"
import { useAlertService } from 'core/utils/Alert/AlertContext';
import { Grow } from "@material-ui/core"
import { Select } from "components/Input"
import { IRates } from "core/models/Rates"
import * as Yup from "yup"

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other} className="flex-1"
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: ".75rem",
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex'
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  growthContainer: {
    width: "100%",
    "& > *": {
      width: "100%"
    }
  }
}));

const initialValues = {
  cardCategory: "",
  newCardCategory:"",
  cardSubCategory: "",
  amount: 0
}

type TypeForm = typeof initialValues;

const Rates = () => {
  const router = useRouter()
  const classes = useStyles();
  const firebase = useFirebase()
  const [rates, setRates] = React.useState<IRates[]>([])
  const dialog = useAlertService()
  const [value, setValue] = React.useState(0);
  const [checkNumber, setCheckNumber] = React.useState(false)
  const [showCategory, setShowCategory] = React.useState(false)
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleToggle = () => {
    setShowCategory(!showCategory)
  }

  React.useEffect(() => {
    const listener = firebase.firestore().collection("rates").onSnapshot((docs) => {
      if (!docs.empty) {
        const result:any = [];
        docs.forEach(items => {
          result.push({
            id:items.id,
            ...items.data()
          })
        })
        setRates(result.map(item => ({
          id:item.id,
          cardCategory:item.cardCategory
        })))
      }
    })

    const urlParams = new URLSearchParams(window.location.search);
    const tabs = urlParams.get('tabs');
    if (tabs) {
      setValue(Number(tabs))
    }
    setCheckNumber(true)
    return () => {
      listener()
    }
  }, [])


  React.useEffect(() => {
    if (checkNumber) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("tabs", String(value));
      const newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
      window.history.pushState(null, '', newRelativePathQuery);
    }
  }, [value])

  const handleSubmit = async (values: TypeForm, { ...actions }: any) => {
    actions.setSubmitting(true)
    if (!showCategory){
      firebase.firestore().collection("rates").doc((values.cardCategory as any).id).update({
        subCategory:firebase.firestore.FieldValue.arrayUnion({
          name:values.cardSubCategory,
          cost:values.amount
        })
      }).then(() => {
        actions.setSubmitting(false)
        dialog({
          message: "Added new rates sub category",
          type: "success",
          title: "Completed Request"
        })
        setValue(1)
      }).catch(err => {
        actions.setSubmitting(false)
        dialog({
          message: `Error:${err.message}`,
          type: "error",
          title: "Unable to complete request"
        })
      })
    }else{
      firebase.firestore().collection("rates").doc().set({
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        cardCategory:values.newCardCategory,
        subCategory:[
          {
            name:values.cardSubCategory,
            cost:values.amount
          }
        ]
      }).then(() => {
        actions.setSubmitting(false)
        dialog({
          message: "Added new rates",
          type: "success",
          title: "Completed Request"
        })
      }).catch(err => {
        actions.setSubmitting(false)
        dialog({
          message: `Error:${err.message}`,
          type: "error",
          title: "Unable to complete request"
        })
      })
    }
    actions.resetForm()
  }

  const validationScheme = Yup.object({
    // newCardCategory:Yup.string().required()
  })

  const getSelected = (arg:IRates) => {
    if(typeof arg === "string"){
      return arg
    }else {
      return arg.cardCategory
    }
  }
  
  return (
    <DashboardLayout>
      <p className="mt-10 ml-5 font-normal text-4xl">
        Rates
      </p>
      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value} indicatorColor="primary"
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          <Tab label="Create" {...a11yProps(0)} />
          <Tab label="List" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Formik onSubmit={handleSubmit}
          validationSchema={validationScheme}
            initialValues={initialValues}
          >
            {(formikProps: FormikProps<TypeForm>) => {
              return(
                <Box className="flex flex-col items-start justify-center space-y-3 max-w-md mx-auto">
                  <Box className={`${classes.growthContainer} space-y-3`}>
                    <Grow unmountOnExit timeout={300} mountOnEnter in={showCategory} >
                      <NormalInput className="w-full" name="newCardCategory"
                        label="Write the card category" />
                    </Grow>
                    <Grow mountOnEnter unmountOnExit timeout={300} in={!showCategory} >
                      <Select options={rates} label="Select category"
                       name="cardCategory" getLabel={getSelected} />
                    </Grow>
                    <Button className="w-2/4" onClick={handleToggle}>
                      {showCategory ? "Select Category" : "Create new Category"}
                    </Button>
                  </Box>
                  <NormalInput className="w-full" name="cardSubCategory"
                    label="Write the card sub category" />
                  <NormalInput className="w-full" name="amount"
                    label="Input Amount" icon={"₦"} />
                  <Button role="submit" disabled={formikProps.isSubmitting || !formikProps.dirty || !formikProps.isValid}
                    onClick={formikProps.handleSubmit as any}>
                    Submit New Rates Charge
                  </Button>
                </Box>
              )
            }}
          </Formik>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
      </div>
    </DashboardLayout>
  );
}

export default Rates