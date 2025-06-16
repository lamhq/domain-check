import { http, HttpResponse } from 'msw';

const DELAY = 1000;

async function delay(ms: number = DELAY): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const handlers = [
  http.post('api/auth/access-tokens', async () => {
    await delay();
    return HttpResponse.json({
      token: 'token',
      user: {
        id: '123',
        email: 'test@test.com',
      },
    });
  }),

  http.get('api/domains', async () => {
    await delay();
    return HttpResponse.json([]);
  }),
];
