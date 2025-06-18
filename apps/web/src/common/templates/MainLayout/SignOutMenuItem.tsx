import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useSignOut } from '../../../auth';
import ListItemIcon from './ListItemIcon';

export default function SignOutMenuItem() {
  const signOut = useSignOut();
  return (
    <ListItemButton onClick={signOut}>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>
  );
}
