import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme,Theme,createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import {MdDashboard} from 'react-icons/md';
import {CgArrowsExchange} from 'react-icons/cg';
import {Dashboard} from "../../src/views/Dashboard"
import {TransactionTable} from '../../src/components/TransactionTable'
import {Footer} from "../../src/views/Footer"
import {orange} from "@material-ui/core/colors"
import getUser from "../../src/utils/userAuth"
interface ITabProps {
    children:React.ReactNode;
    value:number;
    index:number;
    dir:string;
}

const TabPanel:React.FC<ITabProps> = function (props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div style={{
        margin:"0 0",
        padding:"0 0",
        // width:"100%",
        // height:"100%",
      }}
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
            <Box>
              {children}
            </Box>
        )}
      </div>
    );
}

function a11yProps(index:number) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}
  
const useStyles = makeStyles((theme:Theme) => (
    createStyles({
        root: {
            backgroundColor:"rgba(255,255,255,.3)",
            width: "100%",
            position:"relative",
            marginTop:"5.5em",
            overflowX:"hidden",
            height:"auto",
            display:"flex",
            justifyContent:"space-evenly",
            alignItems:"center",
            flexDirection:"column",
            "& > header:first-child":{
              marginRight: "50%",
              transform: "translateX(50%)",
              marginTop:"4em",
              width:"50%",
              position:"fixed",
              top:0
            }
        }
    })
))


  const UserComponent = () => {
    const classes = useStyles()
    const theme = useTheme()
    const [value,setValue] = React.useState(0)
    const {currentUser} = getUser()
    // const {} = useCollection("")
    const handleChange = (evt: any,newValue: any) => {
        setValue(newValue)
    }
    const handleChangeIndex = (idx:number) => {
        setValue(idx)
    }


    return(
        <>
        <div className={classes.root}>
          <AppBar color="default" elevation={10} style={{
            zIndex:5
          }} >
            <Tabs
              value={value}
              onChange={handleChange}
              style={{
                 backgroundColor:orange[200]
              }}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              {[<MdDashboard/>,<CgArrowsExchange/>].map((m,idx) => (
                <Tab key={idx} icon={m} label={`tab ${idx+1}`} {...a11yProps(idx)} />
              ))}
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} 
            dir={theme.direction}
            >
              <Dashboard/>
            </TabPanel>
            <TabPanel value={value} index={1}
             dir={theme.direction}>
               <div style={{
               display:"flex",
               justifyContent:"center",
               alignItems:"center",
               padding:"0 1%",
               width:"98%",
               margin:"5em 0"
             }}>
              <TransactionTable/>
               </div>
            </TabPanel>
            <TabPanel value={value} index={2}
             dir={theme.direction}
             >
                <Dashboard/>
            </TabPanel>
          </SwipeableViews>
          <Footer/>
        </div>
        </>
      )     
  }

  export default UserComponent