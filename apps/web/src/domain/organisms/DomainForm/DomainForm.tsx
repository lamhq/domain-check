import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { addDomainMutation } from '../../api';
import type { Domain } from '../../types';

import DomainFormView, { type DomainFormData } from '../DomainFormView';

export default function DomainForm() {
  const queryClient = useQueryClient();
  const { mutate: addDomain, isPending } = useMutation<Domain, Error, string>({
    mutationFn: addDomainMutation,
    onSuccess: (data) => {
      toast.success(`Added ${data.domain} to the list`);
      void queryClient.invalidateQueries({ queryKey: ['domains'] });
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
