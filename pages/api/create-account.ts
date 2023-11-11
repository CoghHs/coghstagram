import { NextApiRequest, NextApiResponse } from "next";
import db from "../../lib/server/db";
import bcrypt from "bcrypt";

export interface ResponseType {
  ok: boolean;
  status?: number;
  [key: string]: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (!(req.method === "POST")) return;
  const { name, email, password } = req.body;
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    await db.user.create({
      data: {
        name,
        email,
        password: await bcrypt.hash(password, 10),
      },
    });
    return res.json({
      ok: true,
      status: 201,
      message: "회원가입 완료.",
    });
  } else {
    return res.json({
      ok: false,
      status: 400,
      message: "이미 존재하는 아이디 입니다.",
    });
  }
}
