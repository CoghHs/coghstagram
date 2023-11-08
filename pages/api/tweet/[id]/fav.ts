import { NextApiRequest, NextApiResponse } from "next";

import db from "../../../../lib/server/db";
import { ResponseType } from "../../create-account";
import { withIronSessionApiRoute } from "iron-session/next/dist";
import { sessionOption } from "../../../../lib/server/sessionOption";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;
  const alreadyExists = await db.fav.findFirst({
    where: {
      tweetId: Number(id),
      userId: user?.id,
    },
  });
  if (alreadyExists) {
    await db.fav.delete({
      where: {
        id: alreadyExists.id,
      },
    });
  } else {
    await db.fav.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        tweet: {
          connect: {
            id: Number(id),
          },
        },
      },
    });
  }
  res.json({ ok: true });
}

export default withIronSessionApiRoute(handler, sessionOption);
