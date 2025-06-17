import axios from 'axios';
import { isApiError } from '../common/api';
import type { Domain } from './types';

export async function getDomains(page: number): Promise<[Domain[], number]> {
  try {
    const response = await axios.get<Domain[]>('/api/domains', {
      params: { page },
    });
    return [response.data, response.headers['x-total-count']];
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response?.data &&
      isApiError(error.response.data)
    ) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Failed to get domains');
  }
}

export async function addDomainMutation(domain: string): Promise<Domain> {
  const { data } = await axios.post<Domain>('/api/domains', {
    domain,
  });
  return data;
}
