import axios from 'axios';
import type { Domain } from './types';

export const addDomainMutation = async (domain: string): Promise<Domain> => {
  const { data } = await axios.post<Domain>('/api/domains', {
    domain,
  });
  return data;
};
