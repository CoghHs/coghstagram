import { NextApiRequest, NextApiResponse } from "next";
import db from "../../lib/server/db";
import bcrypt from "bcrypt";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOption } from "../../lib/server/sessionOption";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}
export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  res.json({
    ok: true,
    url: "",
  });
}

export default withIronSessionApiRoute(handler, sessionOption);
