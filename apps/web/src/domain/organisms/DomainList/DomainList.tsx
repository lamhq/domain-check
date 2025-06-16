import Box from '@mui/material/Box';
import DomainItem from '../../molecules/DomainItem';

import type { Domain } from '../../types';

export type DomainListProps = {
  domains: Domain[];
};

export default function DomainList({ domains }: DomainListProps) {
  return (
    <Box sx={{ width: '100%' }}>
      {domains.map((domain) => (
        <DomainItem key={domain.id} domain={domain} />
      ))}
    </Box>
  );
}
