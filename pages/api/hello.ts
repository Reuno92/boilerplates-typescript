// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data | string>) {
  if (req?.method === 'GET') res.status(200).json({ name: 'John Doe' });
  if (req?.method === 'POST') res.status(405).send('<img src="https://c.tenor.com/yrlJLBWdxZ8AAAAC/naughty-tom-and-jerry.gif" alt="Method not allowed">');
  res.status(405).send('<img src="https://c.tenor.com/vvIkmC3kjekAAAAd/you-dont-do-that-no-saturday-night-live.gif" alt="Method not allowed">');
}
