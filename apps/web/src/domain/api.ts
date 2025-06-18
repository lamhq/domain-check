import axios from 'axios';
import type { Domain } from './types';

export async function getDomains(page: number): Promise<[Domain[], number]> {
  try {
    const response = await axios.get<Domain[]>('/api/domains', {
      params: { page },
    });
    return [response.data, response.headers['x-total-count']];
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get domains');
  }
}

export async function addDomainMutation(domain: string): Promise<Domain> {
  try {
    const { data } = await axios.post<Domain>('/api/domains', {
      domain,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to add domain');
  }
}
