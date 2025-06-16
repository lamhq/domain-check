import TimelineIcon from '@mui/icons-material/Timeline';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router';
import ListItemIcon from './ListItemIcon';
import SignOutMenuItem from './SignOutMenuItem';

export default function Sidebar() {
  return (
    <>
      <List>
        <ListItemButton component={Link} to="/">
          <ListItemIcon>
            <TimelineIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </List>
      <Divider />
      <List>
        <SignOutMenuItem />
      </List>
    </>
  );
}
