import axios from 'axios';
import type { Domain } from './types';

export async function getDomains(
  page: number,
  size = 5,
): Promise<[Domain[], number]> {
  try {
    const offset = (page - 1) * size;
    const limit = size;

    const response = await axios.get<Domain[]>('/api/domains', {
      params: { offset, limit },
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const value = response.headers['x-total-count'];
    const total = typeof value === 'string' ? parseInt(value, 10) : 0;
    const pageCount = Math.ceil(total / size);
    return [response.data, pageCount];
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
