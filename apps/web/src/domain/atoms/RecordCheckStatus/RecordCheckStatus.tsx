import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { RecordType, type Domain } from '../../types';
import StatusIcon from '../StatusIcon';

export type RecordCheckStatusProps = {
  domain: Domain;
  recordType: RecordType;
};

export default function RecordCheckStatus({
  domain,
  recordType,
}: RecordCheckStatusProps) {
  const recordConfig = {
    [RecordType.SPF]: {
      name: 'SPF',
      status: domain.spf ? 'passed' : 'failed',
      error: domain.spfError,
    },
    [RecordType.DKIM]: {
      name: 'DKIM',
      status: domain.dkim ? 'passed' : 'failed',
      error: domain.dkimError,
    },
    [RecordType.DMARC]: {
      name: 'DMARC',
      status: domain.dmarc ? 'passed' : 'failed',
      error: domain.dmarcError,
    },
  } as const;

  const config = recordConfig[recordType];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        columnGap: 1,
        alignItems: 'center',
      }}
    >
      <StatusIcon status={config.status} />
      <Typography component="span">
        {config.name} {config.status}.
      </Typography>
      {config.error && (
        <Typography component="span" color="error">
          {config.error}.
        </Typography>
      )}
    </Box>
  );
}
