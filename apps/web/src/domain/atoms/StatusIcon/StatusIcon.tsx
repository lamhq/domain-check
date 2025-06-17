import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import HourglassTopTwoToneIcon from '@mui/icons-material/HourglassTopTwoTone';
import VerifiedTwoToneIcon from '@mui/icons-material/VerifiedTwoTone';

import type { Domain } from '../../types';

export type StatusIconProps = {
  status: Domain['status'];
};

export default function StatusIcon({ status }: StatusIconProps) {
  switch (status) {
    case 'pending':
      return <HourglassTopTwoToneIcon />;
    case 'passed':
      return <VerifiedTwoToneIcon color="success" />;
    case 'failed':
      return <CancelTwoToneIcon color="error" />;
    default:
      return null;
  }
}
