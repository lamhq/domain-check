import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '../../../common/atoms/Typography';

import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export type SignInFormData = {
  username: string;
  password: string;
};

export type SignInFormProps = {
  defaultValues: SignInFormData;
  onSubmit: SubmitHandler<SignInFormData>;
};

const signInFormSchema = yup.object().shape({
  username: yup.string().required('Please enter your email'),
  password: yup.string().required('Please enter your password'),
});

export function SignInForm({ defaultValues, onSubmit }: SignInFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignInFormData>({
    defaultValues,
    resolver: yupResolver(signInFormSchema),
  });

  return (
    <>
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography component="h1" variant="h1" align="center">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField
                  id="username"
                  type="email"
                  label="Email"
                  error={!!errors.username}
                  helperText={errors.username?.message}
                  color={errors.username ? 'error' : 'primary'}
                  placeholder="your@email.com"
                  autoComplete="email"
                  autoFocus
                  required
                  {...field}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  id="password"
                  type="password"
                  placeholder="••••••"
                  label="Password"
                  autoComplete="current-password"
                  required
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  color={errors.password ? 'error' : 'primary'}
                  {...field}
                />
              )}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              loading={isSubmitting}
            >
              Sign in
            </Button>
          </Box>
        </Card>
      </SignInContainer>
    </>
  );
}

const defaultValues: SignInFormData = {
  username: '',
  password: '',
};

export default function SignInPage() {
  const handleSubmit: SubmitHandler<SignInFormData> = useCallback((data) => {
    console.log(data);
  }, []);

  return <SignInForm defaultValues={defaultValues} onSubmit={handleSubmit} />;
}
