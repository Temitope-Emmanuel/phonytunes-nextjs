import React from 'react';
import { makeStyles, createStyles, Theme,fade,lighten } from '@material-ui/core/styles';
import { Table, Typography, Toolbar, Tooltip,Chip, IconButton, InputBase } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from "@material-ui/core/TablePagination"
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import TableRow from "./TableRow"
import clsx from "clsx"
import { Box } from '@material-ui/core';
import { BiFilter } from 'react-icons/bi';
import { FaCloudDownloadAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { HiOutlineSearch } from 'react-icons/hi'
import useTableService from "components/Table/TableContext"
import {Menu} from "components/Menu"
import { useBreakpoints } from 'utils/functions';


const useStyles = makeStyles((theme) => createStyles({
  root: {
    width: "100%",
    overflow: "auto",
    "& svg": {
      color: "black"
    },
    "& > div:nth-child(2)": {
      width: "100%"
    },
    "& .MuiTablePagination-selectRoot": {
      [theme.breakpoints.down("sm")]: {
        marginRight: "0 !important"
      }
    }
  }
}));


interface ToolbarFunctions {
  download?: () => void;
  filterOptions?:string[]
}

interface IProps extends ToolbarFunctions {
  heading: any[];
  title: string;
  subtitle?: string
  rowLength: number;
}

interface EnhancedTableToolbarProps extends ToolbarFunctions {
  numSelected: number;
  title: string;
  subtitle?: string
}

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
      backgroundColor:theme.palette.primary.main,
      "& svg": {
        color: "rgba(0, 0, 0, 0.74) !important"
      }
    },
    highlight:
      theme.palette.type === 'light'
        ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
        : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
    title: {
      flex: '1 1 100%',
    },
    grow: {
      flexGrow: 1,
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      height:"auto",
      margin:"auto",
      display:"flex",
      alignItems:"center",
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '25ch',
          height:"2rem"
        },
      },
    },
  }),
);



const EnhancedTableToolbar = ({
  title, subtitle, numSelected,
  download,filterOptions
}: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles();
  const {currentBreakpoints} = useBreakpoints()
  const {
    input:{
      text,
      handleChangeText
    },
    filter:{
      handleClick,
      selectedFilter
    }
  } = useTableService()
  
  return (
    <Toolbar 
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
          
            currentBreakpoints != "base" ?
            <Box className="mr-auto">
              <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                {title}
              </Typography>
              {
                subtitle &&
                <Typography className="text-sm" id="tableTitle" >
                  {subtitle}
                </Typography>
              }
            </Box>
          :
          <Box/>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <MdDelete />
          </IconButton>
        </Tooltip>
      ) : (
        <Box className="flex flex-grow justify-between">
          <div className={classes.grow} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <HiOutlineSearch />
            </div>
            <InputBase value={text}
            onChange={handleChangeText as any}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow}/>
          <Box className="flex flex-row">
            <Tooltip title="Download">
              <IconButton onClick={download as any} aria-label="Download">
                <FaCloudDownloadAlt />
              </IconButton>
            </Tooltip>
            <Box>
            {currentBreakpoints != "base" && 
              <Chip label={filterOptions?.[selectedFilter]}/>
            }
              <Tooltip title="Filter list" onClick={handleClick}>
                <IconButton aria-label="filter list">
                  <BiFilter />
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
                items={filterOptions || []}
            />
          </Box>
        </Box>
      )}
    </Toolbar>
  );
};





const CustomizedTables: React.FC<IProps> = ({
  children, title, subtitle,filterOptions,
  heading, rowLength, download
}) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <EnhancedTableToolbar title={title} subtitle={subtitle}
        numSelected={0} download={download} filterOptions={filterOptions} />
      <TableContainer style={{
        maxHeight: "40rem"
      }}>
        <Table stickyHeader aria-label="customized table">
          <TableHead>
            <TableRow isLoaded={true} fields={heading}
            />
          </TableHead>
          <TableBody>
            {children}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rowLength}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default CustomizedTables