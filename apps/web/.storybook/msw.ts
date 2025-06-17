import { http, HttpResponse } from 'msw';

const DELAY = 1000;

async function delay(ms: number = DELAY): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const handlers = [
  http.post('api/auth/access-tokens', async ({ request }) => {
    await delay();
    const body = (await request.json()) as { username: string; password: string };
    const { username, password } = body;
    if (username !== 'test@test.com' || password !== 'password') {
      return HttpResponse.json(
        {
          message: 'Invalid username or password',
        },
        { status: 401 },
      );
    }

    return HttpResponse.json({
      token: 'token',
      user: {
        id: '123',
        email: 'test@test.com',
      },
    });
  }),

  http.post('api/domains', async () => {
    await delay();
    return HttpResponse.json({
      id: '123',
      status: 'passed',
      domain: 'example.com',
      updatedAt: new Date(),
      createdAt: new Date(),
      dmarc: true,
      spf: true,
      dkim: true,
    });
  }),

  http.get('api/domains', async ({ request }) => {
    await delay();
    const page = Number(new URL(request.url).searchParams.get('page'));
    const totalPage = 10;
    // simulate pagination
    const items =
      page % 2 === 0
        ? [
            {
              id: '1',
              domain: 'example.com',
              status: 'passed',
              updatedAt: new Date(),
              createdAt: new Date(),
              dmarc: true,
              spf: true,
              dkim: true,
            },
            {
              id: '2',
              domain: 'test.com',
              status: 'failed',
              updatedAt: new Date(),
              createdAt: new Date(),
              dmarc: false,
              spf: false,
              dkim: true,
            },
            {
              id: '3',
              domain: 'demo.com',
              status: 'pending',
              updatedAt: new Date(),
              createdAt: new Date(),
              dmarc: false,
              spf: false,
              dkim: false,
            },
          ]
        : [
            {
              id: '4',
              domain: 'site1.com',
              status: 'passed',
              updatedAt: new Date(),
              createdAt: new Date(),
              dmarc: true,
              spf: true,
              dkim: true,
            },
            {
              id: '5',
              domain: 'site2.com',
              status: 'failed',
              updatedAt: new Date(),
              createdAt: new Date(),
              dmarc: false,
              spf: true,
              dkim: false,
            },
            {
              id: '6',
              domain: 'site3.com',
              status: 'pending',
              updatedAt: new Date(),
              createdAt: new Date(),
              dmarc: false,
              spf: false,
              dkim: false,
            },
          ];
    return HttpResponse.json(items, {
      headers: {
        'x-total-count': totalPage.toString(),
      },
    });
  }),
];
