import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../lib/server/db";
import { ResponseType } from "../../create-account";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOption } from "../../../../lib/server/sessionOption";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;

  const tweet = await db.tweet.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
          email: true,
        },
      },
    },
  });
  const terms = tweet?.name.split(" ").map((word) => ({
    name: {
      contains: word,
    },
  }));
  const relatedTweets = await db.tweet.findMany({
    take: 4,
    where: {
      OR: terms,
      AND: {
        id: {
          not: tweet?.id,
        },
      },
    },
  });
  const isLiked = Boolean(
    await db.fav.findFirst({
      where: {
        tweetId: tweet?.id,
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })
  );
  res.json({ ok: true, tweet, isLiked, relatedTweets });
}

export default withIronSessionApiRoute(handler, sessionOption);
