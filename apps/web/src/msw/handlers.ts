import { http, HttpResponse } from 'msw';

const DELAY = 500;

async function delay(ms: number = DELAY): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const handlers = [
  http.get('/api/auth/access-tokens', async () => {
    await delay();
    return HttpResponse.json('');
  }),

  http.get('/api/domains', async () => {
    await delay();
    return HttpResponse.json([]);
  }),
];
