import type { NextApiRequest, NextApiResponse } from 'next';
import RickMortyRepository from '../../../controller/RickMorty.repository';
import instanceOfNodeError from '../../../tool/Error.guard';

const RICK_AND_MORTY_API = async (req: NextApiRequest, res: NextApiResponse<Response | void | string>) => {
  const CONTROLLER = new RickMortyRepository();
  const { pid } = req.query;

  if (req?.method === 'GET') {
    try {
      return res.status(200).json(await CONTROLLER?.getList(Number(pid)));
    } catch (e: NodeJS.ErrnoException | unknown | null) {
      if (instanceOfNodeError<TypeErrorConstructor>(e, TypeError)) {
        return res.status(500).send(e?.message);
      }
    }
  }
  return res.status(405).send('<img src="https://c.tenor.com/a9JZTYSb4ZwAAAAd/buhh-saturday-night-live.gif" alt="Method not allowed">');
};

export default RICK_AND_MORTY_API;
