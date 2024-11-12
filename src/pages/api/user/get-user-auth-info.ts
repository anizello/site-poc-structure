import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { UserService } from "@/services/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Metodo não permitido" });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: "Não autorizado" });
  }

  if (!session.accessToken || !session.user?.email) {
    return res.status(400).json({ error: "Dados da sessão inválidos" });
  }

  try {
    const user = await UserService.getInstance().getUserInfo(
      session.accessToken,
      session.user.email,
    );

    return res.status(200).json({ ...user });
  } catch (error) {
    console.error("Erro ao buscar informações do usuário:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}
