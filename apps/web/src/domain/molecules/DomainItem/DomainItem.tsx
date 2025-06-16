import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import HourglassTopTwoToneIcon from '@mui/icons-material/HourglassTopTwoTone';
import VerifiedTwoToneIcon from '@mui/icons-material/VerifiedTwoTone';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';

import type { Domain } from '../../types';

export type DomainItemProps = {
  domain: Domain;
};

function getIcon(status: Domain['status']) {
  let icon = null;
  switch (status) {
    case 'pending':
      icon = <HourglassTopTwoToneIcon />;
      break;
    case 'passed':
      icon = <VerifiedTwoToneIcon color="success" />;
      break;
    case 'failed':
      icon = <CancelTwoToneIcon color="error" />;
      break;
  }
  return icon;
}

export default function DomainItem({ domain }: DomainItemProps) {
  let statusText = '';
  let passedCount = 0;
  if (domain.dmarc) passedCount++;
  if (domain.spf) passedCount++;
  if (domain.dkim) passedCount++;
  const totalCount = 3;

  switch (domain.status) {
    case 'passed':
      statusText = 'passed';
      break;
    case 'failed':
      statusText = 'failed';
      break;
    case 'pending':
      statusText = 'checking...';
      break;
  }

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ArrowDownwardIcon />}
        id={`panel-${domain.id}-header`}
        sx={{
          '& .MuiAccordionSummary-content': {
            display: 'flex',
            flexDirection: 'row',
            columnGap: 1,
          },
        }}
      >
        {getIcon(domain.status)}
        <Typography component="span">{domain.domain}</Typography>
        <Typography component="span">
          ({statusText}
          {domain.status !== 'pending' && ` ${passedCount}/${totalCount}`})
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}
