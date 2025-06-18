import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import RecordCheckStatus from '../../atoms/RecordCheckStatus';
import StatusIcon from '../../atoms/StatusIcon';

import { useMemo } from 'react';
import { RecordType, type Domain } from '../../types';

export type DomainItemProps = {
  domain: Domain;
};

export default function DomainItem({ domain }: DomainItemProps) {
  const statusText = useMemo(() => {
    switch (domain.status) {
      case 'passed':
        return 'passed';
      case 'failed':
        return 'failed';
      case 'pending':
        return 'checking...';
      default:
        return '';
    }
  }, [domain.status]);

  const passedCount = [domain.dmarc, domain.spf, domain.dkim].filter(Boolean).length;
  const totalCount = 3;

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        id={`panel-${domain.id}-header`}
        sx={{
          '& .MuiAccordionSummary-content': {
            display: 'flex',
            flexDirection: 'row',
            columnGap: 1,
          },
        }}
      >
        <StatusIcon status={domain.status} />
        <Typography component="span">{domain.domain}</Typography>
        <Typography component="span">
          ({statusText}
          {domain.status !== 'pending' && ` ${passedCount}/${totalCount}`})
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', rowGap: 1 }}>
        {domain.status === 'pending' ? (
          <Typography component="span">
            The check is still in progress. Please check back later.
          </Typography>
        ) : (
          <>
            <RecordCheckStatus domain={domain} recordType={RecordType.SPF} />
            <RecordCheckStatus domain={domain} recordType={RecordType.DMARC} />
            <RecordCheckStatus domain={domain} recordType={RecordType.DKIM} />
          </>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
