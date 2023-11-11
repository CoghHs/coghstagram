import { NextApiRequest, NextApiResponse } from "next";
import { ResponseType } from "./create-account";
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
  const { id } = req.body;
  console.log(id);
  if (req.session.user?.id === id) {
    req.session.destroy();
    res.json({
      ok: true,
      status: 200,
    });
  }
}

export default withIronSessionApiRoute(handler, sessionOption);
