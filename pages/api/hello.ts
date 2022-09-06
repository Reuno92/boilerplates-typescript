// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data | string>) {
  if (req?.method === 'GET') res.status(200).json({ name: 'John Doe' });
  if (req?.method === 'POST') res.status(405).send('<img src="https://c.tenor.com/O9oDiQ9IZlEAAAAM/finger-shake-judge-judy.gif" alt="Method not allowed">');
  res.status(405).send('<img src="https://c.tenor.com/vvIkmC3kjekAAAAC/you-dont-do-that-no-saturday-night-live.gif" alt="Method not allowed">');
}
