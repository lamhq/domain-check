import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { signInMutation, type SignInResponse } from '../../api';

import SignInForm, { type SignInFormData } from '../../organisms/SignInForm';

const defaultValues: SignInFormData = {
  username: 'test@test.com',
  password: 'password',
};

export default function SignInPage() {
  const navigate = useNavigate();
  const { mutate: signIn, isPending } = useMutation<
    SignInResponse,
    Error,
    SignInFormData
  >({
    mutationFn: signInMutation,
    onSuccess: () => {
      toast.success('Successfully signed in!');
      void navigate('/');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit: SubmitHandler<SignInFormData> = useCallback(
    (data) => {
      signIn(data);
    },
    [signIn],
  );

  return (
    <SignInForm
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      isSubmitting={isPending}
    />
  );
}
