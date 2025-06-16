import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { signInMutation, type SignInResponse } from '../../api';

import SignInForm, { type SignInFormData } from '../../organisms/SignInForm';

const defaultValues: SignInFormData = {
  username: '',
  password: '',
};

export default function SignInPage() {
  const { mutate: signIn, isPending } = useMutation<
    SignInResponse,
    Error,
    SignInFormData
  >({
    mutationFn: signInMutation,
    onSuccess: () => {
      alert('Successfully signed in!');
      // TODO: Handle navigation after successful sign in
    },
    onError: (error) => {
      console.error('Sign in failed:', error.message);
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
