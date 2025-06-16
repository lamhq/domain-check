import axios from 'axios';

export type Domain = {
  id: string;
  status: 'pending' | 'passed' | 'failed';
  domain: string;
  updatedAt: Date;
  dmarc: boolean;
  dmarcError?: string;
  spf: boolean;
  spfError?: string;
  dkim: boolean;
  dkimError?: string;
};

export const addDomainMutation = async (domain: string): Promise<Domain> => {
  const { data } = await axios.post<Domain>('/api/domains', {
    domain,
  });
  return data;
};
