import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { addDomainMutation, type Domain } from '../../api';

import DomainFormView, { type DomainFormData } from '../DomainFormView';

export default function DomainForm() {
  const { mutate: addDomain, isPending } = useMutation<Domain, Error, string>({
    mutationFn: addDomainMutation,
    onSuccess: (data) => {
      toast.success(data.status);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit: SubmitHandler<DomainFormData> = useCallback(
    (data) => {
      addDomain(data.domain);
    },
    [addDomain],
  );

  return (
    <DomainFormView
      defaultValues={{ domain: 'abc.ci' }}
      onSubmit={handleSubmit}
      isSubmitting={isPending}
    />
  );
}
