import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../lib/server/withHandler";
import db from "../../lib/server/db";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOption } from "../../lib/server/sessionOption";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  {
    if (req.method === "GET") {
      const {
        session: { user },
      } = req;
      if (!user?.id) {
        return res.status(401).end();
      }
      const profile = await db.user.findUnique({
        where: {
          id: user.id,
        },
      });
      res.json({
        ok: true,
        profile,
      });
    }
    if (req.method === "POST") {
      const { email, name } = req.body;
      if (name) {
        await db.user.update({
          where: {
            email,
          },
          data: {
            name,
          },
        });
      }
    }
    res.end();
  }
}

export default withIronSessionApiRoute(handler, sessionOption);
