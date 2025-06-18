export type CheckResult = {
  domain: string;
  error: string | null;
  dmarc: 'pass' | 'fail';
  dmarc_error: string | null;
  spf: 'pass' | 'fail';
  spf_error: string | null;
  dkim: 'pass' | 'fail';
  dkim_error: string | null;
};
