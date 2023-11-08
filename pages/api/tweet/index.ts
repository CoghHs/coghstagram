import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/server/db";
import { ResponseType } from "../create-account";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOption } from "../../../lib/server/sessionOption";

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
      body: { name },
      session: { user },
    } = req;
    const product = await db.tweet.create({
      data: {
        name,
        content: "",
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
      product,
    });
  }
}

export default withIronSessionApiRoute(handler, sessionOption);
