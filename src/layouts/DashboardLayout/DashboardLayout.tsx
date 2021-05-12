import React from 'react';
import Link from "next/link"
import {useRouter} from "next/router"
import {
  AppBar,Drawer,Typography,
  CssBaseline,Chip,Box,Avatar, ListItemIcon, Menu, MenuItem } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import { CgBell } from 'react-icons/cg'
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import { MdDashboard } from "react-icons/md"
import { GiHamburgerMenu } from "react-icons/gi"
import {BsFillChatSquareDotsFill, BsFillPeopleFill} from "react-icons/bs"
import { orange } from '@material-ui/core/colors';
import {BiTransferAlt} from "react-icons/bi"
import {AiFillHome} from 'react-icons/ai'
import { useAppSelector } from 'store/hooks';
import {RiAccountPinCircleFill} from "react-icons/ri"
import { useAlertService } from 'core/utils/Alert/AlertContext';
import { FaPowerOff } from 'react-icons/fa';
import { useFirebase } from 'react-redux-firebase';

const drawerWidth = 240;


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      backgroundColor:"#F9F5F9",
      minHeight:"100vh",
    },
    drawer: {
      [theme.breakpoints.up('md')]: {
        width: drawerWidth,
        flexShrink: 0,
      }
    },
    appBar: {
      backgroundColor: "white",
      zIndex: theme.zIndex.drawer + 1,
      "& > div":{
        [theme.breakpoints.up("sm")]:{
          // paddingRight:theme.spacing(10)
        }
      }
    },
    optionContainer: {
      margin: ".5rem 0",
      width:"100%",
      "& a": {
        textDecoration: "none",
        "& > div":{
          paddingLeft:theme.spacing(2),
          transition:"all .3s ease-in-out",
        }
      },
      "& p": {
        margin: ".5rem 0"
      },
      "& svg": {
        marginRight: ".5rem"
      },
      "& > *": {
        cursor: "pointer",
        alignItems: "center"
      }
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        display: 'none'
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
      display: "flex",
      justifyContent: "flex-start",
      paddingTop: "5rem",
      alignItems: "center",
      backgroundImage:`linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5)), url(/brandImage/phonyweb-05.png)`,
      backgroundSize:"cover",
      backgroundPosition:"center top",
      backgroundRepeat:"no-repeat",
      color:"white",
      "& svg":{
        fontSize:"1.5rem",
        color:theme.palette.text.primary
      }
    },
    content: {
      flexGrow: 1
    },
    link: {
      color: "white",
      opacity: .8
    },
    activeLink: {
      color: orange[900],
      borderRight:`3.75px solid ${orange[900]}`,
      opacity: "1 !important"
    },
    sectionDesktop: {
      // display: 'none',
      marginLeft: "auto",
      alignItems: "center",
      // [theme.breakpoints.up('md')]: {
      //   display: 'flex',
      // }
    },
    navHeader:{
      fontWeight:"lighter",
      fontSize:"2rem",
      textAlign:"center",
      display:"none",
      marginBottom:theme.spacing(5)
    },
    chipContainer: {
      "&:hover": {
        cursor: "pointer"
      },
      "& > svg": {
        fontSize: "1.5rem"
      }
    }
  })
);

interface IProps {
  children: any
}

const DashboardLayout:React.FC<IProps> = ({children,props}:any) => {
  const {query,...router} = useRouter()
//   const location = useLocation()
  const activeLink = router.pathname
//   const params = useParams()
  const theme = useTheme();
  const firebase = useFirebase()
  const dialog = useAlertService()
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const currentUser = useAppSelector(state => state.firebase.profile)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handeShowProfile = () => {
    router.push(`/user/${currentUser.id}/user/${currentUser.id}`)
    handleMenuClose()
  }
  const handleLogout = () => {
    firebase.logout().then(() => {
      router.push("/")
      handleMenuClose()
      dialog({
        message: "Sign out successful",
        type: "info",
        title: ""
      })
    }).catch(err => {
      dialog({
        message: `Error:${err.message}`,
        title: "Sign out Failed",
        type: "info",
      })
    })
  }
  

  const menuId = 'primary-search-account-menu';
  const dashboardMenu = [
    // { icon: <MdDashboard/>, name: "Dashboard", link: "/" },
    { icon: <BsFillChatSquareDotsFill/>, name: "Chat", link: `/chat` },
    { icon: <BiTransferAlt/>, name: "Transaction", link: `/` },
    { icon: <BiTransferAlt/>, name: "Rates", link: `/rates` },
    // { icon: BsFillCollectionPlayFill, name: "Subscription", link: "/subscription" },
    // { icon: FaCalendarCheck, name: "Manage Churches", link: "/churches" },
    // { icon: MdSettings, name: "Configurations", link: "/setting" },
    // { icon: IoMdWallet, name: "Transaction logs", link: "/transaction" },
    // { icon: AiFillFile, name: "Reports", link: "/report" }
  ]
  
  
  const drawer = (
      <Box className={`${classes.optionContainer} space-y-2`}>
        {dashboardMenu.map((item, idx) => (
          <Link key={idx} href={`/user/${query.userId}${item.link}`} >
            <Box className={`flex items-center ${activeLink.endsWith(item.link) ? classes.activeLink : classes.link}`} >
              {/* <Icon boxSize="1.125rem" as={item.icon} /> */}
              <IconButton>
                  {item.icon}
              </IconButton>
              <Typography className="ml-4 text-base" >{item.name}</Typography>
            </Box>
          </Link>
        ))}
      </Box>
  );
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {

      }
      <MenuItem className="text-gray" onClick={handeShowProfile}>
        <ListItemIcon>
          <BsFillPeopleFill />
        </ListItemIcon>
        <Typography>
          Profile
        </Typography>
      </MenuItem>
      <MenuItem className="text-gray">
        <ListItemIcon>
          <CgBell/>
        </ListItemIcon>
      </MenuItem>
      <MenuItem className="text-gray">
        <ListItemIcon>
          <AiFillHome/>
        </ListItemIcon>
      </MenuItem>
      <MenuItem className="text-gray" onClick={handleLogout}>
        <ListItemIcon>
          <FaPowerOff />
        </ListItemIcon>
        <Typography>
          Logout
        </Typography>
      </MenuItem>
    </Menu>
  );
  if(currentUser.isEmpty){
    return <div>Loading...</div>
  }
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <IconButton>
              <GiHamburgerMenu/>
            </IconButton>
            </IconButton>
          <div className={classes.sectionDesktop}>
            <Chip size="medium"
              onClick={handleProfileMenuOpen}
              className={classes.chipContainer} deleteIcon={
                currentUser.imageURL ?
                  <Avatar src={currentUser.imageURL} /> :
                  <RiAccountPinCircleFill />
              } label={`Hi, ${currentUser?.username || currentUser.email}`} onDelete={handleProfileMenuOpen} />
            {renderMenu}
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden mdUp implementation="css">
          <Drawer
            // container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <div className={classes.toolbar} />
            <Typography className={classes.navHeader}>
              Global Admin
            </Typography>
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <div className={classes.toolbar} />
            <Typography color="primary" className="center">
              Global Admin
            </Typography>
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar}/>
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout