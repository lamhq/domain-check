import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { getDomains } from '../../api';
import DomainItem from '../../molecules/DomainItem';

export default function DomainList() {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const {
    data: domains,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['domains', page],
    queryFn: async () => {
      const [items, total] = await getDomains(page);
      setTotalPage(total);
      return items;
    },
    placeholderData: keepPreviousData,
  });

  const handlePageChange = useCallback(
    (_: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
    },
    [],
  );

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />;
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <Typography color="error">{error.message}</Typography>
      </Box>
    );
  }

  if (!domains || domains.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <Typography variant="body1" color="text.secondary">
          No domains found
        </Typography>
      </Box>
    );
  }

  const bluredStyle = isFetching
    ? { filter: 'blur(2px)', transition: 'filter 0.5s ease' }
    : {};
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}
    >
      <Box sx={{ width: '100%', ...bluredStyle }}>
        {domains.map((domain) => (
          <DomainItem key={domain.id} domain={domain} />
        ))}
      </Box>
      {totalPage > 1 && (
        <Pagination
          count={totalPage}
          page={page}
          shape="rounded"
          onChange={handlePageChange}
        />
      )}
    </Box>
  );
}
