export type Domain = {
  id: string;
  status: 'pending' | 'passed' | 'failed';
  domain: string;
  updatedAt: Date;
  createdAt: Date;
  dmarc: boolean;
  dmarcError?: string;
  spf: boolean;
  spfError?: string;
  dkim: boolean;
  dkimError?: string;
};
