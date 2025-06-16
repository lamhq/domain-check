import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, TextField } from '@mui/material';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

export type DomainFormData = {
  domain: string;
};

export type DomainFormViewProps = {
  defaultValues: DomainFormData;
  onSubmit: SubmitHandler<DomainFormData>;
  isSubmitting?: boolean;
};

const domainFormSchema = yup.object().shape({
  domain: yup
    .string()
    .required('Domain is required')
    .matches(
      /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/,
      'Please enter a valid domain name',
    ),
});

export default function DomainFormView({
  defaultValues,
  onSubmit,
  isSubmitting = false,
}: DomainFormViewProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DomainFormData>({
    defaultValues,
    resolver: yupResolver(domainFormSchema),
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: { xs: 'flex' },
        flexDirection: 'row',
        width: { xs: '100%', md: 'fit-content' },
        overflow: 'auto',
      }}
    >
      <Controller
        name="domain"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Domain"
            variant="outlined"
            size="small"
            sx={{ width: 300 }}
            error={!!errors.domain}
            helperText={errors.domain?.message}
            color={errors.domain ? 'error' : 'primary'}
            placeholder="example.com"
          />
        )}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ ml: 1, height: 40 }}
        loading={isSubmitting}
      >
        Add
      </Button>
    </Box>
  );
}
