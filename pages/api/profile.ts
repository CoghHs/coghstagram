import { NextApiRequest, NextApiResponse } from "next";
import { ResponseType } from "../../lib/server/withHandler";
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
      const { email, name, avatarId } = req.body;
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
      if (avatarId) {
        await db.user.update({
          where: {
            email,
          },
          data: {
            avatar: avatarId,
          },
        });
      }
    }
    res.end();
  }
}

export default withIronSessionApiRoute(handler, sessionOption);
