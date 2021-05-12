import React from 'react';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import {ListItemText,List, MenuItem, ListItem} from '@material-ui/core';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import useTableService from "components/Table/TableContext"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      "& .Mui-selected":{
        backgroundColor:`${theme.palette.primary.main} !important`
      }
    },
  }),
);


interface IProps {
  items: string[]
}

const options = [
  'Show some love to Material-UI',
  'Show all notification content',
  'Hide sensitive notification content',
  'Hide all notification content',
];

const CustomizedMenus: React.FC<IProps> = ({items}) => {
  const classes = useStyles();
  const {
    filter:{
      handleClick,
      handleClose,
      anchorEl,
      selectedFilter,
      setFilter
    }
  } = useTableService()

  return (
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {items.map((option, index) => (
          <MenuItem 
            key={option}
            selected={index === selectedFilter}
            onClick={(event) => setFilter(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
  );

}

export default CustomizedMenus