import * as React from 'react';
import {Box,SwipeableDrawer,ToggleButton,List,ListItem,ListItemIcon,ListItemText} from '@mui/material';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
export default function CustomDrawer({sx,onclick1,onclick2,onclick3,onclick4}) {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button key='Home' onClick={onclick1}>
          <ListItemText primary="Home"/>
          <ListItemIcon>{<KeyboardArrowRightIcon/>}</ListItemIcon>
        </ListItem>
        <ListItem button key='Jobs' onClick={onclick2}>
          <ListItemText primary="Jobs"/>
          <ListItemIcon>{<KeyboardArrowRightIcon/>}</ListItemIcon>
        </ListItem>
        <ListItem button key='Employers' onClick={onclick3}>
          <ListItemText primary="Employers"/>
          <ListItemIcon>{<KeyboardArrowRightIcon/>}</ListItemIcon>
        </ListItem>
        <ListItem button key='Candidates'>
          <ListItemText primary="Candidates"/>
          <ListItemIcon>{<KeyboardArrowRightIcon/>}</ListItemIcon>
        </ListItem>
        <ListItem button key='Blogs'>
          <ListItemText primary="Blogs"/>
          <ListItemIcon>{<KeyboardArrowRightIcon/>}</ListItemIcon>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
        {<ToggleButton value="justify" sx={sx} aria-label="justified" onClick={toggleDrawer(anchor, true)}>
        <FormatAlignJustifyIcon color='primary' />
        </ToggleButton>}
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
