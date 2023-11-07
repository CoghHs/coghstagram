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
  if (req.method === "POST") {
    const { email, password } = req.body;
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      res.json({
        ok: false,
        status: 404,
        message: "존재하지 않는 아이디 입니다",
      });
    }
    if (user) {
      const check = await bcrypt.compare(password, user.password);
      if (check) {
        req.session.user = {
          id: user.id,
        };
        await req.session.save();
        res.json({
          ok: true,
          status: 200,
        });
      } else {
        res.json({
          ok: false,
          status: 401,
          message: "잘못된 비밀번호 입니다. 다시 입력해주세요.",
        });
      }
    }
  }
}

export default withIronSessionApiRoute(handler, sessionOption);
