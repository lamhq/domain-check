import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from './ListItemIcon';

export default function SignOutMenuItem() {
  const signOut = () => {
    throw new Error('Not implemented');
  };
  return (
    <ListItemButton onClick={signOut}>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>
  );
}
