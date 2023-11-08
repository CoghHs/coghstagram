import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/server/db";
import { ResponseType } from "../create-account";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOption } from "../../../lib/server/sessionOption";

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
  if (req.method === "GET") {
    const tweets = await db.tweet.findMany({
      include: {
        _count: {
          select: {
            favs: true,
          },
        },
      },
    });
    res.json({
      ok: true,
      tweets,
    });
  }
  if (req.method === "POST") {
    const {
      body: { name, content },
      session: { user },
    } = req;
    const tweet = await db.tweet.create({
      data: {
        name,
        content,
        image: "xx",
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({
      ok: true,
      tweet,
    });
  }
}

export default withIronSessionApiRoute(handler, sessionOption);
